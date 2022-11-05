---
title: State in Nuxt 3
description: Learn about the differnt kinds of state and how to use them
slug: the-latest-features-added-to-javascript-in-ecmascript-2020
author: Rick Rohrig
date: 18 Sep 2022
subject: Nuxt Routing
position: 1
---


# Dynamic vs Persistent

Hello [World]{.bg-blue-500}!

It's important to understand the differences between dynamic and persistent state. 

The simplest way to think about it is, persistent state can survive a restart or refresh while dynamic state is wiped clean. 

## Let's start server side.

Suppose we have an API Route like **/api/counter**

Every time we visit or refresh **localhost:3000/api/counter**  the count will increment. 
You may be tempted to believe that if the count survived a browser refresh, it must must persistent, right?
We must keep in mind, the browser is not the only thing that can restart. The server can as well. 

::alert{type=info icon=🚨}
 Don't let this fool you into thinking this is persistent state. As soon as you restart the server, the count will be back to 0!
::



 ```js [/api/counter.ts]
  let count = 0

  export default defineEventHandler( () => {
    count++

    return count
  })
```

If you want persistent state on the server side you can use a full blown database like Postgres or MySql, or even a simple file: Whatever works for you. My recommendation is to use Prisma.js.
You can find out how to use it in my tutorials on my youtube channel:  [full stack jack](https://youtube.com/c/fullstackjack)

## Client Side State

### Dynamic State
Just like the server side, there is also persistent and dynamic state on the client side. 


In Nuxt 3, we get some pretty awesome state management build right into the framework. It looks like this. 

```js
const useX = () => useState('x')

```

If you have some very complex state needs you may want to reach for pinia. But I built the entire site you're browsing now with nothing more
than useState(). Checkout the Repo and see for yourself. There are no other state management solutions at work here. 

The 'x' in that useState('x') is the key. Anywhere you call useState('x') in the app it all points to the same entity in state. By the way, useState() is also SSR-friendly. 

### Persistent State

On the client side your persistent state options are rather limited. 

You can store state in cookies or in local storage. 

Nuxt already has a build in way for you to access cookies. I use it in this app like so. 

```js [/composables/getAuth.ts]
export const useAuthCookie = () => useCookie('auth_token')
```

If you're logged in, open up the browser dev tools and you'll see the **auth_token** cookie is set. 

Alternatively you could use Local Storage. 

I recommend using vueUse for this. It's just so beautiful and buttery smooth to use. 

```js
export const myCoolLocalStorageValue = () => useLocalStorage('any_key_you_wish')
```