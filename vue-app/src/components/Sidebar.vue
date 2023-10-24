<template>
    <!-- 側邊欄 -->
    <el-row class="menu-container">
      <el-col :span="12">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#555"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          text-color="#fff"
        >
            <router-link to="/player">
                <el-menu-item index="/player">
                    <el-icon><User /></el-icon>
                    <span>玩家帳號管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/server">
                <el-menu-item index="/server">
                    <el-icon><Refrigerator /></el-icon>
                    <span>伺服器管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/systemUser" v-if="isAdmin == true">
                <el-menu-item index="/systemUser">
                    <el-icon><Avatar /></el-icon>
                    <span>系統使用者</span>
                </el-menu-item>
            </router-link>
            <router-link to="/systemAdmin" v-if="isAdmin == true">
                <el-menu-item index="/systemAdmin">
                    <el-icon><Avatar /></el-icon>
                    <span>系統管理者</span>
                </el-menu-item>
            </router-link>
        </el-menu>
      </el-col>
    </el-row>
</template>

<script setup>
import { Avatar, Refrigerator, User } from "@element-plus/icons-vue";
import { useAuthStore } from '../stores/loginAuth.js';
import { ref, onMounted } from 'vue'

const loginStore = useAuthStore();
const isAdmin = ref(null)

onMounted(() => {
    isAdmin.value = sessionStorage.getItem('isAdmin')
})

</script>

<style scoped>
.menu-container {
    position: fixed;
    top: 71px;
    left: 0;
    min-height: 100%;
    background-color: #074c62;
    z-index: 99;
}
.el-menu {
    border: none;
}
.fa-margin {
    margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
width: 180px;
min-height: 100vh;
}
.el-menu-vertical-demo {
width: 35px;
}
.el-sub-menu .el-menu-item {
min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>