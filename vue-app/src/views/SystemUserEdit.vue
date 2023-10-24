<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header">
                <span class="font-semibold text-left">使用者設定</span>
            </div>
        </template>
        <!-- <div class="flex justify-center"> -->
            <el-form
                :model="formData"
                ref="dialogRef"
                label-width="100px"
                style="margin: 10px; width: auto;"
                >
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="formData.name" class="text-center"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="帳號">
                    <el-input v-model="formData.account" class="text-center"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密碼">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="switch" label="啟用狀態" class="radio_column">
                    <!-- <el-input v-model="formData.server_name" readonly="true"></el-input> -->
                    <el-switch 
                        v-model="formData.switch" 
                        :active-value="1"
                        :inactive-value="0"
                    />
                </el-form-item>
                <el-form-item prop="server_manage" label="伺服器管理" class="selServer">
                    <el-checkbox-group v-model="formData.server" size="large">
                        <el-checkbox v-for="server in serverList" :key="server" :label="server" border>
                            {{ server }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item class="flex justify-center">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="handleSubmit(dialogRef)">提交</el-button>
                </el-form-item>
            </el-form>
        <!-- </div> -->
    </el-card>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from "../stores/loginAuth";
const loginAuth = useAuthStore()

const router = useRouter()
const id = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = ref('/api/')
const dialogRef = ref()
const nowUser = ref()
const isAdmin = ref()
let serverList = ref([])

// Api config
const phpAction = 'system_user';

const formData = ref({
    name: '',
    account: '',             // 聯絡人
    password: '',            // 密碼
    switch: '1',
    server: []
})

onMounted(() => {
    id.value = router.currentRoute._value.params.id
    nowUser.value = loginAuth.getUser   // 操作者帳號
    isAdmin.value = loginAuth.getIsAdmin
    getData()
    getServer()
})

const getData = async() => {
    const ajaxFormData = ref({ id: id.value })
    apiParam.value = `?action=get_${phpAction}`
    apiUrl.value = `${apiUrlPrefix.value}${phpAction}.php${apiParam.value}`

    const { data: { success, data } } = await axios.post(apiUrl.value, ajaxFormData.value)

    if (success){
        formData.value = data;
        // console.log(formData.value);
    }
}

const handleSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {
        console.log(formData.value);        
        if (valid){
            const ajax_data = formData.value
            const { data: { success, msg } } = await axios.post(`/api/${phpAction}.php?action=edit_${phpAction}`, ajax_data)

            if (success){
                Swal.fire({
                    title: `系統資訊`,
                    text: '修改資料成功',
                    icon: 'success',
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 2000,
                }).then(() => {
                    router.push({ path: '/systemUser' })
                })
            }
        }
    })
}

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
        nameTempArr = data.map(item => item.name)
        codeNameTempArr = data.map(item => item.code_name)
        // serverIdTempArr = data.map(item => item.id)
        for (let i = 0; i < data.length; i++){
            mixServerList[i] = `${nameTempArr[i]}[${codeNameTempArr[i]}]`
        }
        serverList.value = mixServerList
    }
}

const handleCancel = () => {
    router.push({ path: '/systemUser' })
}

</script>

<style>
.el-form-item__content{
    display: flex;
    justify-content: center;
    margin-left: 0 !important;
}
.radio_column .el-form-item__content{
    justify-content: flex-start;
}
.date_column .el-input,
.date_column .el-input__wrapper,
.date_column .el-form-item__content{
    width: 100%;
}
/* .el-card__body {
    padding-bottom: 0;
} */
.selServer .el-checkbox-group{
    display: flex;
    flex-wrap: wrap !important;
    row-gap: 10px;
}
</style>