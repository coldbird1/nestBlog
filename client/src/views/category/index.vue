<template>
  <div class="mainContainer">
    <el-row :gutter="10" class="mb-4">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" @click="handleUpdate">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" @click="handleDelete">删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="tableRef" :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="createdBy" label="创建人" />
      <el-table-column property="createdAt" label="创建时间" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <AddModal ref="addModelRef" @submit="getList"></AddModal>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { listCategory, delCategory } from '@/api/category'
import AddModal from './AddModal.vue';
import { getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const queryParams = ref({
  pageNum: 1,
  pageSize: 10
})

interface Category {
  id: number;
  name: string;
  createdAt: Date;
  createdBy: number | null;
  updatedAt: Date;
  updatedBy: number | null;
}

const tableData = ref<Category[]>()
const tableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Category[]>([])
const toggleSelection = (rows?: Category[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      tableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    tableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: Category[]) => {
  multipleSelection.value = val
}



const getList = async () => {
  const { data } = await listCategory(queryParams)
  tableData.value = data
}

const handleAdd = () => {
  proxy.$refs.addModelRef.open()
}

const handleUpdate = (data: Category) => {
  proxy.$refs.addModelRef.open(data)
}

const handleDelete = (data: Category) => {
  proxy.$modal.confirm('是否确认删除选中数据项？').then(function () {
    delCategory(data.id).then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    }).catch(() => { });
  })
}

getList()
</script>