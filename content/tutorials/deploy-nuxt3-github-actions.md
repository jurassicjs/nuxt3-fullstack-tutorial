---
title: Deploy Nuxt3 via Github Actions
description: Let's get to action deploying Nuxt3 via Github Actions
slug: deploying-nuxt3-via-github-actions
author: Rick Rohrig
date: 29 Sep 2022
subject: Nuxt Routing
position: 1
---

Hello [World]{.bg-blue-500}!

Automating deployments is pretty much standard these days. Manually typing in deployment commands is too time intensive and failure prone. 

One option is GitHub Actions. If your project is open source, like **fullstackjack.dev**,  it's also cost free. 

## Bird's Eye View


![photo of github jobs flow diagram](https://fullstackjack.dev/img/deployment-jobs-overview.png "https://github.com/jurassicjs/nuxt3-fullstack-tutorial/actions")

### It all begins with a workflow.
A workflow needs a **trigger**, which can be as simple as pushing to a branch or something slightly more advanced like creating a release.

```yaml
on:
  push:
    branches:
      - main
      - 'feature/deploy'
```

In this example, the workflow will be triggered every time we push to the **main** or **feature/deploy** branches.

You can also set env variables that will be accessible across the entire workflow.

::alert{icon=👉}
env variables are not strictly necessary, but you may find it makes it easier to scan the workflow with those values right at the top.
::

```yaml
env:
  NODE_VERSION: 16.17.0
  IP_ADDRESS: "49.12.188.8"
```

#### Jobs
A workflow contains one or more **jobs**.

```yaml
jobs:
  test-application:
  create-artifacts:
  prepare-release:
  activate-release:
  clean-up:
```
Each of these jobs will contain one or more **steps**.

Let's take a look at the simplest job, **test-application**

```yaml
jobs:
  test-application:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Test Application
        uses: actions/setup-node@v3
        with:
          node-version: ${{env.NODE_VERSION}}
          cache: 'yarn'
      - run: |
          yarn
          yarn build
          yarn test
```

#### Steps

We use Steps to group our deployment commands. 

::alert{icon=👉}
every step must define a `uses` or `run` key
::

```uses``` is how you use actions created by others. One of the most common of these external actions is ```actions/checkout@v3```
which simply checks out your code from the repository, so you can run all the other commands against it. 


```run``` is where you can write any commands you like. If you need to run a set of commands, you can use the pipe character ```|``` and list each command line by line.
Alternatively, you could just add one ```run``` statement after another. Do whatever you find more readable. 

The steps in the **test-application** are pretty straight forward, but as you'll see shortly, things can escalate quickly.

## Now let's create our deployment artifacts

```yaml
create-deployment-artifacts:
    needs: test-application
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build App Artifacts
        env:
          GITHUB_SHA: ${{ github.sha }}
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_TEST_KEY }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{env.NODE_VERSION}}
          cache: 'yarn'
      - run: |
          touch .env
          echo STRIPE_SECRET_KEY=${{ secrets.STRIPE_SECRET_TEST_KEY }} >> .env
          echo DATABASE_URL=${{ secrets.DATABASE_URL }} >> .env
          echo APP_DOMAIN=https://fullstackjack.dev >> .env
          echo RELEASE_VERSION=${GITHUB_REF} >> .env
          echo GITHUB_SHA=${GITHUB_SHA} >> .env
          yarn
          yarn build
          cp .env .output/server/.env
          cp .env server/database/
          tar -czf "${GITHUB_SHA}".tar.gz .output
          tar -czf "${GITHUB_SHA}"-database.tar.gz -C ./server database
      - name: Store app-artifacts for distribution
        uses: actions/upload-artifact@v3
        with:
          name: app-artifacts
          path: ${{ github.sha }}.tar.gz

      - name: Store database-artifacts for distribution
        uses: actions/upload-artifact@v3
        with:
          name: database-artifacts
          path:  ${{ github.sha }}-database.tar.gz
```

::alert{type=success icon=😎}
One super cool feature with GitHub Actions is you can break off the entire process if one job fails. So, for example, if your tests fail, you won't
accidentally ship broken code.
::

We make sure jobs run synchronously by setting ```needs: name-of-job-you-want-to-follow ``` on our job

### Secrets
The first thing we do here is create a .env file
```bash
touch .env
```
Then we fill that .env file with all of our secrets.
```bash
 echo STRIPE_SECRET_KEY=${{ secrets.STRIPE_SECRET_TEST_KEY }} >> .env
```

You'll need to save those secrets in GitHub before you run the job.

You can set secrets for actions in you repository 
```settings``` -> ```secrets``` -> ```actions``` or 
```https://github.com/your-repo-org/name-of-your-repo/settings/secrets/actions```

## Build it. Zip it. Ship it. 
``` yarn ```
installs dependencies and ```yarn build``` builds the app. Don't like ```yarn``` ?
You can use whichever package manager you like. ```npm, pnmp``` etc.

```bash
cp .env .output/server/.env
cp .env server/database/
```

If you're using ```Prisma js``` you'll want to copy the .env files where prisma needs them. 
I tried a bunch of different ways to do this. 
This the easiest and most straight forward way to do it. 

I'm not intimately familiar with how the compilation in Nuxt 3 works, 
but I do know that by default the compilation process throws out prisma migrations. 
If you want to use prisma's migrations in your deployment process, 
you'll need to create an additional artifact from the directory that houses prisma, 
for fullstackjack.dev it's the ```server/database/``` directory.

```bash
tar -czf "${GITHUB_SHA}".tar.gz .output
tar -czf "${GITHUB_SHA}"-database.tar.gz -C ./server database
```

I've found using the git hash is a great way to ensure uniqueness, and to know 
which version of the code your looking at later on. GitHub actions makes this easy, ```"${GITHUB_SHA}"```
is available in the workflow automatically. 

tar is how linux compresses files. 
The ```-C``` in the second command says start in the directory we specify ```./server``` in this case.
Then just use the```database``` directory. 

```yaml
      - name: Store app-artifacts for distribution
        uses: actions/upload-artifact@v3
        with:
          name: app-artifacts
          path: ${{ github.sha }}.tar.gz

      - name: Store database-artifacts for distribution
        uses: actions/upload-artifact@v3
        with:
          name: database-artifacts
          path:  ${{ github.sha }}-database.tar.gz
```
These two actions upload our artifacts so that we can use them in other jobs. ```actions/upload-artifact@v3```
is also an action created by GitHub. 