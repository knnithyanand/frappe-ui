# `useList`

`useList` handles DocType list queries and list-level mutations.

## Basic usage

```vue
<script setup lang="ts">
import { useList } from '@yletlabs/frappe-ui'

const todos = useList({
  doctype: 'ToDo',
  fields: ['name', 'description', 'status'],
  filters: () => ({ status: 'Open' }),
  orderBy: 'modified desc',
  limit: 20,
  immediate: true,
})
</script>

<template>
  <div v-for="todo in todos.data" :key="todo.name">
    {{ todo.description }}
  </div>
  <button :disabled="!todos.hasNextPage" @click="todos.next()">Next</button>
</template>
```

## Common actions

```ts
todos.reload()
todos.next()
todos.previous()
todos.setValue.submit({ name: 'TODO-0001', status: 'Closed' })
todos.insert.submit({ description: 'New todo' })
todos.delete.submit({ name: 'TODO-0001' })
```

## Notes

- `filters` should be a function when it depends on reactive values.
- Use a stable `cacheKey` for shared list caching across screens.
- Prefer `useList` over legacy resource APIs.
