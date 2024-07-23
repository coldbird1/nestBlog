<template>
  <div class="mainContainer">
    <div class=" mb-20px">{{ title }}</div>
    <el-form :model="form" :rules="rules" ref="formRef" class="flex flex-col ">
      <el-form-item label="标题" prop="title" class="flex justify-center">
        <el-input v-model="form.title" placeholder="请输入标题" clearable />
      </el-form-item>
      <el-form-item label="分类" prop="categoryId">
        <el-select v-model="form.categoryId" plplaceholder="请选择分类">
          <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="content">
        <div id="tinyEditer"></div>
      </el-form-item>
      <div class="flex justify-center  items-center">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="onClose">取 消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup name="categoryAddModel" lang="ts">
import { getCurrentInstance, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import tinymce from 'tinymce'
import { listCategory } from "@/api/category";
import { addArticle, queryArticle, updateArticle } from "@/api/article";
import type { Article } from './types'
import type { Category } from '@/views/category/types'
const route = useRoute()
const router = useRouter()


const { proxy } = getCurrentInstance()
const isEdit = ref(false)
const title = computed(() => isEdit.value ? '修改文章' : '新增文章')
const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
  categoryId: [{ required: true, message: '分类不能为空', trigger: 'change' }],
  content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
}

const emit = defineEmits(['submit'])
const form = ref<Article>({})
const categoryOptions = ref<Category[]>([])
const open = async (data: Article = {}) => {
  console.log(data);
  form.value = data
  isEdit.value = data.id != null
}

const submitForm = () => {
  form.value.content = tinymce.activeEditor?.getContent()
  proxy.$refs['formRef'].validate((valid: boolean) => {
    if (valid) {
      if (form.value.id != null) {
        updateArticle(form.value).then((response) => {
          proxy.$modal.msgSuccess('修改成功')
          router.replace('/article')
        })
      } else {
        console.log(form.value);
        addArticle(form.value).then((response) => {
          proxy.$modal.msgSuccess('新增成功')
          router.replace('/article')
        })
      }
    }
  })
}

const onClose = () => {
  router.go(-1)
}

const initObj = {
  selector: '#tinyEditer',
  license_key: 'gpl',
  statusbar: false,
  menubar: true,
  toolbar: true,
  skin: 'oxide-dark',
  language: 'zh_CN',
  plugins: "image code table",
  height: 470,
  width: "100%"
}

onMounted(async () => {
  await tinymce.init(initObj)
  const articleId: string = route.params.id as string
  if (articleId) {
    isEdit.value = true
    const { data } = await queryArticle(articleId)
    form.value = data
    tinymce.get('tinyEditer').setContent(data.content);
  }
})

onBeforeUnmount(() => {
  tinymce.remove();
});

listCategory({}).then(res => {
  categoryOptions.value = res.data.rows
})

defineExpose({
  open
})
</script>

<style scoped lang="scss">
:deep(.tox-promotion) {
  display: none !important
}
</style>
