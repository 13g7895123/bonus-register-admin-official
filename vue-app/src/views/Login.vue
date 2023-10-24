<template>
    <div class="relative w-screen h-screen bg-loginBg bg-cover bg-no-repeat bg-center">
        <section class="w-[370px] h-[210px] absolute top-[20vh] left-1/2 transform -translate-x-1/2 text-center">
            <span class="text-[26px] absolute -top-5 left-1/2 transform -translate-x-1/2">後臺管理系統</span>
            <el-form 
            :rules="rules"
            :model="loginUser"
            ref="ruleFormRef"
            label-width="80px"
            class="mt-5 bg-white py-5 px-3 rounded-md shadow-md"
            >
                <el-form-item label="帳號" prop="account">
                    <el-input
                        v-model="loginUser.account"
                        placeholder="請輸入帳號"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密碼" prop="password">
                    <el-input 
                        v-model="loginUser.password"
                        placeholder="請輸入密碼"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item class="w-full flex justify-center">
                    <el-button 
                        @click="handleSubmit(ruleFormRef)"
                        class="w-full"
                    >登入</el-button>
                </el-form-item>
            </el-form>
        </section>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from "vue-router";
import Swal from 'sweetalert2'
import { useAuthStore } from '../stores/loginAuth.js';
import { useLoginCheckStore } from '../stores/loginCheck';

const ruleFormRef = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/'
const router = useRouter();
const loginStore = useAuthStore();
const loginCheck = useLoginCheckStore();

const loginUser = ref({
    account: '',
    password: '',
})

const rules = reactive({
    account: [{ required: true, message: '帳號不可為空', trigger: 'blur' }],
    password: [
        { required: true, message: '密碼不可為空', trigger: 'blur'},
        { min: 4, max: 12, message: '長度在4到12個字串之間', trigger: 'blur'}
    ]
})

const handleSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {
        if (valid){
            apiParam.value = '?action=login'
            apiUrl.value = apiUrlPrefix + "login.php" + apiParam.value
            const { data: { success, user, msg } } = await axios.post(
                apiUrl.value, loginUser.value
            )

            if (success && user){
                
                const { id, name, is_admin } = user

                sessionStorage.setItem('userId', id)
                sessionStorage.setItem('userName', name)
                sessionStorage.setItem('isAdmin', is_admin)
                sessionStorage.setItem('isLogin', true)
                sessionStorage.setItem('loginTime', new Date().getTime())
                sessionStorage.setItem('lastTime', new Date().getTime())

                // localStorage.setItem('userId', id)
                // localStorage.setItem('userAccount', account)
                // localStorage.setItem('userName', name)
                // localStorage.setItem('isAdmin', is_admin)

                // loginStore.setAuth(true)
                // loginStore.setUser(account)
                // loginStore.setUserName(name)
                // loginStore.setIsAdmin(is_admin)

                // loginCheck.setIsLogin(true)
                // loginCheck.setLoginTime(new Date().getTime())
                // loginCheck.setLastTime(new Date().getTime())

                Swal.fire({
                    title: '登入成功',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1000,
                }).then(() => {
                    router.push('/player');
                })
            }else{
                Swal.fire({
                    title: '登入失敗',
                    text: msg,
                    icon: 'error',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                })
            }
        }else{
            return false;
        }
    })
}

</script>