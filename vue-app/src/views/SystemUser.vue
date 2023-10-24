<template>
    <el-card class="box-card mx-auto mt-3">
        <template #header>
            <div class="card-header text-left">
                <span class="text-xl font-semibold">系統使用者</span>
            </div>
        </template>
        <div class="h-full px-5">
            <div class="w-full flex items-center justify-between">
                <el-form :inline="true">
                    <!-- <el-form-item prop="colName" label="">
                        <el-input v-model="filterEngName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="small" @click="handleSort">篩選</el-button>
                    </el-form-item> -->
                </el-form>
                <el-form :inline="true">
                    <el-form-item class="float-right">
                        <el-button type="primary" size="small" @click="handleAdd"
                            >新增</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
            <el-table
            :data="tableData"
            max-height="70vh"
            style="width: 100%"
            border
            v-if="tableData.length > 0"
            >
                <el-table-column type="index" label="編號" align="center" width="70"/>
                <el-table-column label="姓名" align="center" width="auto" prop="name"/>
                <el-table-column label="帳號" align="center" width="auto" prop="account"/>
                <el-table-column label="簡訊數量" align="center" width="auto" prop="msg_num">
                    <template v-slot:header='scope'>
                        <span>
                            簡訊數量
                            <el-tooltip
                            class="item"
                            effect="dark"
                            placement="top-start"
                            content="可用數量/累積數量"
                            >
                                <el-icon :size="15" color="#555"><QuestionFilled /></el-icon>
                            </el-tooltip>
                        </span>
                    </template>
                    <template #default="scope">
                        <label>{{ scope.row.msg_num }}/{{ scope.row.msg_total }}</label>
                    </template>
                </el-table-column>
                <el-table-column label="管理數" align="center" width="auto" prop="manage_server_count"/>
                <el-table-column label="啟用狀態" align="center" width="auto" prop="switch">
                    <template #default="scope">
                        <el-tag effect="dark" :type="scope.row.switch == 0 ? 'danger' : 'success'">{{ scope.row.switch == 0 ? '停用' : '開啟' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="最後登入" align="center" width="auto" prop="last_login_time"/>
                <el-table-column label="建立時間" align="center" width="auto" prop="create_at"/>
                <el-table-column
                label="操作"
                align="center"
                width="150"
                prop="operation"
                >
                    <template #default="scope">
                        <el-button
                            size="small"
                            type="primary"
                            @click="handleEdit(scope.row)">
                            <el-icon><EditPen /></el-icon>
                        </el-button>
                        <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.row)">
                            <el-icon><Delete /></el-icon>
                        </el-button>
                        <el-button
                            size="small"
                            type="success"
                            @click="handleMsg(scope.row)">
                            <el-icon><Message /></el-icon>
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-row>
                <el-col :span="24">
                    <div class="flex justify-center mt-3">
                        <el-pagination
                            v-model:currentPage="page_index"
                            v-model:page-size="page_size"
                            :page-sizes="page_sizes"
                            small="small"
                            :layout="layout"
                            :total="page_total"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                        />
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import axios from 'axios';
import { EditPen, Delete, QuestionFilled, Message } from "@element-plus/icons-vue";
import Swal from 'sweetalert2'
import { useRouter } from "vue-router";

const tableData = ref([])
const allTableData = ref([])
const filterTableData = ref([])
const show = ref(false)
const editData = ref()
const operation = ref()   // 0為編輯，1為新增

// Api config
const phpAction = 'system_user';

const router = useRouter()

// 分頁
const page_index = ref(1),
      page_size = ref(10),
      page_total = ref(0),
      page_sizes = [5, 10, 15, 20],
      layout = "total, sizes, prev, pager, next, jumper"
// 篩選
const filterEngName = ref()

const getSystemUser = async() => {
    const { data: { success, data } } = await axios.post('/api/system_user.php?action=system_user')

    if (success){
        tableData.value = data
        allTableData.value = data
        filterTableData.value = data
        setPaginations()
    }else{
        history.go(0)
    }
}

watchEffect(() => getSystemUser())

const handleAdd = () => {
    router.push({ name: 'addSystemUser' })
}

const handleEdit = (row) => {
    const { id } = row
    router.push({
        name: 'editSystemUser',
        params:{ id: id }
    })
}

const handleDelete = async(row) => {
    const { id } = row
    const ajax_data = { id: id }

    const { data: { success, msg } } = await axios.post(
        `/api/${phpAction}.php?action=delete_${phpAction}`,
        ajax_data
    )
    // console.log(success);

    if (success){
        Swal.fire({
            title: `系統提示`,
            text: msg,
            icon: 'success',
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
        }).then(() => {
            getSystemUser()
        })
    }
}

const handleMsg = (row) => {
    const { id } = row
    router.push({
        name: 'editSystemUserMsg',
        params:{ id: id }
    })
}

const handleSizeChange = (pages) => {
    page_index.value = 1;
    page_size.value = pages;

    // 重构数据
    tableData.value = allTableData.value.filter((item, index) => {
        return index < page_size.value;
    });
};

const handleCurrentChange = (page) => {
    let currentPage = page_size.value * (page - 1);
    let pageData = allTableData.value.filter((item, index) => {
        return index >= currentPage;
    });
    tableData.value = pageData.filter((item, index) => {
        return index < page_size.value;
    });
};

const setPaginations = () => {
    page_total.value = allTableData.value.length;
    page_index.value = 1;
    page_size.value = 10;
    // 具体显示几页 6 5 2页 第一页5 第二页1
    tableData.value = allTableData.value.filter((item, index) => {
    return index < page_size.value;
    });
};

const closeModel = () => {
    show.value = false
    editData.value = {}
}

// 篩選
const handleSort = () => {
//     if (filterEngName.value == ''){

//         Swal.fire({
//             title: `請輸入藥品名`,
//             icon: 'error',
//             showConfirmButton: false,
//             showCancelButton: false,
//             timer: 2000,
//         }).then(() => {
//             getMedicine()
//             return
//         })
//     }

//     allTableData.value = filterTableData.value.filter((item) => {
//         let eng_name = item.eng_name
//         eng_name = eng_name.toUpperCase()
//         return eng_name.includes(filterEngName.value.toUpperCase())
//     })
//     setPaginations();
// }

// const handleCancelSort = () => {
//     history.go(0)
}

</script>
<style>
.el-form-item{
    margin-right: 5px !important;
}
.el-table__row .el-button{
    margin-left: 5px;
}
</style>