// src/types.d.ts
import { ComponentPublicInstance } from 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: (...args: any[]) => void
  }
}
