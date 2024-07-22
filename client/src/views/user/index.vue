<template>
  <div class="mainContainer  h-full w-full overflow-y-auto">
    <div id="myEditor"></div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, reactive, ref, onBeforeUnmount } from 'vue'
import tinymce from 'tinymce'

const initObj = {
  selector: '#myEditor',
  license_key: 'gpl',
  statusbar: false,
  menubar: true,
  toolbar: true,
  skin: 'oxide-dark',
  language: 'zh_CN',
  plugins: "image code table"
}

onMounted(async () => {
  await tinymce.init(initObj)
})

onBeforeUnmount(() => {
  tinymce.remove();
});
</script>

<style scoped lang="scss">
:deep(.tox-promotion) {
  display: none !important
}
</style>
