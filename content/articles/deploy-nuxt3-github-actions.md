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

## Prerequisites

1. A linux server
2. Ability to login via SSH
3. Install Node LTS
4. Install Nginx

## Server Setup
We'll need to set up a service that can start and stop our Nuxt3 App. We use systemd to do this, because it will
automatically restart the app if it goes down. 

```
[Unit]
Description=fullstackjack service
Documentation=https://fullstackjack.dev
After=network.target


[Service]
Restart=always
RestartSec=10
TimeoutSec=300
WorkingDirectory=/var/www/html/live
ExecStart=/usr/bin/bash -c 'node .output/server/index.mjs'

[Install]
WantedBy=multi-user.target

# /etc/systemd/system/fullstackjack.service
```
Create a service in the **/etc/systemd/system** directory. Name it whatever you like, but be consistent in the rest of your 
setup. I'll spare you the details for every little part of the service. 

The interesting parts are:

**WorkingDirectory=/var/www/html/live** which is where we always symlink the current live release

**ExecStart=/usr/bin/bash -c 'node .output/server/index.mjs'** which starts our Nuxt3 App. 

**Restart=always** ensures systemd will restart the app if it goes down.

Then run **systemctl enable fullstackjack** (keep in mind, you must replace fullstackjack with whatever you named your service)

I'll give you my nginx set up as I have it. But the details are out of the scope of this tutorial. 

```
map $sent_http_content_type $expires {
    "text/html"                 epoch;
    "text/html; charset=utf-8"  epoch;
    default                     off;
}

server {

    listen 80;

    server_name     fullstackjack.dev;    # setup your domain here

    ssl_certificate       /etc/letsencrypt/live/fullstackjack.dev/fullchain.pem;
    ssl_certificate_key   /etc/letsencrypt/live/fullstackjack.dev/privkey.pem;


    gzip            on;
    gzip_types      text/plain application/xml text/css application/javascript;
    gzip_min_length 1000;

    location / {
        expires $expires;

        proxy_redirect                      off;
        proxy_set_header Host               $host;
        proxy_set_header X-Real-IP          $remote_addr;
        proxy_set_header X-Forwarded-For    $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto  $scheme;
        proxy_read_timeout          1m;
        proxy_connect_timeout       1m;
        proxy_pass                          http://127.0.0.1:3000; # set the address of the Node.js instance here
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/fullstackjack.dev/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/fullstackjack.dev/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}


server {
    if ($host = fullstackjack.dev) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen          80;
    server_name     fullstackjack.dev;
    return 404; # managed by Certbot


}

```

If you want SSL, which you most likely will, you can use [certbot](https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal) for free.

Note: you can do all of this tutorial without setting up SSL. 


## Bird's Eye View

