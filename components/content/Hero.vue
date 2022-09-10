<template>
 <section>
   <h1 class="text-4xl font-bold dark:text-white">
    <slot />
   </h1>
   <div class="dark:text-white">
    <slot name="description"/>
   </div>
  
 </section>
</template>