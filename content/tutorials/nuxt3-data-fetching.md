---
title: Data Fetching in Nuxt3
description: data fetching
slug: nuxt3-data-fetching
author: Rick Rohrig
date: 20 Sep 2022
subject: Data Fetching
position: 2
---

data fetching


```js
const answer = await useFetch(
    () => `/api/ask-jack/answer`, { method: 'post', body: { data } }
  );
```

useFetch() is the standard way to fetch data in Nuxt3. You don't need to add any outside depencencies to such as axios to make fetch requests. 

wip

