<template>
  <Popover
    class="w-full"
    v-model:show="showOptions"
    ref="rootRef"
    :placement="placement"
    :match-target-width="true"
  >
    <template #target="{ open: openPopover, togglePopover, close: closePopover, isOpen }">
      <slot
        name="target"
        v-bind="{
          open: openPopover,
          close: closePopover,
          togglePopover,
          isOpen,
        }"
      >
        <div class="w-full space-y-1.5">
          <label v-if="props.label" class="block text-xs text-ink-gray-5">
            {{ props.label }}
          </label>
          <button
            class="flex h-7 w-full items-center justify-between gap-2 rounded bg-surface-gray-2 px-2 py-1 transition-colors hover:bg-surface-gray-3 border border-transparent focus:border-outline-gray-4 focus:outline-hidden focus:ring-2 focus:ring-outline-gray-3"
            :class="{ 'bg-surface-gray-3': isOpen }"
            @click="togglePopover"
          >
            <div class="flex items-center overflow-hidden">
              <slot name="prefix" />
              <span
                class="truncate text-base leading-5 text-ink-gray-8"
                v-if="displayValue"
              >
                {{ displayValue }}
              </span>
              <span class="text-base leading-5 text-ink-gray-4" v-else>
                {{ placeholder || '' }}
              </span>
              <slot name="suffix" />
            </div>
            <FrappeIcon
              name="chevron-down"
              class="h-4 w-4 text-ink-gray-5"
              aria-hidden="true"
            />
          </button>
        </div>
      </slot>
    </template>

    <template #body="{ isOpen, close }">
      <div v-show="isOpen">
        <div
          class="relative mt-1 rounded-lg bg-surface-modal text-base shadow-2xl"
          :class="bodyClasses"
        >
          <div
            v-if="!hideSearch"
            class="sticky top-0 z-10 flex items-stretch space-x-1.5 bg-surface-modal py-1.5"
          >
            <div class="relative w-full">
              <input
                ref="searchInput"
                class="form-input w-full focus:bg-surface-gray-3 hover:bg-surface-gray-4 text-ink-gray-8"
                type="text"
                v-model="query"
                autocomplete="off"
                placeholder="Search"
                @keydown.down.prevent="moveHighlight(1)"
                @keydown.up.prevent="moveHighlight(-1)"
                @keydown.enter.prevent="selectHighlighted(close)"
              />
              <div
                class="absolute right-0 inline-flex h-7 w-7 items-center justify-center"
              >
                <LoadingIndicator
                  v-if="props.loading"
                  class="h-4 w-4 text-ink-gray-5"
                />
                <button v-else @click="clearAll" type="button">
                  <FrappeIcon name="x" class="w-4 text-ink-gray-8" />
                </button>
              </div>
            </div>
          </div>

          <ul
            class="max-h-[15rem] overflow-y-auto px-1.5 pb-1.5"
            :class="{ 'pt-1.5': hideSearch }"
          >
            <template
              v-for="group in groupedVisibleOptions"
              :key="group.key"
            >
              <div
                v-if="group.group && !group.hideLabel"
                class="sticky top-10 truncate bg-surface-modal px-2.5 py-1.5 text-sm font-medium text-ink-gray-5"
              >
                {{ group.group }}
              </div>

              <li
                v-for="(option, idx) in group.items"
                :key="idx"
                :class="[
                  'flex cursor-pointer items-center justify-between rounded px-2.5 py-1.5 text-base',
                  {
                    'bg-surface-gray-3': isHighlighted(option),
                    'opacity-50 pointer-events-none': option.disabled,
                  },
                ]"
                @mouseenter="highlightOption(option)"
                @click="selectOption(option, close)"
              >
                <div class="flex flex-1 gap-2 overflow-hidden items-center">
                  <div
                    v-if="$slots['item-prefix'] || props.multiple"
                    class="flex flex-shrink-0"
                  >
                    <slot
                      name="item-prefix"
                      v-bind="{ active: isHighlighted(option), selected: isOptionSelected(option), option }"
                    >
                      <FrappeIcon
                        name="check"
                        v-if="isOptionSelected(option)"
                        class="h-4 w-4 text-ink-gray-7"
                      />
                      <div v-else class="h-4 w-4" />
                    </slot>
                  </div>
                  <span class="flex-1 truncate text-ink-gray-7">
                    {{ getLabel(option) }}
                  </span>
                </div>

                <div
                  v-if="$slots['item-suffix'] || option?.description"
                  class="ml-2 flex-shrink-0"
                >
                  <slot
                    name="item-suffix"
                    v-bind="{ active: isHighlighted(option), selected: isOptionSelected(option), option }"
                  >
                    <div
                      v-if="option?.description"
                      class="text-sm text-ink-gray-5"
                    >
                      {{ option.description }}
                    </div>
                  </slot>
                </div>
              </li>
            </template>

            <li
              v-if="visibleOptions.length === 0"
              class="rounded-md px-2.5 py-1.5 text-base text-ink-gray-5"
            >
              No results found
            </li>
          </ul>

          <div
            v-if="$slots.footer || props.showFooter || props.multiple"
            class="border-t p-1"
          >
            <slot name="footer" v-bind="{ togglePopover: close }">
              <div v-if="props.multiple" class="flex items-center justify-end">
                <Button
                  v-if="!areAllOptionsSelected"
                  label="Select All"
                  @click.stop="selectAll"
                />
                <Button
                  v-if="areAllOptionsSelected"
                  label="Clear All"
                  @click.stop="clearAll"
                />
              </div>
              <div v-else class="flex items-center justify-end">
                <Button label="Clear" @click.stop="clearAll" />
              </div>
            </slot>
          </div>
        </div>
      </div>
    </template>
  </Popover>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { Popover } from '../Popover'
