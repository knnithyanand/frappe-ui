<template>
  <Dialog
    v-model="show"
    :options="{ size: 'xl', position: 'top' }"
    @after-leave="searchQuery = ''"
  >
    <template #body>
      <div>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4.5">
            <FrappeIcon name="search" class="h-4 w-4" />
          </div>
          <input
            ref="searchInput"
            v-model="searchQuery"
            placeholder="Search"
            class="w-full border-none bg-transparent py-3 pl-11.5 pr-4.5 text-base text-ink-gray-8 placeholder-ink-gray-4 focus:ring-0 outline-hidden"
            autocomplete="off"
            @keydown.down.prevent="moveHighlight(1)"
            @keydown.up.prevent="moveHighlight(-1)"
            @keydown.enter.prevent="selectHighlighted"
          />
        </div>

        <div class="max-h-96 overflow-auto border-t border-gray-100">
          <div
            class="mb-2 mt-4.5 first:mt-3"
            v-for="group in filteredGroups"
            :key="group.title"
          >
            <div
              class="mb-2.5 px-4.5 text-base text-ink-gray-5"
              v-if="!group.hideTitle"
            >
              {{ group.title }}
            </div>
            <div class="px-2.5">
              <button
                v-for="item in group.items"
                :key="item.name"
                type="button"
                class="w-full text-left rounded outline-hidden"
                @click="select(item)"
                @mousemove="highlightItem(item)"
              >
                <component
                  :is="group.component"
                  :item="item"
                  :active="highlightedItem?.name === item.name"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import FrappeIcon from '../FrappeIcon.vue'
import Dialog from '../Dialog/Dialog.vue'

const emit = defineEmits(['update:show', 'update:searchQuery', 'select'])
const props = defineProps({
  show: { type: Boolean, default: false },
  searchQuery: { type: String, default: '' },
  groups: { type: Array, default: () => [] },
})

const searchInput = ref(null)

const show = computed({
  get: () => props.show,
  set: (value) => emit('update:show', value),
})

const searchQuery = computed({
  get: () => props.searchQuery,
  set: (value) => emit('update:searchQuery', value),
})

const filteredGroups = computed(() => {
  const query = (searchQuery.value || '').trim().toLowerCase()
  if (!query) return props.groups

  return props.groups
    .map((group) => {
      const items = (group.items || []).filter((item) => {
        const title = String(item.title || '').toLowerCase()
        const description = String(item.description || '').toLowerCase()
        return title.includes(query) || description.includes(query)
      })
      return { ...group, items }
    })
    .filter((group) => group.items.length > 0)
})

const flatItems = computed(() => {
  return filteredGroups.value.flatMap((group) =>
    (group.items || []).map((item) => ({ item, group })),
  )
})

const highlightedIndex = ref(0)
const highlightedItem = computed(() => flatItems.value[highlightedIndex.value]?.item)

const select = (item) => {
  emit('select', item)
  show.value = false
}

const moveHighlight = (direction) => {
  if (!flatItems.value.length) return
  const total = flatItems.value.length
  highlightedIndex.value = (highlightedIndex.value + direction + total) % total
}

const selectHighlighted = () => {
  if (!highlightedItem.value) return
  select(highlightedItem.value)
}

const highlightItem = (item) => {
  const index = flatItems.value.findIndex((entry) => entry.item === item)
  if (index >= 0) highlightedIndex.value = index
}

watch(
  () => [show.value, searchQuery.value, filteredGroups.value.length],
  async ([isOpen]) => {
    highlightedIndex.value = 0
    if (isOpen) {
      await nextTick()
      searchInput.value?.focus()
    }
  },
)

const keydownWatcher = (e) => {
  if (e.key === 'Escape' && show.value) {
    show.value = false
    e.preventDefault()
  }

  if (
    e.key === 'k' &&
    (e.ctrlKey || e.metaKey) &&
    !e.target.classList.contains('ProseMirror')
  ) {
    show.value = true
    e.preventDefault()
  }
}

onMounted(() => window.addEventListener('keydown', keydownWatcher))
onBeforeUnmount(() => window.removeEventListener('keydown', keydownWatcher))
</script>
