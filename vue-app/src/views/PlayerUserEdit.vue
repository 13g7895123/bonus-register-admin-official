<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header">
                <span>玩家資料修改</span>
            </div>
        </template>
        <!-- <div class="flex justify-center"> -->
            <el-form
                :model="formData"
                ref="dialogRef"
                label-width="120px"
                style="margin: 10px; width: auto;"
                >
                <el-form-item prop="account" label="帳號">
                    <el-input v-model="formData.account" class="text-center"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密碼">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item prop="phone" label="手機">
                    <el-input v-model="formData.phone"></el-input>
                </el-form-item>
                <el-form-item prop="birthday" label="生日" class="date_column">
                    <el-date-picker
                        v-model="formData.birthday"
                        type="date"
                    />
                </el-form-item>
                <el-form-item prop="server" label="伺服器">
                    <el-input v-model="formData.server_name" readonly="true"></el-input>
                </el-form-item>
                <el-form-item prop="switch" label="啟用" class="radio_column">
                    <!-- <el-input v-model="formData.server_name" readonly="true"></el-input> -->
                    <el-switch 
                        v-model="formData.switch" 
                        :active-value="1"
                        :inactive-value="0"
                    />
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

const router = useRouter()
const id = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = '/api/'
const dialogRef = ref()

const formData = ref({
    account: '',             // 聯絡人
    password: '',               // 密碼
    passwordCheck: '',          // 密碼確認
    phone: '',                  // 電話
    birthday: '',                   // 郵件
    server_name: '',
})

onMounted(() => {
    id.value = router.currentRoute._value.params.id
    getData()
})

const getData = async() => {
    const ajaxFormData = ref({ id: id.value })
    apiParam.value = '?action=get_player_user'
    apiUrl.value = apiUrlPrefix + "player_user.php" + apiParam.value

    const { data: { success, data } } = await axios.post(apiUrl.value, ajaxFormData.value)

    if (success){
        formData.value = data;
    }
}

const handleSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {
        console.log(formData.value);        
        if (valid){
            const ajax_data = formData.value
            const { data: { success, msg } } = await axios.post(`/api/player_user.php?action=edit_player_user`, ajax_data)

            if (success){
                Swal.fire({
                    title: `系統資訊`,
                    text: '修改資料成功',
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

const handleCancel = () => {
    router.push({ path: '/player' })
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
</style>