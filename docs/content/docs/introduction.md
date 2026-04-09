# What is Frappe UI?

Frappe UI is a Vue 3 component library and data-fetching toolkit for building
Frappe-powered frontend applications.

It includes:

- reusable UI components (`Button`, `Dialog`, `Select`, `TextInput`, etc.)
- typed data-fetching composables (`useCall`, `useDoc`, `useList`)
- Vue directives and utility helpers
- an optional Frappe integration package (`@yletlabs/frappe-ui-ext`)

## Usage example

```vue
<script setup lang="ts">
import { Button, LoadingText, useList } from '@yletlabs/frappe-ui'

const todos = useList({
  doctype: 'ToDo',
  fields: ['name', 'description', 'status'],
  orderBy: 'modified desc',
  immediate: true,
})
</script>

<template>
  <LoadingText v-if="todos.loading" />
  <ul v-else>
    <li v-for="todo in todos.data" :key="todo.name">
      {{ todo.description }}
    </li>
  </ul>
  <Button label="Reload" @click="todos.reload()" />
</template>
```

## Core dependencies

Frappe UI is built on top of:

- [Vue 3](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Reka UI](https://reka-ui.com)
- [TipTap](https://tiptap.dev)
- [Lucide](https://lucide.dev)

See package-level dependency details in:

- `packages/core/package.json`
- `packages/ext/package.json`
- `packages/vite/package.json`

## License

Frappe UI is MIT licensed.