![photo of github jobs flow diagram](https://fullstackjack.dev/img/deployment-jobs-overview.png "https://github.com/jurassicjs/nuxt3-fullstack-tutorial/actions")

### It all begins with a workflow.

A workflow is a document which lists the tasks you'd like to automate. In our case, we'll be automating
our deployment process. 

You create a workflow by adding a **yaml** file in .github/workflows directories at the root of your project. 

So it will look like this. 

```yaml
myProject/.github/workflows/deploy.yml
```

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
every step must define a **uses** or **run** key
::

**uses** is how you use actions created by others. One of the most common of these external actions is **actions/checkout@v3**
which simply checks out your code from the repository, so you can run all the other commands against it. 


**run** is where you can write any commands you like. If you need to run a set of commands, you can use the pipe character **|** and list each command line by line.
Alternatively, you could just add one **run** statement after another. Do whatever you find more readable. 

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

We make sure jobs run synchronously by setting **needs: name-of-job-you-want-to-follow** on our job

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
**settings** -> **secrets** -> **actions** or
**https://github.com/your-repo-org/name-of-your-repo/settings/secrets/actions**

## Build it. Zip it. Ship it. 
**yarn**
installs dependencies and **yarn build** builds the app. Don't like **yarn** ?
You can use whichever package manager you like. **npm, pnmp** etc.

```bash
cp .env .output/server/.env
cp .env server/database/
```

If you're using **Prisma js** you'll want to copy the .env files where prisma needs them. 
I tried a bunch of different ways to do this. 
This the easiest and most straight forward way to do it. 

I'm not intimately familiar with how the compilation in Nuxt 3 works, 
but I do know that by default the compilation process throws out prisma migrations. 
If you want to use prisma's migrations in your deployment process, 
you'll need to create an additional artifact from the directory that houses prisma, 
for fullstackjack.dev it's the **server/database/** directory.

```bash
tar -czf "${GITHUB_SHA}".tar.gz .output
tar -czf "${GITHUB_SHA}"-database.tar.gz -C ./server database
```

I've found using the git hash is a great way to ensure uniqueness, and to know 
which version of the code you're looking at later on. GitHub Actions makes this easy, **"${GITHUB_SHA}"**
is available in the workflow automatically. 

**tar** is how Linux compresses files. 
The **-C** in the second command says start in the directory we specify **./server** in this case.
Then just use the **database** directory. 

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
These two actions upload our artifacts so that we can use them in other jobs. **actions/upload-artifact@v3**
is also an action created by GitHub. 

## Getting your code onto the sever

```yaml
  prepare-release-on-servers:
    needs: create-deployment-artifacts
    name: "Prepare release on INT server"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: app-artifacts
      - uses: actions/download-artifact@v3
        with:
          name: database-artifacts
      - name: Upload app-artifacts
        uses: appleboy/scp-action@master
        with:
          host: ${{env.IP_ADDRESS}}
          port: "22"
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          source: ${{ github.sha }}.tar.gz
          target: /var/www/html/artifacts

      - name: Upload database-artifacts
        uses: appleboy/scp-action@master
        with:
          host: ${{env.IP_ADDRESS}}
          port: "22"
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          source:  ${{ github.sha }}-database.tar.gz
          target: /var/www/html/artifacts

      - name: Extract archive and create directories
        uses: appleboy/ssh-action@master
        env:
          GITHUB_SHA: ${{ github.sha }}
        with:
          host: ${{env.IP_ADDRESS}}
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          port: "22"
          envs: GITHUB_SHA
          script: |
            mkdir -p "/var/www/html/releases/${GITHUB_SHA}"
            tar xzf /var/www/html/artifacts/${GITHUB_SHA}.tar.gz -C "/var/www/html/releases/${GITHUB_SHA}"
            tar xzf /var/www/html/artifacts/${GITHUB_SHA}-database.tar.gz -C "/var/www/html"
            rm -rf /var/www/html/artifacts/${GITHUB_SHA}.tar.gz

```

Because each job is separate process, we first need to download the artifacts we created in the previous job. 
We can do  this by using  **actions/download-artifacts@v3**

Now that we have the artifacts we need, we'll want to log into our server via ssh and upload them.
One way to do this is by using a widely used action **appleboy/scp-action@master**

We need to provide our credentials and the IP Address to our server. If we provide a **source** and a **target** scp-action will upload the files we specify to the target directory we specify. 

**appleboy/ssh-action@master** Allows up to log into our server and run commands. 
Once we've got the code on the server we'll unzip it to the **/var/www/html/releases** directory. And we'll unzip 
our database files (prisma) directly in to **/var/www/html** which will be the **database** directory

## Activate the release

```yaml
  activate-release:
    name: "Activate release"
    runs-on: ubuntu-latest
    needs: prepare-release-on-servers
    steps:
      - name: Activate Release
        uses: appleboy/ssh-action@master
        env:
          RELEASE_PATH: /var/www/html/releases/${{ github.sha }}
          ACTIVE_RELEASE_PATH: /var/www/html/live
        with:
          host: ${{env.IP_ADDRESS}}
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          port: "22"
          envs: RELEASE_PATH,ACTIVE_RELEASE_PATH
          script: |
            ln -s -n -f $RELEASE_PATH $ACTIVE_RELEASE_PATH
            systemctl restart fullstackjack
            chown -R www-data:www-data ${RELEASE_PATH}
            chown -R www-data:www-data  /var/www/html/database
            cd /var/www/html/database && npx prisma migrate deploy

```

We use **appleboy/ssh-action@master** just as we did in the last job. Here, the script is where the magic happens. 

**ln -s -n -f $RELEASE_PATH $ACTIVE_RELEASE_PATH** creates a symlink from the release path to the active path.
This makes it possible to always have the same directory for our deployment, no matter what the release directory is called (the git hash in our case).

**systemctl restart fullstackjack** restarts our service, and in doing so make our new release go live. 

To ensure **Nginx** has access to our files we make the owner www-data. You may need to adjust this, depending on which user
make sense on your server. 

**cd /var/www/html/database && npx prisma migrate deploy** runs our migrations if there are any. 

## Clean up
Every time we deploy we're creating new artifacts and uploading them to our server. Over time, the server will run our of space due to all those 
old artifacts. So, let's get rid of them every time we deploy. 

```yaml
  clean-up:
    name: "Clean up old versions"
    runs-on: ubuntu-latest
    needs: activate-release
    steps:
      - name: clean up old releases
        uses: appleboy/ssh-action@master
        with:
          host: ${{env.IP_ADDRESS}}
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          port: "22"
          script: |
            cd /var/www/html/releases && ls -t -1 | tail -n +4 | xargs rm -rf
            cd /var/www/html/artifacts && rm -rf *
      - uses: geekyeggo/delete-artifact@v1
        with:
          name: app-artifacts
      - uses: geekyeggo/delete-artifact@v1
        with:
          name: database-artifacts
```

Once again, we use **appleboy/ssh-action@master**

The first command remove all but the youngest three releases. If you want to quickly revert to a previous version, you'll 
have two to choose from. 

The artifacts have already been unpacked and moved, so we don't need to keep the zipped files. 

Also, GitHub places restrictions on how much space your uploaded artifacts take on their system. 
We don't need those anymore either. So we'll use **geekyeggo/delete-artifact@v1** to delete them.

## All together now

```yaml
name: Automated Release Deployment

on:
  push:
    branches:
      - main
      - 'feature/deploy'

env:
  NODE_VERSION: 16.17.0
  IP_ADDRESS: "49.12.188.8"

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

  prepare-release-on-servers:
    needs: create-deployment-artifacts
    name: "Prepare release on INT server"
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v3
        with:
          name: app-artifacts
      - uses: actions/download-artifact@v3
        with:
          name: database-artifacts
      - name: Upload app-artifacts
        uses: appleboy/scp-action@master
        with:
          host: ${{env.IP_ADDRESS}}
          port: "22"
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          source: ${{ github.sha }}.tar.gz
          target: /var/www/html/artifacts

      - name: Upload database-artifacts
        uses: appleboy/scp-action@master
        with:
          host: ${{env.IP_ADDRESS}}
          port: "22"
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          source:  ${{ github.sha }}-database.tar.gz
          target: /var/www/html/artifacts

      - name: Extract archive and create directories
        uses: appleboy/ssh-action@master
        env:
          GITHUB_SHA: ${{ github.sha }}
        with:
          host: ${{env.IP_ADDRESS}}
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          port: "22"
          envs: GITHUB_SHA
          script: |
            mkdir -p "/var/www/html/releases/${GITHUB_SHA}"
            tar xzf /var/www/html/artifacts/${GITHUB_SHA}.tar.gz -C "/var/www/html/releases/${GITHUB_SHA}"
            tar xzf /var/www/html/artifacts/${GITHUB_SHA}-database.tar.gz -C "/var/www/html"
            rm -rf /var/www/html/artifacts/${GITHUB_SHA}.tar.gz

  activate-release:
    name: "Activate release"
    runs-on: ubuntu-latest
    needs: prepare-release-on-servers
    steps:
      - name: Activate Release
        uses: appleboy/ssh-action@master
        env:
          RELEASE_PATH: /var/www/html/releases/${{ github.sha }}
          ACTIVE_RELEASE_PATH: /var/www/html/live
        with:
          host: ${{env.IP_ADDRESS}}
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          port: "22"
          envs: RELEASE_PATH,ACTIVE_RELEASE_PATH
          script: |
            ln -s -n -f $RELEASE_PATH $ACTIVE_RELEASE_PATH
            systemctl restart fullstackjack
            chown -R www-data:www-data ${RELEASE_PATH}
            chown -R www-data:www-data  /var/www/html/database
            cd /var/www/html/database && npx prisma migrate deploy

  clean-up:
    name: "Clean up old versions"
    runs-on: ubuntu-latest
    needs: activate-release
    steps:
      - name: clean up old releases
        uses: appleboy/ssh-action@master
        with:
          host: ${{env.IP_ADDRESS}}
          username: "root"
          key: ${{ secrets.SSH_KEY }}
          port: "22"
          script: |
            cd /var/www/html/releases && ls -t -1 | tail -n +4 | xargs rm -rf
            cd /var/www/html/artifacts && rm -rf *
      - uses: geekyeggo/delete-artifact@v1
        with:
          name: app-artifacts
      - uses: geekyeggo/delete-artifact@v1
        with:
          name: database-artifacts
```

I wish you many happy deployments. Enjoy