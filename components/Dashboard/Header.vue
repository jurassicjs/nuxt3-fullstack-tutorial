<script lang="ts" setup>
defineEmits(['menu:click'])
</script>
<template>
    <header class="bg-white border-b border-gray-200">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <button
                    class="flex-shrink-0 px-4 py-2 rounded inline" @click="$emit('menu:click')">
                    <Icon name="ri:menu-line" class="w-5 h-5" />
                </button>
                <div class="relative sm:w-3/12">
                    <Icon name="ri:search-line" class=" text-gray-400 absolute left-3 w-5 h-5 top-2.5"/>
                    <input type="search" placeholder="Search VA" class=" pl-10 py-2 appearance-none border-none focus:border-none transition duration-500 focus:ring-0 rounded-lg focus:outline-none w-full ">
                </div>
                <div class="flex flex-row gap-10">
                    <Icon aria-hidden="true" name="ri:search-line" class="w-5 h-5" />
                    <Icon name="ri:moon-line" class="w-5 h-5" />
                    <Icon name="ri:sun-line" class="w-5 h-5" />
                    <Icon name="ri:account-circle-line" class="w-5 h-5" />
                </div>
            </div>
        </div>
    </header>
</template>