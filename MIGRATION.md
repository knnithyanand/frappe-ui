# MIGRATION.md

This document is the **authoritative implementation guide** for migrating `frappe-ui` to a modern, maintainable package set.

It is written for:

- library maintainers,
- frontend developers,
- AI coding agents.

Treat this as the single source of truth for the migration. Do **not** introduce alternate plans, compatibility branches, or new architectural choices unless a hard blocker appears that this document cannot cover.

---

## 1. Migration goal

Convert the current repository into a **pnpm workspace-based, Vue 3.5+, Tailwind CSS v4, Vite-first component library** with:

- **full legacy cleanup**,
- **a single breaking major release**,
- **no broad backward-compatibility layer**,
- **named exports only**,
- **no published source-file entry points**,
- **a single distributed stylesheet from the core package**,
- **clear separation between core UI, Frappe extensions, and Vite tooling**.

The end state must be easier to maintain than the current repo. Prefer removing entire layers over preserving historical behavior.

---

## 2. Non-negotiable decisions

These decisions are locked. Do not reopen them during implementation.

| Topic | Decision | Justification |
|---|---|---|
| Modernization scope | **Full cleanup with breaking changes and legacy code removal** | The current repo is difficult to manage because modern and legacy layers coexist. Keeping both would preserve the maintenance burden. |
| Release model | **Single breaking major release** | A clean cut is preferable to a prolonged dual-API migration. |
| Repository topology | **pnpm workspaces** | The target is multiple published packages with a private orchestration root. pnpm is the best fit for a workspace-first library repo. |
| Root package | **Private root only; not published** | The root should orchestrate docs, examples, shared config, and workspace scripts, not act as a package contract. |
| Workspace layout | **`packages/core`, `packages/ext`, `packages/vite`, `docs`, `examples`** | This is the smallest split that matches the actual architectural seams already present while keeping the extension package name aligned with `@yletlabs/frappe-ui-ext`. |
| Core package name | **`@yletlabs/frappe-ui`** | Keeps the main package name aligned with the current product identity. |
| Frappe extension package name | **`@yletlabs/frappe-ui-ext`** | Keeps Frappe-specific functionality separate without diluting the core package. |
| Vite package name | **`@yletlabs/frappe-ui-vite`** | Makes the Vite integration explicit and publishable on its own. |
| CSS ownership | **The core package ships `dist/frappe-ui.css`** | The root package is private, so CSS must ship from the main published UI package. |
| Typed data-fetching placement | **Keep `useCall`, `useDoc`, `useList`, etc. in the core package** | These composables are part of the main developer-facing API and are explicitly required to survive the migration. |
| Frappe package role | **High-level integrations only** | `@yletlabs/frappe-ui-ext` should contain session/auth/helpers/components, not low-level data-fetching primitives. |
| Icons | **Keep custom icons inside the core package** | A separate icons package adds overhead without enough value. |
| Browser support | **Modern browsers only** | Tailwind v4 is a hard modern-browser choice; the migration should not add legacy browser burden. |
| Node baseline | **Node 22 LTS** | Locks a clean modern toolchain for Vite, pnpm, Storybook, and CI. |
| Docs | **VitePress + Storybook** | VitePress is the canonical documentation surface; Storybook is the primary interactive sandbox. |
| Test strategy | **Vitest primary, Cypress removed unless a concrete browser-only gap exists** | The repo already has Vitest; Cypress should not survive by default. |
| Versioning model | **Changesets with fixed/locked versions across published packages** | The packages are closely related and should move together to reduce release and support complexity. |
| Vite icon helper | **Keep `lucideIcons` in `@yletlabs/frappe-ui-vite`** | It is a build-time concern and belongs in the Vite helper package, not in the runtime UI package. |
| Editor styles | **Internal source only; not a separate public CSS artifact** | The migration requires a single public stylesheet from the core package. |
| Legacy policy | **No broad compatibility layer** | The migration must not preserve two generations of APIs long-term. |
| Publish contract | **No source-file exports** | Published packages must be dist-based, stable, and bundler-safe. |
| ECharts + grid-layout-plus dependency model | **Bundled as runtime deps in `packages/core`** | Both components are in the public API allowlist. Making them peer deps forces all consumers to install them even when only using a few charts. Since they are first-class public components, bundled runtime deps is the simpler and more reliable choice. |
| socket.io-client / initSocket | **Remove from core; move to `packages/ext`** | Socket.IO is Frappe-specific WebSocket plumbing, not generic UI. It does not belong in the core package. `packages/ext` is the correct home for Frappe-specific runtime integration. |
| TextEditor + TipTap | **Keep in `packages/core`** | TextEditor is in the public component allowlist and TipTap (~20 ProseMirror packages) is its required runtime. Splitting to `packages/ext` would add complexity without matching benefit. Consumers who do not use TextEditor should tree-shake it. |
| TextEditor sub-exports | **Make internal to TextEditor; do not export from the core barrel** | `TextEditorBubbleMenu`, `TextEditorFixedMenu`, `TextEditorFloatingMenu`, `createEditorButton`, and the image/suggestion extensions are implementation details of TextEditor. They should remain importable internally but not be part of the stable public API surface. |
| Vue 3.5 API modernization | **In scope for Workstream 3** | `defineModel`, `useTemplateRef`, and reactive props destructure are part of the Vue 3.5+ modernization goal. These should be adopted during the migration, not deferred to a follow-up pass. |
| Vue devDependency alignment | **Upgrade repo-internal `vue` devDependency to `^3.5.0`** | The repo currently declares `peerDependencies: vue >=3.5.0` but `devDependencies: vue ^3.3.0`. The repo's own test/build/dev environment must match the target baseline before Vue 3.5 APIs are adopted. |
| Reka UI | **Keep `reka-ui` as a runtime dependency of the core package** | Reka UI (v2.5.0) is already the active replacement for Headless UI in 11+ core components (Dialog, Popover, Tooltip, Toast, Switch, Slider, Select, Combobox, Dropdown, MultiSelect, Tabs). It must be explicitly acknowledged as a kept dependency, not left ambiguous. |
| Test infrastructure (MSW/mocks) | **Each package owns its own mock/test-infra files** | MSW handlers currently live in `src/mocks/`. In the workspace layout, each published package that has tests must own its test fixtures and mock handlers. Shared test utilities that cross package boundaries live at the workspace root under a `test-utils/` directory. |

