<template>
  <nav class="w-full min-w-[600px] p-[0.4rem] bg-[#555] text-white border-b-2">
    <el-row>
      <el-col :span="12" class="flex justify-start items-center pl-3">
        <el-icon :size="30" color="#fff"><Setting /></el-icon>
        <span class="title ml-3">後台管理系统</span>
      </el-col>
      <el-col :span="12" class="user">
        <div class="userinfo">
          <img src="../assets/user.png" class="avatar" alt="" />
          <div class="welcome-content">
            <p class="content welcome">Welcome</p>
            <p class="content username">{{ userName }}</p>
          </div>
          <span class="dropdown">
            <!-- <el-dropdown> -->
            <el-dropdown trigegr="click" @command="handleDropdown">
              <span class="el-dropdown-link">
                  <el-icon>   
                    <arrow-down />
                  </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <!-- <el-dropdown-item command="info">個人信息</el-dropdown-item> -->
                  <el-dropdown-item command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </nav>
</template>
  
<script setup>
import { ArrowDown, Setting } from "@element-plus/icons-vue";
import { useAuthStore } from "../stores/loginAuth";
import { useLoginCheckStore } from '../stores/loginCheck';
import { useRouter } from "vue-router";
import Swal from 'sweetalert2'
import { ref, onMounted, onUnmounted } from 'vue'

const loginAuth = useAuthStore()
const loginCheck = useLoginCheckStore();
const router = useRouter()
const timeOutMinute = 10
const timeOut = timeOutMinute * 60 * 1000  //設定超時時間: 10分鐘
// const timeOut = 5 * 1000  // 測試用超時時間: 5秒
const interval = ref(null)
const userName = ref()

const handleDropdown = (item) => {
  switch (item) {
    case 'info':
      showUserInfo();
      break;
    case 'logout':
      logout();
      break;
  }
};

const showUserInfo = () => {
  console.log('跳轉至個人訊息');
}

const logout = () => {
  sessionStorage.clear()

  document.removeEventListener('mousemove', myListener, false);

  // 跳轉頁面
  router.push('/login')
}

onMounted(() => {
  userName.value = sessionStorage.getItem('userName')
  // const isLogin = sessionStorage.getItem('isLogin')
  // console.log('onMounted: ' + isLogin);
  // if (isLogin == true){
  //   userName.value = sessionStorage.getItem('userName')
  //   console.log('do this!');
  // }else{
  //   console.log('do logout!');
  //   logout()
  // }
  // console.log('onMounted: ' + sessionStorage.getItem('isLogin'));
  
  // if (loginCheck.getIsLogin){
  //   interval.value = setInterval(checkTimeout, 5000);
  //   document.addEventListener('mousemove', myListener, false);
  // }else{
  //   // console.log(router.currentRoute._value);
  //   Swal.fire({
  //     title: '驗證失敗',
  //     text: '跳轉至登入畫面',
  //     icon: 'error',
  //     showConfirmButton: false,
  //     showCancelButton: false,
  //     timer: 2000,
  //   }).then(() => {
  //     document.removeEventListener('mousemove', myListener, false);
  //     router.push('/login')
  //   })
  // }
})

onUnmounted(() => {
  // clearInterval(interval.value)
})

const myListener = () => {
    loginCheck.setLastTime(new Date().getTime())
};

const checkTimeout = () => {
  const currentTime = new Date().getTime()
  const lastTime = loginCheck.getLastTime

  // console.log('checkTimeout: ' + loginCheck.getIsLogin);
  // console.log(currentTime, lastTime, timeOut);

  if ((currentTime - lastTime) > timeOut){

    // console.log('觸發登出:' + (currentTime - lastTime) + '/' + timeOut);
    // 清空 local storage
    localStorage.removeItem('userId')
    localStorage.removeItem('userAccount')

    // 變更 login auth 狀態
    loginAuth.setAuth(false)
    loginAuth.setUser('')
    loginAuth.setUserName('')
    loginAuth.setUserId('')
    loginAuth.setIsAdmin('')

    loginCheck.setIsLogin(false)
    loginCheck.setLoginTime('')
    loginCheck.setLastTime('')

    Swal.fire({
      title: '系統提示',
      text: '基於安全考量，超過30分鐘無任何操作，自動登出!',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: false,
      // timer: 1000,
    }).then((isConfirm) => {
      if (isConfirm) {
        router.push('/login');
      }
    })
  }
}

</script>
  
<style scoped>
  
  .logo-container {
    line-height: 60px;
    min-width: 400px;
  }
  .logo {
    height: 50px;
    width: 50px;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    vertical-align: middle;
    font-size: 22px;
    font-family: "Microsoft YaHei";
    letter-spacing: 3px;
  }
  
  .user {
    line-height: 60px;
    text-align: right;
    padding-right: 10px;
  }
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    vertical-align: middle;
    display: inline-block;
  }
  .welcome-content {
    display: inline-block;
    width: auto;
    vertical-align: middle;
    padding: 0 5px;
  }
  .content {
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }
  .welcome {
    font-size: 12px;
  }
  .username {
    color: #409eff;
    font-weight: bolder;
  }
  .dropdown {
    cursor: pointer;
    margin-right: 5px;
  }
  .el-dropdown {
    color: #fff;
  }
  
  .dropdown i {
    margin-top: 20px;
  }
</style>