<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header">
                <span class="font-semibold text-left">簡訊儲值</span>
            </div>
        </template>
        <el-form
                :model="formData"
                ref="dialogRef"
                label-width="100px"
                style="margin: 10px; width: auto;"
                >
                <el-form-item prop="name" label="目前數量">
                    <el-input v-model="formData.msg_num" class="text-center"></el-input>
                </el-form-item>
                <el-form-item prop="account" label="累積數量" disabled>
                    <el-input v-model="formData.msg_total" class="text-center"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="新增數量">
                    <el-input v-model="formData.add_num"></el-input>
                </el-form-item>
                <el-form-item class="flex justify-center">
                    <el-button @click="handleCancel">取消</el-button>
                    <el-button type="primary" @click="handleSubmit(dialogRef)">提交</el-button>
                </el-form-item>
            </el-form>
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

// Api config
const phpAction = 'system_user';

const formData = ref({
    msg_num: '',
    msg_total: '',             
    msg_last_num: '', 
    add_num: ''
})

onMounted(() => {
    id.value = router.currentRoute._value.params.id
    getData()
})

const getData = async() => {
    const ajaxFormData = ref({ id: id.value })
    apiParam.value = `?action=get_${phpAction}`
    apiUrl.value = apiUrlPrefix + `${phpAction}.php` + apiParam.value

    const { data: { success, data } } = await axios.post(apiUrl.value, ajaxFormData.value)

    if (success){
        formData.value = data;
    }
}

const handleSubmit = (formEl) => {
    if (!formEl) return;
    formEl.validate(async(valid) => {  
        if (valid){
            const ajax_data = formData.value
            apiParam.value = `?action=edit_msg`
            apiUrl.value = apiUrlPrefix + `${phpAction}.php` + apiParam.value
            const { data: { success, msg } } = await axios.post(apiUrl.value, ajax_data)

            if (success){
                Swal.fire({
                    title: `系統資訊`,
                    text: msg,
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

.el-card__body {
    padding-bottom: 15px;
}

</style>