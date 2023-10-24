<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header">
                <span class="font-semibold text-left">背景圖片設定</span>
            </div>
        </template>
        <el-image v-if="imgUrl != ''" style="max-width: 720px; height: auto" :src="imgUrl"/>
        <el-upload
        ref="uploadRef"
        class="upload-demo"
        :action="imgUploadUrl"
        :multiple="false"
        :show-file-list="false"
        accept=".png,.jpg,.jpeg"
        :on-success="handleSuccess"
        :limit="1"
        >
            <el-button type="primary">上傳</el-button>
        </el-upload>
    </el-card>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'
import Swal from 'sweetalert2'

const router = useRouter()
const id = ref()
const apiUrl = ref()
const apiParam = ref()
const apiUrlPrefix = ref('/api/')
let imgUploadUrl = ref()
const imgUrl = ref('')

// Api config
const phpAction = 'server';

onMounted(() => {
    id.value = router.currentRoute._value.params.id
    getData()
    
    // 這邊的檔案上傳不可用vite proxy，會失敗
    imgUploadUrl.value = `https://tools.mercylife.cc/bonus-register/imgUpload/imgUpload.php?action=imgUpload&sid=${id.value}`
})

const getData = async() => {
    const ajaxFormData = ref({ id: id.value })
    apiParam.value = `?action=get_bg_img`
    apiUrl.value = apiUrlPrefix.value + `${phpAction}.php` + apiParam.value

    const { data: { success, data } } = await axios.post(apiUrl.value, ajaxFormData.value)

    if (success){
        imgUrl.value = data
    }
}

const handleSuccess = (response, file, fileList, rowInfo) => {
    // const { data: { success, msg } } = response
    if (response.success){
        Swal.fire({
            title: `系統提示`,
            text: response.msg,
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
        }).then(() => {
            getData()
            // router.push({ path: '/server' })
        })
    }else{
        Swal.fire({
            title: `系統提示`,
            text: response.msg,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
        }).then(() => {
            // history.go(0)
            router.push({ name: 'editServerBgImg' })
        })
    }
}

// function handleChange(){
//     this.$refs.upload.submit();
// }

const handleCancel = () => {
    router.push({ path: '/server' })
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