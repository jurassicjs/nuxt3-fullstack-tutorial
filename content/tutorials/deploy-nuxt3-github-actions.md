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
A workflow needs a **trigger**, with can be as simple as pushing to a branch or something slightly more advanced like creating a release.

```yaml
on:
  push:
    branches:
      - main
      - 'feature/deploy'
```

In this example, the workflow will be triggered every time we push to the **main** or **feature/deploy** branches.

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

#### Steps
Let's take a look at the simplest job, **test-application**

```yaml
jobs:
  test-application:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [ 16.17.0 ]
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'yarn'
      - run: yarn
      - run: yarn build
      - run: yarn test
```

At the risk of being redundant, I'll walk through what each line means. 

```yaml
runs-on: ubuntu-latest
```
here is where you chose what operating system you want your job to run on. 

```yaml
   strategy:
      matrix:
        node-version: [ 16.17.0 ]
```
If you add a matrix, the job will run against each entry in the matrix. In this case, we've only listed one node version, so the job will only run against that node version.

```yaml
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'yarn'
      - run: yarn
      - run: yarn build
      - run: yarn test
```
::alert{icon=👉}
steps is where things get interesting.
::

We use Steps to run our deployment commands. It's like teaching someone every step you'd normally do manually to deploy,
but you know they will never make typos or do things in the wrong order. In other words, you've got the perfect sidekick. 

The steps in the **test-application** are pretty straight forward, but as you'll see shortly, things can escalate quickly. 

::alert{type=success icon=😎}
One super cool feature with GitHub Actions is you can break off the entire process if one job fails. So, for example, if your tests fail, you won't
accidentally ship broken code. 
::