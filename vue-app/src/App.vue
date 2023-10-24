<script setup>
import { watchEffect, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2'
import { ElConfigProvider } from 'element-plus'
import zhTw from 'element-plus/lib/locale/lang/zh-tw'

const route = useRoute()
const router = useRouter()


onMounted(async() => {
  await router.isReady()

  if (route.name != 'Login'){
    if(sessionStorage.getItem('isLogin') == null){
      Swal.fire({
        title: '驗證失敗',
        text: '跳轉至登入畫面',
        icon: 'error',
        showConfirmButton: false,
        showCancelButton: false,
        timer: 2000,
      }).then(() => {
        router.push('/login')
      })
    }
  }
})

watchEffect(() => {
  // if(sessionStorage.getItem('isLogin') != null){
  //   loginStore.setAuth(true)
  //   loginStore.setUser(localStorage.userAccount)
  //   loginStore.setUserName(localStorage.userName)
  // }else{
  //   if (loginCheck.getIsLogin){
  //     Swal.fire({
  //       title: '驗證失敗',
  //       text: '跳轉至登入畫面',
  //       icon: 'error',
  //       showConfirmButton: false,
  //       showCancelButton: false,
  //       timer: 2000,
  //     }).then(() => {
  //       router.push('/login')
  //     })
  //   }
  // }
  // if(loginCheck.getIsLogin){
  //   loginStore.setAuth(true)
  //   loginStore.setUser(localStorage.userAccount)
  //   loginStore.setUserName(localStorage.userName)
  // }else{
  //   if (loginCheck.getIsLogin){
  //     Swal.fire({
  //       title: '驗證失敗',
  //       text: '跳轉至登入畫面',
  //       icon: 'error',
  //       showConfirmButton: false,
  //       showCancelButton: false,
  //       timer: 2000,
  //     }).then(() => {
  //       router.push('/login')
  //     })
  //   }
  // }
})

</script>

<template>
  <div class="max-h-screen max-w-screen overflow-hidden">
    <div id="app">
      <el-config-provider :locale="zhTw">
        <router-view></router-view>
      </el-config-provider>>  
    </div>
  </div>
</template>

<style scoped>
</style>
