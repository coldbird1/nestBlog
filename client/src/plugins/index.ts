import modal from './modal'
export default function installPlugins(app: any) {
  // 模态框对象
  app.config.globalProperties.$modal = modal
}
