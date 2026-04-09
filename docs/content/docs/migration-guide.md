# Migration Guide

This guide maps the legacy `frappe-ui` API surface to the workspace package
structure.

## Package split

| Old                                   | New                        |
| ------------------------------------- | -------------------------- |
| `frappe-ui`                           | `@yletlabs/frappe-ui`      |
| Frappe-specific modules mixed in core | `@yletlabs/frappe-ui-ext`  |
| Vite helpers in root `vite/`          | `@yletlabs/frappe-ui-vite` |

## Installation changes

```sh
pnpm add @yletlabs/frappe-ui
```

Optional packages:

```sh
pnpm add @yletlabs/frappe-ui-ext @yletlabs/frappe-ui-vite
```

## Style import

```ts
import '@yletlabs/frappe-ui/style.css'
```

## Data fetching migration

| Legacy API               | Replacement             |
| ------------------------ | ----------------------- |
| `createResource`         | `useCall`               |
| `createListResource`     | `useList`               |
| `createDocumentResource` | `useDoc`                |
| `resourcesPlugin`        | direct composable usage |

## Removed legacy UI exports

The following legacy exports were removed from the core public API:

- `FeatherIcon` (use Lucide/custom icons)
- `TabButtons` (use `Tabs` or composed `Button` controls)
- `Input` (use focused inputs like `TextInput`, `Textarea`, `Select`)
- old plugin/global-property installation surface

## Icon migration

All `FeatherIcon` usages should be replaced by Lucide-based icons (or custom
icon components). In this repository, internal call-sites use `FrappeIcon` which
maps icon names to Lucide components.

## Test stack migration

- Cypress component tests were removed from the workspace.
- Legacy inventory covered **27** `*.cy.ts` component tests.
- Validation now relies on:
  - package-level Vitest suites (`pnpm test`)
  - Storybook build checks (`pnpm build-storybook`)
  - Storybook accessibility checks via axe (`pnpm test:a11y`)