### Must preserve

- typed data-fetching composables,
- semantic token naming (`surface-*`, `ink-*`, `outline-*`),
- Frappe integration support,
- Vite plugin support.

### Hard non-goals

- no broad backward-compatibility layer,
- no parallel legacy and modern APIs long-term,
- no published `src/*` package entries,
- no preserving old architecture just to reduce migration effort.

---

## 3. Target end state

### 3.1 Repository layout

```text
frappe-ui/
├─ package.json                  # private workspace root
├─ pnpm-workspace.yaml
├─ tsconfig.base.json
├─ MIGRATION.md
├─ docs/                         # VitePress docs
├─ .storybook/                   # Storybook config
├─ examples/
│  └─ playground/                # local consumer app
├─ packages/
│  ├─ core/
│  │  ├─ package.json            # @yletlabs/frappe-ui
│  │  ├─ vite.config.ts
│  │  ├─ tsconfig.json
│  │  ├─ tsconfig.build.json
│  │  └─ src/
│  │     ├─ components/
│  │     ├─ composables/
│  │     ├─ data-fetching/
│  │     ├─ directives/
│  │     ├─ icons/
│  │     ├─ styles/
│  │     ├─ utils/
│  │     ├─ __mocks__/            # MSW handlers for testing (not published)
│  │     └─ index.ts
│  ├─ ext/
│  │  ├─ package.json            # @yletlabs/frappe-ui-ext
│  │  ├─ vite.config.ts
│  │  └─ src/
│  │     ├─ components/
│  │     │  ├─ Billing/
│  │     │  ├─ DataImport/
│  │     │  ├─ Filter/
│  │     │  ├─ Help/
│  │     │  ├─ HelpCenter/
│  │     │  ├─ Link/
│  │     │  ├─ Onboarding/
│  │     │  └─ drive/
│  │     ├─ auth/
│  │     ├─ session/
│  │     ├─ socket/
│  │     ├─ telemetry/
│  │     ├─ helpers/
│  │     ├─ __mocks__/            # MSW handlers for testing (not published)
│  │     └─ index.ts
│  └─ vite/
│     ├─ package.json            # @yletlabs/frappe-ui-vite
│     └─ src/
│        ├─ frappeProxy.ts
│        ├─ buildConfig.ts
│        ├─ frappeTypes.ts
│        ├─ jinjaBootData.ts
│        ├─ lucideIcons.ts
│        ├─ siteBanner.ts
│        └─ index.ts
└─ modernisation/                # research and migration planning notes
```

### 3.2 Published packages

| Package | Role |
|---|---|
| `@yletlabs/frappe-ui` | Main UI package: components, typed data-fetching composables, styles, icons, directives, core utilities |
| `@yletlabs/frappe-ui-ext` | High-level Frappe integrations: session/auth/helpers/components built on top of the core package |
| `@yletlabs/frappe-ui-vite` | Vite plugin package for Frappe-related Vite integration |

### 3.3 Consumer contract

The implementation must support this import style:

```ts
import { Button, useDoc } from '@yletlabs/frappe-ui'
import '@yletlabs/frappe-ui/style.css'

import { createFrappeSession } from '@yletlabs/frappe-ui-ext'
import { frappeui } from '@yletlabs/frappe-ui-vite'
```

The physical CSS file must be `dist/frappe-ui.css`, but consumers should use the stable export path `@yletlabs/frappe-ui/style.css`.

### 3.4 Documentation and import migration requirements

The migration is not complete until the documentation is updated to match the new package structure and import paths.

Required documentation updates:

- root `README.md`
- `docs` installation and quick-start guides
- package-specific READMEs for `packages/core`, `packages/ext`, and `packages/vite`
- Vite plugin usage docs
- Frappe integration docs
- Storybook and example-app usage notes
- a migration guide from the current package structure to the workspace package structure

Required import migration table:

| Current surface | New surface | Notes |
|---|---|---|
| `frappe-ui` | `@yletlabs/frappe-ui` | Main components, composables, directives, utilities, and styles |
| `frappe-ui/style.css` | `@yletlabs/frappe-ui/style.css` | Keep the style import stable, but back it with `dist/frappe-ui.css` |
| `frappe-ui/frappe` | `@yletlabs/frappe-ui-ext` | High-level Frappe session/auth/helpers/components only |
| `frappe-ui/vite` | `@yletlabs/frappe-ui-vite` | All Vite-specific helper plugins move here |
| `createResource`, `createListResource`, `createDocumentResource` | `useCall`, `useDoc`, `useList` from `@yletlabs/frappe-ui` | Replace legacy resources APIs with typed composables |
| `FeatherIcon` | Lucide/custom icon usage from `@yletlabs/frappe-ui` and `@yletlabs/frappe-ui-vite` | Do not preserve the Feather component surface |

---

## 4. Migration principles

1. **Prefer deletion over adaptation.** If a legacy layer has a modern replacement, remove it instead of keeping both.
2. **Prefer Vite-native capabilities where they exist.** Use Vite library mode, Vite dev, Vite preview, and Tailwind's Vite plugin instead of alternate plumbing.
3. **Prefer explicit public APIs.** Publish named exports only. Avoid deep import contracts unless absolutely necessary.
4. **Prefer CSS-first tokens.** Tailwind config must stop being the design-system source of truth.
5. **Prefer one layer per responsibility.** One data-fetching layer, one icon strategy, one style system, one package build path.
6. **Prefer dist-based publishing.** All published packages must point at built JS/CSS/types, never raw source.
7. **Prefer maintainability over compatibility.** The new architecture must be simpler even if migration effort is higher.

---

## 5. Current-to-target move map