import { Button } from '../Button'
import FrappeIcon from '../FrappeIcon.vue'
import LoadingIndicator from '../LoadingIndicator.vue'
import type {
  AutocompleteOptionGroup,
  AutocompleteOption,
  AutocompleteProps,
  Option,
} from './types'

const props = withDefaults(defineProps<Omit<AutocompleteProps, 'modelValue'>>(), {
  multiple: false,
  maxOptions: 50,
  hideSearch: false,
  compareFn: (a, b) => a.value === b.value,
})
const model = defineModel<AutocompleteProps['modelValue']>()
const emit = defineEmits(['update:query', 'change'])

const searchInput = useTemplateRef<HTMLInputElement>('searchInput')
const showOptions = ref(false)
const query = ref('')
const highlightedIndex = ref(0)

const toOption = (option: AutocompleteOption) =>
  isOption(option) ? option : { label: String(option), value: option }

const isSameOption = (a: AutocompleteOption, b: AutocompleteOption) => {
  return props.compareFn(toOption(a), toOption(b))
}

const sanitizeOptions = (options: AutocompleteOption[]) => {
  if (!options) return []
  return options.map((option) =>
    isOption(option) ? option : { label: option.toString(), value: option },
  )
}

const filterOptions = (options: Option[]) => {
  if (!query.value) return options
  const normalizedQuery = query.value.trim().toLowerCase()
  return options.filter((option) => {
    return (
      option.label.toLowerCase().includes(normalizedQuery) ||
      option.value.toString().toLowerCase().includes(normalizedQuery)
    )
  })
}

const groups = computed(() => {
  if (!props.options?.length) return []

  let normalizedGroups: AutocompleteOptionGroup[]
  if (isOptionGroup(props.options[0])) {
    normalizedGroups = props.options as AutocompleteOptionGroup[]
  } else {
    normalizedGroups = [
      {
        group: '',
        items: sanitizeOptions(props.options as AutocompleteOption[]),
        hideLabel: false,
      },
    ]
  }

  return normalizedGroups
    .map((group, index) => ({
      key: index,
      group: group.group,
      hideLabel: group.hideLabel,
      items: filterOptions(sanitizeOptions(group.items || [])),
    }))
    .filter((group) => group.items.length > 0)
})

const groupedVisibleOptions = computed(() =>
  groups.value.map((group) => ({
    ...group,
    items: group.items.slice(0, props.maxOptions),
  })),
)

