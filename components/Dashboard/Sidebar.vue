<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue?: boolean
  }>(),
  {
    modelValue: false,
  },
)
const defaultmenus =([
    {
        id:'m1',
        text:'Dashboard',
        icon: 'ri:dashboard-3-line',
        to:'/dashboard',
    },
    {
        id:'m2',
        text:'Profile',
        icon: 'ri:user-line',
        to:'/profile',
    },
    {
        id:'m3',
        text:'Logout',
        icon: 'ri:logout-box-line',
        to:'/logout',
    },
])
</script>
<template>
    <div class="">
        <aside class="
            px-2
            w-10/12
            sm:w-[300px]
            border-r
            h-screen
            fixed
            sm:sticky
            top-0
            border-gray-200
            pb-2
            bg-white
            z-10
            flex-col
            transition-all
            duration-300
            transform
            sm:transform-none
            ">
            <div>
                <div class="
                    flex
                    justify-between
                    gap-2
                    items-center
                    px-4
                    border-b border-gray-200
                    -mx-2
                    sm:border-none
                ">
                        <nuxt-link
                            to="/dashboard"
                            class="
                            py-5
                            w-full
                            font-bold
                            text-lg text-indigo-500
                            flex
                            gap-2
                            items-center
                            justify-between
                            sm:justify-center
                            "
                        >
                            <Icon name="logos:nuxt-icon" class="w-10 h-10" />
                            <div class="flex gap-2 items-center justify-center">
                            EduPay
                            </div>
                        </nuxt-link>
                        <button class="w-8 h-8 text inline sm:hidden">
                            <Icon name="ri:arrow-drop-left-line" class="w-8 h-8" />
                        </button>
                </div>
                <!-- todo logo -->
                <ul class="flex-grow justify-center items-center">
                    <li v-for="menu in defaultmenus" :key="menu.id" class="
                    pl-3 py-2 flex
                    w-full gap-2
                    items-center
                    justify-between
                    sm:justify-center
                            ">
                    <!-- class="pt-2 py-2 pl-3 hover:bg-violet-200"> -->
                        <NuxtLink :to="menu.to">
                        <Icon :name="menu.icon" class="h-5 w-5 mr-5" />
                        {{ menu.text}}</NuxtLink>
                    </li>
                </ul>
            </div>
            
        </aside>
    </div>
</template>