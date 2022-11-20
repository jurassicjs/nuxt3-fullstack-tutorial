<template>
     <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- ToDo header -->
        <div class="dark:bg-black">
            <icon name="ri:menu-line" class="h-6 w-6"></icon>
            
        </div>
        <!-- left icon -->
        <div>
            <span>
                <icon name="ri:search-line" class="h-6 w-6"></icon>
                <input type="text" name="search" placeholder="search va" class=""/>
            </span>
        </div>

        
        <div class="flex-1">
            <icon name="ri:notification-line" class="h-6 w-6"/>
            <icon name="ri:account-circle-line" class="h-6 w-6"/>
        </div>
        </div>
        <!-- Profile dropdown -->
        
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" class="rounded-full p-1 text-gray-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span class="sr-only">View notifications</span>
            <icon name="ri:notification-line" class="h-6 w-6" aria-hidden="true" />
          </button>
            <div class="relative ml-3">
                <div>
                <button class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </button>
                </div>
                <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div >
                    <a href="#">Your Profile</a>
                    </div>
                    <div >
                    <a href="#">Settings</a>
                    </div>
                    <div >
                    <a href="#" >Sign out</a>
                    </div>
                </div>
                </transition>
            </div>
        </div>
    </div>
    
</template>