const visibleOptions = computed(() =>
  groupedVisibleOptions.value.flatMap((group) => group.items),
)

const allOptions = computed(() => groups.value.flatMap((group) => group.items))

const findOption = (option: AutocompleteOption) => {
  if (!option) return option
  return allOptions.value.find((o) => isSameOption(o, option))
}

const makeOption = (option: AutocompleteOption) =>
  isOption(option) ? option : { label: option, value: option }

const getLabel = (option: AutocompleteOption) => {
  if (isOption(option)) return option?.label || option?.value
  return option
}

const selectedValue = computed({
  get() {
    if (!props.multiple) {
      return (
        findOption(model.value as AutocompleteOption) ||
        makeOption(model.value as AutocompleteOption)
      )
    }

    const values = (model.value || []) as AutocompleteOption[]
    return isOption(values[0])
      ? values
      : values.map((value) => findOption(value) || makeOption(value))
  },
  set(value) {
    query.value = ''
    if (value && !props.multiple) showOptions.value = false
    model.value = value
    emit('change', value)
  },
})

const displayValue = computed(() => {
  if (!selectedValue.value) return ''
  if (!props.multiple) {
    return getLabel(selectedValue.value as AutocompleteOption)
  }
  return (selectedValue.value as AutocompleteOption[])
    .map((value) => getLabel(value))
    .join(', ')
})

const isOptionSelected = (option: AutocompleteOption) => {
  if (!selectedValue.value) return false
  if (!props.multiple) {
    return isSameOption(selectedValue.value as AutocompleteOption, option)
  }
  return (selectedValue.value as AutocompleteOption[]).some((value) =>
    isSameOption(value, option),
  )
}

const areAllOptionsSelected = computed(() => {
  if (!props.multiple) return false
  return (
    allOptions.value.length ===
    (selectedValue.value as AutocompleteOption[])?.length
  )
})

const selectAll = () => {
  selectedValue.value = allOptions.value
}

const clearAll = () => {
  selectedValue.value = props.multiple ? [] : undefined
}

const isOption = (option: AutocompleteOption): option is Option => {
  return typeof option === 'object' && option !== null && 'value' in option
}

const isOptionGroup = (option: any) => {
  return typeof option === 'object' && 'items' in option && 'group' in option
}

const highlightOption = (option: Option) => {
  const index = visibleOptions.value.findIndex((opt) => isSameOption(opt, option))
  if (index >= 0) highlightedIndex.value = index
}

const highlightedOption = computed(
  () => visibleOptions.value[highlightedIndex.value] || null,
)

const isHighlighted = (option: Option) => {
  if (!highlightedOption.value) return false
  return isSameOption(highlightedOption.value, option)
}

const moveHighlight = (direction: number) => {
  if (!visibleOptions.value.length) return
  const total = visibleOptions.value.length
  highlightedIndex.value = (highlightedIndex.value + direction + total) % total
}

const selectOption = (option: Option, close: () => void) => {
  if (option.disabled) return

  if (!props.multiple) {
    selectedValue.value = option
    close()
    return
  }

  const selected = (selectedValue.value || []) as AutocompleteOption[]
  const exists = selected.some((value) => isSameOption(value, option))
  selectedValue.value = exists
    ? selected.filter((value) => !isSameOption(value, option))
    : [...selected, option]
}

const selectHighlighted = (close: () => void) => {
  if (!highlightedOption.value) return
  selectOption(highlightedOption.value, close)
}

watch(
  () => query.value,
  () => emit('update:query', query.value),
)

watch(
  () => showOptions.value,
  async () => {
    if (showOptions.value) {
      highlightedIndex.value = 0
      await nextTick()
      searchInput.value?.focus()
    }
  },
)

watch(
  () => visibleOptions.value.length,
  () => {
    highlightedIndex.value = 0
  },
)

const rootRef = useTemplateRef('rootRef')

const togglePopover = () => {
  showOptions.value = !showOptions.value
}

defineExpose({
  rootRef,
  togglePopover,
})
</script>
