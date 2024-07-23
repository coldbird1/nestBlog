<template>
  <div class="mainContainer">
    <el-row :gutter="10" class="mb-4">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="Edit" @click="handleUpdate()" :disabled="!isSingle">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="Delete" @click="handleDelete()" :disabled="!isMultiple">删除</el-button>
      </el-col>
    </el-row>
    <el-table v-loading="tableLoading" ref="tableRef" :data="tableData" style="width: 100%" stripe
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align />
      <el-table-column prop="title" label="标题" align="center" show-overflow-tooltip />
      <el-table-column prop="categoryName" label="分类" align="center" show-overflow-tooltip />
      <el-table-column prop="userName" label="作者" align="center" show-overflow-tooltip />
      <el-table-column property="createdAt" label="创建时间" align="center" show-overflow-tooltip />
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

  </div>

</template>

<script lang="ts" setup>
import { ref, computed, getCurrentInstance } from 'vue'
import { ElTable } from 'element-plus'
import { listArticle, delArticle } from '@/api/article'
import { useRouter } from 'vue-router'
import type { Article } from './types'

const { proxy } = getCurrentInstance()
const router = useRouter()

const queryParams = ref({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)

const tableLoading = ref(false)
const tableData = ref<Article[]>()
const tableRef = ref<InstanceType<typeof ElTable>>()
const ids = ref<number[]>([])
const isMultiple = computed(() => ids.value.length > 0)
const isSingle = computed(() => ids.value.length === 1)

const handleSelectionChange = (val: Article[]) => {
  ids.value = val.map(item => item.id!)
}

const getList = async () => {
  try {
    tableLoading.value = true
    const { data } = await listArticle(queryParams.value)
    tableData.value = data.rows
    total.value = data.total
  } finally {
    tableLoading.value = false
  }
}

const handleAdd = () => {
  router.push({ path: '/article/edit' })
}

const handleUpdate = (data: Article | null = null) => {
  const id = data ? data.id : ids.value[0]
  router.push({ name: 'articleEdit', params: { id } })
}

const handleDelete = (data: Article | null = null) => {
  let selectIds = data ? [data?.id] : ids.value
  proxy.$modal.confirm('是否确认删除选中数据项？').then(function () {
    delArticle({ ids: selectIds }).then(() => {
      getList();
      proxy.$modal.msgSuccess("删除成功");
    }).catch(() => { });
  })
}

getList()
</script>