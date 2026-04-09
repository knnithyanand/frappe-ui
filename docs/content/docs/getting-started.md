# Getting Started

`frappe-ui` is published as workspace packages:

- `@yletlabs/frappe-ui` (core components and composables)
- `@yletlabs/frappe-ui-ext` (Frappe-specific runtime helpers/components)
- `@yletlabs/frappe-ui-vite` (Vite plugins)

## Install

```sh
pnpm add @yletlabs/frappe-ui
```

If your app integrates with Frappe runtime helpers:

```sh
pnpm add @yletlabs/frappe-ui-ext
```

## Register styles

Import the packaged stylesheet once in your app entry:

```ts
import '@yletlabs/frappe-ui/style.css'
```

## Use components

```vue
<script setup lang="ts">
import { Button, TextInput } from '@yletlabs/frappe-ui'
</script>

<template>
  <div class="space-y-2">
    <TextInput label="Name" placeholder="Jane Doe" />
    <Button label="Save" theme="blue" />
  </div>
</template>
```

## Vite plugin setup

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import frappeui from '@yletlabs/frappe-ui-vite'

export default defineConfig({
  plugins: [
    frappeui({
      frappeProxy: true,
      lucideIcons: true,
      jinjaBootData: true,
    }),
    vue(),
  ],
})
```
