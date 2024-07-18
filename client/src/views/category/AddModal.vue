<template>
  <div class="dialogWrapper">
    <el-dialog :title="title" v-model="isShow" width="600px" @close="onClose" draggable>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="180px">
        <el-row :gutter="30">
          <!-- <el-col :span="12">
            <el-form-item label="使用人" prop="user">
              <el-select v-model="form.user" placeholder="请输入或选择使用人" filterable clearable>
                <el-option v-for="item in personnelOptions" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="18">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入分类名称" />
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="编号" prop="code">
              <el-input v-model="form.code" placeholder="请输入编号" />
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label
                  }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->

        </el-row>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="onClose">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="categoryAddModel">
import { getCurrentInstance, ref, computed } from 'vue'
import { addCategory, updateCategory } from "@/api/category";

const { proxy } = getCurrentInstance()
const isShow = ref(false)
const isEdit = ref(false)
const title = computed(() => isEdit.value ? '修改分类' : '新增分类')
const rules = {
  name: [{ required: true, message: '分类名称不能为空', trigger: 'blur' }],
}

const emit = defineEmits(['submit'])
const form = ref({})
const open = async (data = {}) => {
  console.log(data);
  form.value = data
  isEdit.value = data.id != null
  isShow.value = true
}

const submitForm = () => {
  proxy.$refs['formRef'].validate((valid) => {
    if (valid) {
      if (form.value.id != null) {
        updateCategory(form.value).then((response) => {
          proxy.$modal.msgSuccess('修改成功')
          isShow.value = false
          emit('submit')
        })
      } else {
        addCategory(form.value).then((response) => {
          proxy.$modal.msgSuccess('新增成功')
          isShow.value = false
          emit('submit')
        })
      }
    }
  })
}

const onClose = () => {
  form.value = {}
  isShow.value = false
}

defineExpose({
  open
})
</script>

<style scoped lang="scss"></style>
