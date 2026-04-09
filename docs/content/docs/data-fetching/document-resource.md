# `useDoc`

`useDoc` provides document-centric CRUD and method calls for a single record.

## Basic usage

```vue
<script setup lang="ts">
import { useDoc } from '@yletlabs/frappe-ui'

const todo = useDoc({
  doctype: 'ToDo',
  name: 'TODO-0001',
  methods: {
    sendEmail: 'send_email',
  },
  immediate: true,
})
</script>

<template>
  <div v-if="todo.doc">
    <h3>{{ todo.doc.description }}</h3>
    <button @click="todo.setValue.submit({ status: 'Closed' })">
      Mark closed
    </button>
    <button @click="todo.sendEmail.submit({ email: todo.doc.owner })">
      Send email
    </button>
  </div>
</template>
```

## Common actions

```ts
todo.reload()
todo.setValue.submit({ description: 'Updated' })
todo.delete.submit()
```

## Notes

- `methods` creates typed call handles on the returned object.
- `useDoc` replaces legacy document resource APIs.
