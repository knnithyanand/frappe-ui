# Utilities

Useful helpers exported from `@yletlabs/frappe-ui`.

## `debounce`

Run a function only once within a wait window (in milliseconds).

```ts
import { debounce } from '@yletlabs/frappe-ui'

const onInput = (value: string) => {
  console.log(value)
}

const debouncedInput = debounce(onInput, 500)
```

## `fileToBase64`

Convert a `File` object to a base64 string.

```ts
import { fileToBase64 } from '@yletlabs/frappe-ui'

const base64 = await fileToBase64(file)
```

## `usePageMeta`

Set page title and favicon metadata from composition API code.

```ts
import { usePageMeta } from '@yletlabs/frappe-ui'

usePageMeta(() => ({
  title: 'Dashboard',
  emoji: '📊',
}))
```
