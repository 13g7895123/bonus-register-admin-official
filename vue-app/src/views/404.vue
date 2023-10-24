<template>
    <div class="w-full h-screen relative overflow-hidden">
        <img class="w-screen h-screen" src="../assets/404.gif" alt="error">
        <div 
            class="text-lg font-semibold absolute top-1/2 left-1/2 -translate-y-1/2 outline-none border-none focus:outline-none focus:border-none cursor-pointer"
            @click="$router.go(-1)"
            style="transform: translateX(250%);"
        >回上一頁</div>
    </div>
</template>
<script setup>

</script>