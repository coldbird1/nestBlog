<template>
  <div class="mainContainer">
    <el-row :gutter="10" class="mb-4">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" @click="handleUpdate" :disabled="!isSingle">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" @click="handleDelete()" :disabled="!isMultiple">删除</el-button>
      </el-col>
    </el-row>
    <el-table ref="tableRef" :data="tableData" style="width: 100%" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align />
      <el-table-column prop="name" label="名称" align="center" show-overflow-tooltip />
      <el-table-column prop="createdBy" label="创建人" align="center" show-overflow-tooltip />
      <el-table-column property="createdAt" label="创建时间" align="center" show-overflow-tooltip />
      <el-table-column prop="updatedBy" label="修改人" align="center" show-overflow-tooltip />
      <el-table-column property="updatedAt" label="修改时间" align="center" show-overflow-tooltip />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="paginationContainer">
      <el-pagination v-model:current-page="queryParams.pageNum" v-model:page-size="queryParams.pageSize"
        :page-sizes="[10, 20, 50, 100]" size="default" layout="total, sizes, prev, pager, next, jumper" :total="total"
        @size-change="getList" @current-change="getList" />
    </div>
    <AddModal ref="addModelRef" @submit="getList">
    </AddModal>
  </div>

</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElTable } from 'element-plus'
import { listCategory, delCategory } from '@/api/category'
import AddModal from './AddModal.vue';
import { getCurrentInstance } from 'vue'
import type { Category } from './types'

const { proxy } = getCurrentInstance()

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)


const tableData = ref<Category[]>()
const tableRef = ref<InstanceType<typeof ElTable>>()
const ids = ref<number[]>([])
const isMultiple = computed(() => ids.value.length > 0)
const isSingle = computed(() => ids.value.length === 1)

const handleSelectionChange = (val: Category[]) => {
  ids.value = val.map(item => item.id!)
}

const getList = async () => {
  const { data } = await listCategory(queryParams.value)
  tableData.value = data.rows
  total.value = data.total
}

const handleAdd = () => {
  proxy.$refs.addModelRef.open()
}

const handleUpdate = (data: Category) => {
  proxy.$refs.addModelRef.open({ ...data })
}

const handleDelete = (data: Category | null = null) => {
  let selectIds = data ? [data?.id] : ids.value
  proxy.$modal.confirm('是否确认删除选中数据项？').then(function () {
    delCategory({ ids: selectIds }).then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    }).catch(() => { });
  })
}

getList()
</script>