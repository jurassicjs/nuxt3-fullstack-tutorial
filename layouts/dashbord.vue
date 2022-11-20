<template>
    <main class="flex flex-col sm:flex-row">
        <DashboardSidebar />
        <div class="w-full flex-grow">
        <DashboardHeader />
        <!-- main content -->
            <div class="px-6 py-6">
                <NuxtPage />
            </div>
        </div>
    </main>
</template>