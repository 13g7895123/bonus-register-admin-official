<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header">
                <span>玩家資料修改</span>
            </div>
        </template>
        <el-form
            :model="formData"
            ref="dialogRef"
            label-width="120px"
            style="margin: 10px; width: auto"
            >
            <el-form-item prop="account" label="帳號" required>
                <el-input v-model="formData.account" ></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密碼" required>
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="手機" required>
                <el-input v-model="formData.phone"></el-input>
            </el-form-item>
            <el-form-item prop="" label="生日" class="date_column" required>
                <el-date-picker
                    v-model="formData.birthday"
                    type="date"
                    format="YYYY/MM/DD"
                    value-format="YYYY/MM/DD"
                />
            </el-form-item>
            <el-form-item prop="server" label="伺服器">
                <el-select v-model="formData.serverText" class="w-full" placeholder="請選擇伺服器" size="large">
                    <el-option
                    v-for="item in serverList"
                    :key="item"
                    :label="item"
                    :value="item"
                    />
                </el-select>  
            </el-form-item>
            <el-form-item class="flex justify-center">
                <el-button @click="handelCancel">取消</el-button>
                <el-button type="primary" @click="handleSubmit(dialogRef)">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from "../stores/loginAuth";

const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = ref('/api/')
const dialogRef = ref()
const nowUser = ref()
const isAdmin = ref()

const router = useRouter()
const loginAuth = useAuthStore()
const serverList = ref([])
const serverIdList = ref([])

// Api config
const phpAction = 'player_user';

const formData = ref({
    account: '',             // 聯絡人
    password: '',               // 密碼
    passwordCheck: '',          // 密碼確認
    phone: '',                  // 電話
    birthday: '',                   // 郵件
    serverText: '',
})

onMounted(() => {
    nowUser.value = loginAuth.getUser   // 操作者帳號
    isAdmin.value = loginAuth.getIsAdmin
    getServer()
})

const getServer = async() => {    // 依操作者權限取得伺服器列表
    const serverData = ref({
        isAdmin: isAdmin.value,
        account: nowUser.value,     // 操作使用者帳號
    })
    apiParam.value = 'server_list'
    apiUrl.value = `${apiUrlPrefix.value}${phpAction}.php?action=${apiParam.value}`
    const { data: { success, data } } = await axios.post(apiUrl.value, serverData.value)
    if (success){
        let nameTempArr = []
        let codeNameTempArr = []
        let mixServerList = []
        let serverIdTempArr = []
        nameTempArr = data.map(item => item.name)
        codeNameTempArr = data.map(item => item.code_name)
        serverIdTempArr = data.map(item => item.id)
        for (let i = 0; i < data.length; i++){
            mixServerList[i] = `${nameTempArr[i]}[${codeNameTempArr[i]}]`
        }
        serverList.value = mixServerList
        serverIdList.value = serverIdTempArr
    }
}

const handleSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {
        if (valid){
            const ajax_data = formData.value
            apiParam.value = `add_${phpAction}`
            apiUrl.value = `${apiUrlPrefix.value}${phpAction}.php?action=${apiParam.value}`
            const { data: { success, msg } } = await axios.post(apiUrl.value, ajax_data)

            if (success){
                Swal.fire({
                    title: `系統資訊`,
                    text: '新增資料成功',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                }).then(() => {
                    router.push({ path: '/player' })
                })
            }
        }
    })
}

const handelCancel = () => {
    router.push({ path: '/player' })
}

</script>

<style>
.el-form-item__content{
    display: flex;
    justify-content: center;
    margin-left: 0 !important;
}

.date_column .el-input,
.date_column .el-input__wrapper,
.date_column .el-form-item__content{
    width: 100%;
}
</style>