| Current path | Target action |
|---|---|
| `src/components/**` | Move to `packages/core/src/components/**` after deleting or replacing legacy-only components |
| `src/data-fetching/**` | Move to `packages/core/src/data-fetching/**` |
| `src/composables/**` | Move reusable public items to `packages/core/src/composables/**` |
| `src/directives/**` | Move to `packages/core/src/directives/**` |
| `src/utils/**` | Split into `packages/core/src/utils/**` or `packages/ext/src/helpers/**`; delete legacy-only utilities |
| `src/mocks/**` | Move to `packages/core/src/__mocks__/**`; each package creates its own test-infra directory as needed |
| `icons/**` | Move to `packages/core/src/icons/**` |
| `src/style.css` | Replace with `packages/core/src/styles/index.css` and Tailwind v4 CSS-first structure |
| `src/resources/**` | Delete |
| `src/components/Resource.vue` | Delete |
| `src/components/Input.vue` | Replace with focused components or delete if redundant |
| `src/components/FeatherIcon.vue` | Delete after Lucide/custom icon migration |
| `frappe/**` | Move to `packages/ext/src/**` and narrow to high-level integrations only; see [section 6.2](#62-yletlabsfrappe-ui-ext-packagesext) for the explicit module disposition table |
| `vite/**` | Move to `packages/vite/src/**` |
| `tailwind/**`, `tailwind.config.js`, `postcss.config.ts` | Remove from final architecture; replace with Tailwind v4 CSS-first tokens and Vite integration |
| `docs/**` | Keep, but consume workspace packages instead of aliasing the old root `src` tree |
| `cypress/**`, `cypress.config.ts` | Delete unless a real browser-only testing gap is found later |
| root `vite.config.ts` | Stop using it as the library build; keep only for non-published app surfaces if still needed |

---

## 6. Exact package responsibilities

### 6.1 `@yletlabs/frappe-ui` (`packages/core`)

This package owns:

- all public UI components,
- typed data-fetching composables (`useCall`, `useDoc`, `useDoctype`, `useFrappeFetch`, `useList`, `useNewDoc`),
- public directives,
- public utilities that are truly library-level,
- custom icons,
- `dist/frappe-ui.css`.

This package must **not** export:

- legacy resources APIs,
- `Resource.vue`,
- `FeatherIcon`,
- the old install plugin/global-properties pattern,
- raw `src/*` paths,
- deep legacy compatibility utilities.

### 6.2 `@yletlabs/frappe-ui-ext` (`packages/ext`)

This package owns:

- session/auth helpers,
- high-level Frappe components,
- higher-level convenience helpers built on the core package,
- Frappe-specific integration patterns that should not live in the generic core package,
- `initSocket` and socket.io-client WebSocket integration (moved from core).

#### Module disposition table

The current `frappe/` directory contains multiple modules. Each module's fate is documented here:

| Current module | Disposition | Target location |
|---|---|---|
| `frappe/session.js` | **Move** | `packages/ext/src/session/` |
| `frappe/index.js`, `frappe/index.d.ts` | **Replace** | Rebuild as `packages/ext/src/index.ts` |
| `frappe/Billing/` | **Move** | `packages/ext/src/components/Billing/` |
| `frappe/DataImport/` | **Move** | `packages/ext/src/components/DataImport/` |
| `frappe/Filter/` | **Move** | `packages/ext/src/components/Filter/` |
| `frappe/Help/` | **Move** | `packages/ext/src/components/Help/` |
| `frappe/HelpCenter/` | **Move** | `packages/ext/src/components/HelpCenter/` |
| `frappe/Link/` | **Move** | `packages/ext/src/components/Link/` |
| `frappe/Onboarding/` | **Move** | `packages/ext/src/components/Onboarding/` |
| `frappe/drive/` | **Move** | `packages/ext/src/components/drive/` |
| `frappe/telemetry/` | **Move** | `packages/ext/src/telemetry/` |
| `frappe/Icons/` | **Drop** | Custom icons that belong in the core package should move to `packages/core/src/icons/`; Frappe-only icons that are unused can be deleted. |

#### Dependency boundary prerequisite

Many modules in `frappe/` currently import `../../src/...` internals and use legacy `createResource` APIs directly. Before the physical move, each module must be refactored to:

1. import only from the public API of `@yletlabs/frappe-ui` (the core package),
2. replace any `createResource` / `createListResource` / `createDocumentResource` usage with the typed composables (`useCall`, `useDoc`, `useList`),
3. replace any `FeatherIcon` usage with Lucide or custom icon alternatives.

This refactoring is a prerequisite for Workstream 2 and should be completed as part of that workstream.

This package must **not** own:

- the typed low-level data-fetching composables,
- core presentational components,
- Tailwind/theme infrastructure,
- Vite plugin logic.

### 6.3 `@yletlabs/frappe-ui-vite` (`packages/vite`)

This package owns:

- `frappeui`,
- `frappeProxy`,
- `buildConfig`,
- `frappeTypes`,
- `jinjaBootData`,
- `lucideIcons`,
- `siteBanner`.

This package must be publishable independently and depend only on what is necessary.

### 6.4 Final public API checklist

This is the required end-state public surface.

#### `@yletlabs/frappe-ui`

Must export:

- these public components only:
  - `Alert`
  - `Autocomplete`
  - `Avatar`
  - `AxisChart`
  - `Badge`
  - `Breadcrumbs`
  - `Button`
  - `Calendar`
  - `Card`
  - `Checkbox`
  - `CircularProgressBar`
  - `Combobox`
  - `CommandPalette`
  - `ConfirmDialog`
  - `DatePicker`
  - `DateRangePicker`
  - `DateTimePicker`
  - `Dialog`
  - `Dialogs`
  - `Divider`
  - `DonutChart`
  - `Dropdown`
  - `ECharts`
  - `ErrorMessage`
  - `FileUploader`
  - `FormControl`
  - `FormLabel`
  - `FrappeUIProvider`
  - `FunnelChart`
  - `GridLayout`
  - `KeyboardShortcut`
  - `ListFilter`
  - `ListItem`
  - `ListView`
  - `LoadingIndicator`
  - `LoadingText`
  - `MonthPicker`
  - `MultiSelect`
  - `NumberChart`
  - `Password`
  - `Popover`
  - `Progress`
  - `Rating`
  - `Select`
  - `Sidebar`
  - `Slider`
  - `Switch`
  - `Tabs`
  - `Textarea`
  - `TextEditor`
  - `TextInput`
  - `TimePicker`
  - `Toast`
  - `Tooltip`
  - `Tree`
- these public composables only:
  - `useCall`
  - `useDoc`
  - `useDoctype`
  - `useFrappeFetch`
  - `useList`
  - `useNewDoc`
- these public directives only:
  - `onOutsideClickDirective`
  - `visibilityDirective`
  - `focusDirective`
- these public utilities only:
  - `call`
  - `createCall`
  - `request`
  - `frappeRequest`
  - `debounce`
  - `fileToBase64`
  - `FileUploadHandler`
  - `useFileUpload`
  - `usePageMeta`
  - `dayjs`
  - `dayjsLocal`
  - `setConfig`
  - `getConfig`
  - `confirmDialog`
  - `toast`
- component, composable, and utility types tied to the exported surface above.

Must not export:

- `Input`
- `List`
- `ListHeader`
- `ListHeaderItem`
- `ListEmptyState`
- `ListRows`
- `ListRow`
- `ListRowItem`
- `ListGroups`
- `ListGroupHeader`
- `ListGroupRows`
- `ListSelectBanner`
- `ListFooter`
- `Resource`
- `FeatherIcon`
- `TabButtons`
- `NestedPopover`
- `createResource`
- `createListResource`
- `createDocumentResource`
- `resourcesPlugin`
- `initSocket`
- `pageMetaPlugin`
- `CommandPaletteItem`
- `TextEditorBubbleMenu`
- `TextEditorFixedMenu`
- `TextEditorFloatingMenu`
- `createEditorButton`
- TextEditor image extension
- TextEditor suggestion extension
- the old install plugin / global-properties surface

Justification and relocation map:

| Item | Why it must not be exported | Replacement or new location |
|---|---|---|
| `Input` | Legacy catch-all abstraction that overlaps focused inputs and makes the API harder to learn. | Use [TextInput](./packages/core/src/components/TextInput/), [Textarea](./packages/core/src/components/Textarea/), [Select](./packages/core/src/components/Select/), or [Autocomplete](./packages/core/src/components/Autocomplete/) |
| `List` | Duplicate alias for `ListView`; it adds a second name for the same surface. | Use [ListView](./packages/core/src/components/ListView/) |
| `ListHeader` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListHeaderItem` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListEmptyState` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListRows` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListRow` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListRowItem` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListGroups` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListGroupHeader` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListGroupRows` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListSelectBanner` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `ListFooter` | Internal list composition detail, not a stable top-level API. | Internal only: [ListView internals](./packages/core/src/components/ListView/internal/) |
| `Resource` | Legacy component wrapper around the old resources layer. | Replace with [typed data-fetching composables](./packages/core/src/data-fetching/) |
| `FeatherIcon` | Deprecated icon surface that conflicts with the Lucide/custom icon direction. | Use [core custom icons](./packages/core/src/icons/) and [Vite Lucide integration](./packages/vite/src/lucideIcons.ts) |
| `TabButtons` | Legacy control that overlaps the modern tabs component surface. | Use [Tabs](./packages/core/src/components/Tabs/) |
| `NestedPopover` | Implementation detail of list filtering, not a stable primitive. | Internal only: [ListFilter internals](./packages/core/src/components/ListFilter/internal/) or [Popover](./packages/core/src/components/Popover/) where a public primitive is needed |
| `createResource` | Legacy async API that duplicates the typed composable layer. | Use [useCall](./packages/core/src/data-fetching/useCall/), [useDoc](./packages/core/src/data-fetching/useDoc/), or [useList](./packages/core/src/data-fetching/useList/) |
| `createListResource` | Legacy async API that duplicates the typed composable layer. | Use [useList](./packages/core/src/data-fetching/useList/) |
| `createDocumentResource` | Legacy async API that duplicates the typed composable layer. | Use [useDoc](./packages/core/src/data-fetching/useDoc/) |
| `resourcesPlugin` | Plugin wrapper around the old resources architecture. | Use [typed data-fetching composables](./packages/core/src/data-fetching/) directly |
| `initSocket` | Frappe-specific WebSocket plumbing; it does not belong in the generic core UI package. | Moved to [`packages/ext/src/socket/`](./packages/ext/src/socket/) — import `initSocket` from `@yletlabs/frappe-ui-ext` |
| `pageMetaPlugin` | Old plugin-style API is unnecessary when a direct composable already exists. | Use [usePageMeta](./packages/core/src/utils/pageMeta.ts) |
| `CommandPaletteItem` | Internal composition detail of CommandPalette; it is not a standalone primitive. | Internal only: [CommandPalette internals](./packages/core/src/components/CommandPalette/) |
| `TextEditorBubbleMenu` | Implementation detail of TextEditor, not a standalone component. | Internal only: [TextEditor internals](./packages/core/src/components/TextEditor/) |
| `TextEditorFixedMenu` | Implementation detail of TextEditor, not a standalone component. | Internal only: [TextEditor internals](./packages/core/src/components/TextEditor/) |
| `TextEditorFloatingMenu` | Implementation detail of TextEditor, not a standalone component. | Internal only: [TextEditor internals](./packages/core/src/components/TextEditor/) |
| `createEditorButton` | Implementation detail of TextEditor toolbars, not a stable utility. | Internal only: [TextEditor internals](./packages/core/src/components/TextEditor/) |
| TextEditor image extension | Implementation detail of TextEditor rich-text extensions. | Internal only: [TextEditor extensions](./packages/core/src/components/TextEditor/extensions/) |
| TextEditor suggestion extension | Implementation detail of TextEditor rich-text extensions. | Internal only: [TextEditor extensions](./packages/core/src/components/TextEditor/extensions/) |
| old install plugin / global-properties surface | Implicit globals hide dependencies and preserve legacy ergonomics that this migration is intentionally removing. | Use direct named imports from the packages in the [consumer contract](#33-consumer-contract) |

#### `@yletlabs/frappe-ui-ext`

Must export:

- session helpers
- auth helpers
- high-level Frappe integration helpers
- Frappe-specific components that are not part of the generic UI layer

Must not export:

- low-level typed data-fetching composables
- generic presentational primitives
- Vite helper functions

Justification and relocation map:

| Item/group | Why it must not be exported | Replacement or new location |
|---|---|---|
| low-level typed data-fetching composables | They are part of the main UI/data layer and must stay in the primary package to avoid splitting one mental model across two packages. | [Core data-fetching composables](./packages/core/src/data-fetching/) |
| generic presentational primitives | The extension package must not become a second entry point for the same core component catalog. | [Core components](./packages/core/src/components/) |
| Vite helper functions | Build-time integration belongs in the Vite package, not in the Frappe runtime integration package. | [Vite package](./packages/vite/src/) |

#### `@yletlabs/frappe-ui-vite`

Must export:

- `frappeui`
- `frappeProxy`
- `buildConfig`
- `frappeTypes`
- `jinjaBootData`
- `lucideIcons`
- `siteBanner`

Must not export:

- runtime UI components
- Frappe session/auth helpers
- published source file paths

Justification and relocation map:

| Item/group | Why it must not be exported | Replacement or new location |
|---|---|---|
| runtime UI components | The Vite package is a build-tool surface, not a runtime component package. | [Core components](./packages/core/src/components/) |
| Frappe session/auth helpers | Runtime Frappe integrations belong in the extension package, not in build tooling. | [Extension package](./packages/ext/src/) |
| published source file paths | The Vite package must publish built outputs only to keep its package contract stable and bundler-safe. | Built files under `dist/` only |

---

## 7. Public API rules

### 7.1 Export rules

- Use **named exports only**.
- Do not ship a catch-all default plugin export as the primary API.
- Do not publish deep file-path imports as stable public contract.
- Export component types alongside components.
- Export composables from stable barrels.

### 7.2 Allowed export surfaces

For the core package:

- `.` -> named components, composables, utilities, types
- `./style.css` -> `dist/frappe-ui.css`

For the ext and vite packages:

- root entry only unless a subpath is truly stable and necessary

### 7.3 Package metadata rules

- Use `exports` maps only to built files.
- Keep CSS explicitly marked as side-effectful in package metadata.
- Keep runtime dependencies minimal and move build-only tools to `devDependencies`.

---

## 8. Vite implementation rules

Use Vite capabilities wherever they replace older build plumbing.

### 8.1 Required Vite usage

- `build.lib` for all **browser/UI** published packages (`packages/core` and `packages/ext`)
- `rollupOptions.external` for peer/runtime externals
- ES and CJS outputs
- source maps
- one CSS output from the core package
- Vite dev and preview for app/doc/example surfaces

> **Important — `packages/vite` is a Node.js package, not a browser package.**
> It contains Vite plugins that run in Node at build time. Do **not** use Vite lib mode to build `packages/vite`.
> Use `tsc --module NodeNext` (or `tsup` if dual CJS/ESM output is needed).
> The `npm create vite` template generates a browser app; replace it with a `tsconfig.json`-only Node package layout.

### 8.2 Core package build requirements

The core package build must:

- emit `dist/frappe-ui.es.js`,
- emit `dist/frappe-ui.cjs.js`,
- emit `dist/frappe-ui.css`,
- emit declarations via `tsc --emitDeclarationOnly` or project references,
- set `cssCodeSplit: false`,
- set the CSS output name to `frappe-ui.css`,
- externalize `vue`, `vue-router`, and any other peer dependencies,
- remain tree-shakable.

### 8.3 Important rule about types

Vite does not emit `.d.ts` files by itself. Use `tsc` for declarations. Do **not** add extra declaration tooling unless `tsc` proves insufficient.

### 8.4 App surfaces

Use separate Vite app surfaces for:

- VitePress docs,
- Storybook,
- the example/playground app.

Do not let those surfaces drive the published package layout.

---

## 9. Tailwind v4 and CSS-first token plan

### 9.1 Required end state

The final style system must:

- use Tailwind CSS v4,
- use Tailwind's Vite integration,
- use `@import "tailwindcss"`,
- define semantic tokens in CSS with `@theme`,
- remove dependency on `tailwind.config.js` as the primary token source,
- remove docs/runtime reliance on `resolveConfig`.

### 9.2 Token source of truth

The token source of truth must be CSS-first, under the core package, for example:

```text
packages/core/src/styles/
├─ tokens.css
├─ index.css
└─ editor.css
```

Rules:

- `tokens.css` defines the semantic tokens,
- `index.css` imports Tailwind and shared component styles,
- `editor.css` is an internal source file merged into the core stylesheet build, not a public artifact,
- docs and Storybook consume the exported package CSS,
- any docs token manifest must be generated from the CSS token source, not from Tailwind config.

### 9.3 Tailwind cleanup rules

Remove in the final state:

- `tailwind.config.js`
- the old `tailwind/` preset/plugin architecture
- `postcss.config.ts` if Tailwind was its only purpose
- `resolveConfig`-based token extraction
- old `theme()` lookups where CSS variables are the better fit

### 9.4 Mandatory class audit

Do a focused audit for Tailwind v4-sensitive classes and patterns:

- `outline-none` -> `outline-hidden`
- `ring` -> explicit `ring-3` where intended
- renamed radius/shadow/blur scales
- `space-*` patterns that should become `gap-*`
- preflight differences that affect buttons, outlines, and borders

### 9.5 Style distribution

Only the core package ships the public stylesheet.

Consumer instruction must be:

```ts
import '@yletlabs/frappe-ui/style.css'
```

The build artifact must physically be `dist/frappe-ui.css`.

---

## 10. Legacy removal plan

### 10.1 Delete outright

- `src/resources/**`
- `src/components/Resource.vue`
- legacy resources exports from the root index
- `FeatherIcon` export and component once replacement is complete
- old install-plugin/global-properties surface if it only preserves legacy ergonomics
- Cypress unless a concrete browser-only test gap is found

### 10.2 Replace before deleting

- Headless UI holdouts -> Reka UI or native Vue implementations
- Popper-based nested popovers -> Floating UI/native approach if possible
- wrapper-style inputs -> focused modern component APIs

### 10.3 Known dependency removals or reclassification

Implementation must explicitly revisit these:

- remove `@headlessui/vue` — currently used in 4 components: Autocomplete, CommandPalette (Listbox), ListFilter/NestedPopover, TabButtons
- remove `@popperjs/core` — **blocked on completing the Headless UI → Reka UI migration first**; do not attempt removal until all 4 Headless UI holdouts are migrated
- remove `radix-vue` — present in dependencies but superseded by `reka-ui`; confirm no remaining imports before deleting
- **keep `reka-ui`** — actively used in 11+ core components (Dialog, Popover, Tooltip, Toast, Switch, Slider, Select, Combobox, Dropdown, MultiSelect, Tabs) as the Headless UI replacement; this is a kept runtime dependency of `packages/core`
- remove `feather-icons`
- move build-time packages out of runtime `dependencies`
- move Vite/unplugin tooling out of runtime deps if only used for build/docs

At minimum, audit and reclassify packages like:

- `prettier`
- `typescript`
- `unplugin-auto-import`
- `unplugin-icons`
- `unplugin-vue-components`
- `ora` — move to `packages/vite` `devDependencies`; it is a CLI spinner used only in Vite plugin build scripts, not at runtime
- `lucide-static` — move to `packages/vite` `dependencies`; it is consumed by the `lucideIcons` Vite plugin at build time, not by the UI runtime

These do not belong in runtime dependencies if they are only used in build/docs/dev flows.

### 10.4 FeatherIcon migration inventory

FeatherIcon is used in **27 files** across the codebase. Each usage must be replaced with a Lucide icon (via the Vite `lucideIcons` auto-import) or a custom icon from `packages/core/src/icons/` before FeatherIcon can be deleted.

**Files in `src/components/` (18):**

| File | Notes |
|---|---|
| `Alert.vue` | Replace with Lucide equivalent |
| `Autocomplete.vue` | Replace with Lucide equivalent |
| `Button.vue` | Replace with Lucide equivalent |
| `Calendar/EventModalContent.vue` | Replace with Lucide equivalent |
| `CircularProgressBar.vue` | Replace with Lucide equivalent |
| `CommandPalette.vue` | Replace with Lucide equivalent |
| `DatePicker.vue` | Replace with Lucide equivalent |
| `DateRangePicker.vue` | Replace with Lucide equivalent |
| `DateTimePicker.vue` | Replace with Lucide equivalent |
| `Dialog.vue` | Replace with Lucide equivalent |
| `Dropdown.vue` | Replace with Lucide equivalent |
| `Input.vue` | File is deleted in the migration; no replacement needed |
| `ListFilter.vue` | Replace with Lucide equivalent |
| `Rating.vue` | Replace with Lucide equivalent |
| `Switch.vue` | Replace with Lucide equivalent |
| `TabButtons.vue` | Component is deleted in the migration; no replacement needed |
| `TimePicker.vue` | Replace with Lucide equivalent |
| `Tree.vue` | Replace with Lucide equivalent |

**Files in `frappe/` (9):**

| File | Notes |
|---|---|
| `Billing/SignupBanner.vue` | Replace when moving to `packages/ext` |
| `Billing/TrialBanner.vue` | Replace when moving to `packages/ext` |
| `DataImport/DataImportList.vue` | Replace when moving to `packages/ext` |
| `DataImport/ImportSteps.vue` | Replace when moving to `packages/ext` |
| `DataImport/PreviewStep.vue` | Replace when moving to `packages/ext` |
| `DataImport/UploadStep.vue` | Replace when moving to `packages/ext` |
| `HelpCenter/HelpCenter.vue` | Replace when moving to `packages/ext` |
| `Help/HelpModal.vue` | Replace when moving to `packages/ext` |
| `Onboarding/GettingStartedBanner.vue` | Replace when moving to `packages/ext` |

This migration must be completed during Workstream 5 for `src/components/` files and during Workstream 2 for `frappe/` files (as part of the ext package dependency boundary refactoring).

---

## 11. Documentation surfaces

### 11.1 VitePress

VitePress remains the **canonical documentation surface** for:

- installation,
- migration guides,
- component docs,
- composable docs,
- package usage guides.

Keep the existing metadata-generation idea, but move it into a docs-only pipeline under `docs/scripts`. Its job is to generate component reference metadata (for example into `docs/meta`) for VitePress and any Storybook doc integration. It must not be part of the runtime packages.

### 11.2 Storybook

Storybook is the **primary interactive sandbox**, not the canonical written docs.

Use it for:

- interaction testing,
- visual sanity checks,
- component state exploration,
- accessibility addon checks.

Use `@storybook/vue3-vite`.

### 11.3 Important docs rule

Docs must consume the workspace packages or built outputs, **not** alias the old root `src` tree directly. Replace patterns like aliasing `'frappe-ui'` to `../../src`.

### 11.4 Required docs updates

At minimum, implementation must update:

- installation instructions
- package import examples
- style import instructions
- moved capability references
- Vite plugin examples
- Frappe integration examples
- migration examples for old -> new import paths

Every moved capability mentioned in docs must show its new package and import path explicitly.

---

## 12. Testing, linting, and quality gates

### 12.1 Required tools

- **Vitest** for unit, composable, and component tests
- **ESLint** (flat config preferred)
- **Prettier**
- **stylelint**
- **axe** checks (`vitest-axe` and/or Storybook a11y addon)

### 12.2 Cypress policy and test migration strategy

Remove Cypress unless a concrete browser-only gap is discovered that Vitest + Storybook + example-app testing cannot cover.

A valid Cypress exception must meet **all** of these conditions:

1. the behavior cannot be covered with Vitest + jsdom,
2. the behavior cannot be covered well enough in Storybook interaction/a11y tests,
3. the behavior matters to shipped package behavior,
4. the retained Cypress coverage is documented in the repo with a short justification.

#### Test coverage migration plan

The codebase currently has **32 Cypress component tests** and only **4 Vitest tests**. Removing Cypress without migrating this coverage would result in significant regression risk.

Required migration steps:

1. **Inventory all 32 Cypress component tests** and classify each as:
   - **Critical** — must be rewritten as a Vitest component test (using `@vue/test-utils` + jsdom or happy-dom),
   - **Visual/interaction** — migrate to Storybook interaction tests (using `@storybook/test` play functions),
   - **Drop** — the test covers deleted/legacy components (e.g., `TabButtons`, `Input`) and does not need migration.

2. **Write Vitest replacements for all critical tests** before deleting the Cypress tests.

3. **Write Storybook interaction tests** for visual/interaction tests that cannot be meaningfully covered in jsdom.

4. **Delete Cypress** only after the coverage migration is complete and verified.

This work is part of Workstream 7 and must be completed before the final validation checklist can pass.

### 12.3 Test infrastructure and mocks

Each published package that has tests must own its mock/test-infra files:

- `packages/core/src/__mocks__/` — MSW handlers for core data-fetching composable tests
- `packages/ext/src/__mocks__/` — MSW handlers for ext-specific integration tests (if needed)

Shared test utilities that cross package boundaries (e.g., `waitUntilValueChanges`, `baseUrl` helpers) live at the workspace root under a `test-utils/` directory and are consumed as a workspace dependency.

The current `src/mocks/` directory should be moved to `packages/core/src/__mocks__/` during Workstream 2.

### 12.4 Example app

Create `examples/playground` as a Vite app that:

- depends on workspace packages in local dev,
- validates named imports,
- validates CSS import,
- exercises the main component/composable flows,
- is used in CI to ensure the public package contract works.

### 12.5 Published-artifact validation

CI must also validate the packed artifact:

1. build the packages,
2. run `pnpm pack` for the published packages,
3. install the packed tarballs in a temporary consumer or the example app,
4. build and test that consumer flow.

This is mandatory because local workspace linking is not the same as published-package consumption.

---

## 13. GitHub Actions and release plan

### 13.1 Required workflows

Add these workflows:

1. `lint`
2. `typecheck`
3. `test`
4. `build`
5. `docs-build`
6. `storybook-build`
7. `bundle-analyze`
8. `pack-validate`
9. `publish`

### 13.2 Publish strategy

Use **Changesets** for multi-package versioning and release preparation.

Justification:

- multiple published workspace packages,
- clear semver tracking,
- good fit for tag-driven GitHub Actions publishing,
- clean changelog generation.

Use **fixed/locked versioning** across `@yletlabs/frappe-ui`, `@yletlabs/frappe-ui-ext`, and `@yletlabs/frappe-ui-vite`.

### 13.3 Publish rules

- publish only on protected semver tags or release workflow triggers,
- publish from built workspace packages only,
- never publish from the private root package,
- require successful pack validation before publish.

### 13.4 Git worktree workflow

Use `git worktree` for the migration. Do not perform the migration directly in the main checkout.

Required workflow:

```bash
git fetch origin
git status --short
# status must be clean before continuing

git worktree add ../frappe-ui-migration -b migration/workspace-modernisation origin/main
cd ../frappe-ui-migration
git status --short
# this worktree must also start clean
```

Rules:

- all migration changes happen in the worktree branch,
- the main checkout remains untouched until the migration branch is ready for review,
- merge or review from the migration branch only,
- remove the worktree after merge or after abandoning the branch.

Cleanup commands after merge:

```bash
cd ..
git worktree remove ../frappe-ui-migration
git branch -d migration/workspace-modernisation
```

---

## 14. Implementation workstreams

Implement in this order.

### Bootstrap scaffolding commands

Use npm-based scaffolding commands to create the new workspaces and app surfaces, then switch to pnpm for ongoing workspace management.

Run these from the migration worktree:

```bash
mkdir -p packages examples

npm create vite@latest packages/core -- --template vue-ts
npm create vite@latest packages/ext -- --template vue-ts
npm create vite@latest packages/vite -- --template vanilla-ts
npm create vite@latest examples/playground -- --template vue-ts
# docs/ already exists — do NOT scaffold fresh with npm create vitepress
# Instead, update docs/.vitepress/config.ts and docs/package.json in-place
# to consume workspace packages instead of aliasing the old root src tree
npm create storybook@latest
```

Then normalize the generated structure:

- configure Storybook for **Vue 3 + Vite only**,
- move the Storybook config to the repository root,
- replace generated package metadata with the workspace package names from this document,
- remove template demo files immediately after scaffolding,
- convert the repo to pnpm workspaces before installing final dependencies.

After scaffolding, use pnpm for package management:

```bash
pnpm install
pnpm -r build
```

### Workstream 1 — Convert the repo to pnpm workspaces

Tasks:

- make the root `package.json` private,
- add `pnpm-workspace.yaml`,
- move root publish metadata out of the root package,
- add shared root scripts for workspace orchestration,
- pin Node 22 by adding `.nvmrc` containing `22` to the repo root,
- pin pnpm by adding `"packageManager": "pnpm@9.x.x"` (use the exact installed version) to the root `package.json`,
- add `"engines": { "node": ">=22", "pnpm": ">=9" }` to the root `package.json`.

Deliverables:

- private root workspace,
- pnpm workspace install,
- root scripts that orchestrate build/test/lint/docs.

### Workstream 2 — Extract packages

Tasks:

- create `packages/core`,
- create `packages/ext`,
- create `packages/vite`,
- move files according to the move map,
- update imports and barrels,
- add package-specific `package.json`, `vite.config.ts`, and tsconfig files,
- **refactor `frappe/` modules** to satisfy the dependency boundary prerequisite documented in [section 6.2](#62-yletlabsfrappe-ui-ext-packagesext): replace all `../../src/...` internal imports with public API imports from `@yletlabs/frappe-ui`, replace legacy `createResource` / `createListResource` / `createDocumentResource` usage with typed composables, and replace `FeatherIcon` usage with Lucide/custom icon alternatives,
- **internal repo-wide import rewrite** — update all internal imports across docs, stories, and tooling:
  - replace VitePress aliases like `frappe-ui` → `../../src` with workspace package imports,
  - update docs scripts and transformers that hardcode `src/components/.../stories/...` paths,
  - update story files to import from workspace packages instead of relative source paths,
  - ensure no remaining imports reference the old root `src/` tree directly,
- move `src/mocks/` to `packages/core/src/__mocks__/` and set up per-package test infrastructure.

Deliverables:

- all package code moved under `packages/*`,
- no published surface left at the root,
- all internal imports use workspace package names, not source-tree relative paths.

### Workstream 3 — Rebuild the core package contract

Tasks:

- write `packages/core/src/index.ts`,
- export named components and composables,
- keep typed data-fetching composables in core,
- delete legacy resources exports,
- remove default plugin-style public API unless absolutely necessary,
- **Vue 3.5 modernization** — adopt these APIs across all components:
  - replace `defineProps` + `defineEmits` two-way binding with `defineModel` in all form input components (`TextInput`, `Textarea`, `Switch`, `Checkbox`, `Select`, `Combobox`, `Rating`, `Slider`, `DatePicker`, `TimePicker`, `DateRangePicker`, `DateTimePicker`, `MonthPicker`, `Password`, `MultiSelect`, `Autocomplete`),
  - replace `ref()` template ref + `defineExpose` access patterns with `useTemplateRef` where applicable,
  - adopt reactive props destructure (`const { label, disabled } = defineProps<…>()`) where props are consumed in `<script setup>` logic.

Deliverables:

- clean root export surface for `@yletlabs/frappe-ui`,
- no `src/resources` dependency,
- no `Resource.vue` or `FeatherIcon` public export.

### Workstream 4 — Tailwind v4 and style system rewrite

Tasks:

- create CSS-first token files under `packages/core/src/styles`,
- switch to Tailwind's Vite integration,
- remove old tailwind preset/config plumbing,
- produce one CSS build output,
- audit v4-sensitive classes.

Deliverables:

- Tailwind v4 build,
- `dist/frappe-ui.css`,
- no final dependence on the old Tailwind config model.

### Workstream 5 — Remove legacy component and dependency layers

Tasks:

- replace Headless UI holdouts (4 remaining components: Autocomplete, CommandPalette, ListFilter/NestedPopover, TabButtons) with Reka UI or native Vue implementations,
- **migrate all FeatherIcon usage** in `src/components/` (18 files) to Lucide or custom icons — see [section 10.4](#104-feathericon-migration-inventory) for the complete inventory,
- remove `@popperjs/core` — **only after** all Headless UI holdouts are migrated (ordering dependency),
- remove `radix-vue` after confirming no remaining imports,
- remove `feather-icons` after all FeatherIcon usage is migrated,
- delete unused/duplicate dependencies,
- move build-only packages to `devDependencies`,
- **upgrade Vue devDependency** from `^3.3.0` to `^3.5.0` to match the `peerDependencies` baseline.

Ordering constraints:

1. Headless UI → Reka UI migration must complete before `@popperjs/core` removal,
2. FeatherIcon → Lucide migration must complete before `feather-icons` removal,
3. Vue devDependency upgrade should happen early in this workstream to unblock Vue 3.5 API adoption.

Deliverables:

- smaller dependency graph,
- cleaner component layer,
- no parallel legacy/modern component stack.

### Workstream 6 — Docs and sandbox rebuild

Tasks:

- update VitePress to consume workspace packages,
- add Storybook with the Vite builder,
- keep metadata generation,
- remove docs reliance on root source aliasing,
- update all docs for the new package structure and import paths,
- add a migration guide that maps old imports and old capabilities to their new package locations.

Deliverables:

- canonical VitePress docs,
- Storybook sandbox,
- docs that match the published package contract.

### Workstream 7 — Quality gates and release automation

Tasks:

- add ESLint, Prettier, stylelint, axe checks,
- **migrate Cypress test coverage** according to the [test migration strategy in section 12.2](#122-cypress-policy-and-test-migration-strategy):
  - inventory all 32 Cypress component tests,
  - classify each as critical (→ Vitest), visual/interaction (→ Storybook), or drop (covers deleted components),
  - write Vitest replacements for critical tests,
  - write Storybook interaction tests for visual/interaction tests,
  - remove Cypress only after coverage migration is verified,
- add GitHub Actions workflows,
- add Changesets,
- add pack validation.

Deliverables:

- stable CI,
- publishable packages,
- validated consumer installation flow.

---

## 15. Exact files to change first

Start here. This order reduces churn.

1. root `package.json`
2. `pnpm-workspace.yaml`
3. root `tsconfig.base.json`
4. `packages/core/package.json`
5. `packages/ext/package.json`
6. `packages/vite/package.json`
7. `packages/core/vite.config.ts`
8. `packages/core/src/index.ts`
9. `packages/core/src/styles/index.css`
10. `packages/core/src/styles/tokens.css`
11. `packages/ext/src/index.ts`
12. `packages/vite/src/index.ts`
13. `docs/.vitepress/config.ts`
14. Storybook config
15. `examples/playground/*`
16. root `README.md`
17. package READMEs and migration docs under `docs/`

After that:

- move components/composables/utilities,
- delete legacy files,
- wire tests and CI.

---

## 16. Validation checklist

The migration is not complete until all of these are true:

- `pnpm install` works from a clean clone
- all packages build
- core emits ES, CJS, CSS, and types
- no package publishes raw source files
- VitePress builds
- Storybook builds
- example app runs and builds
- pack validation passes
- legacy resources layer is gone
- Headless UI is gone
- `radix-vue` is gone (superseded by `reka-ui`)
- `reka-ui` is an explicit runtime dependency of the core package
- FeatherIcon is gone (all 27 usages migrated to Lucide/custom icons)
- `@popperjs/core` is gone
- Tailwind v3 config-first architecture is gone
- Cypress test coverage has been migrated (critical → Vitest, visual → Storybook)
- Cypress is gone unless explicitly justified by a retained browser-only workflow
- Vue devDependency is `^3.5.0` or higher
- all internal imports use workspace package names (no `../../src/` cross-boundary imports)
- all `frappe/` modules have been moved to `packages/ext` per the module disposition table
- MSW mocks are placed per-package under `__mocks__/` directories

### 16.1 Post-migration stabilization and cleanup

After the structural migration is complete:

1. run the full validation matrix again,
2. fix regressions before any release preparation,
3. remove stale files, generated artifacts, unused configs, and dead aliases,
4. delete old Tailwind, Cypress, and legacy-resource-era files that no longer serve the new architecture,
5. verify docs, Storybook, and the example app all use the new package imports,
6. ensure no unnecessary files remain in the repo root or in package sources.

Cleanup targets include:

- obsolete root-level build config that only existed for the old package layout,
- stale generated auto-import/component declaration files if they are no longer part of the new toolchain,
- unused Tailwind preset/plugin files,
- unused Cypress files/config,
- any compatibility wrappers that survived past the migration by accident.

---

## 17. Definition of done

The migration is done only when:

1. the repo is a private pnpm workspace root,
2. `@yletlabs/frappe-ui`, `@yletlabs/frappe-ui-ext`, and `@yletlabs/frappe-ui-vite` are dist-based packages,
3. the core package ships `dist/frappe-ui.css` and exports it as `./style.css`,
4. the typed data-fetching composables remain available from the core package,
5. the legacy resource/plugin surface is removed,
6. docs and Storybook use the new package structure and import paths,
7. CI validates lint, typecheck, test, build, docs, storybook, bundle analysis, pack validation, and publish,
8. the result is simpler to maintain than the current repository.

---

## 18. Final execution rule

If a developer or AI agent has to choose between:

- preserving old behavior, or
- achieving the target architecture in this file,

choose the **target architecture** unless doing so would break one of the locked decisions above.

This migration is intentionally a cleanup, not a compatibility exercise.
