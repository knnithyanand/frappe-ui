<template>
  <Autocomplete
    placeholder="Select an option"
    :options="options"
    :value="selection"
    @update:query="(q) => onUpdateQuery(q)"
    @change="(v) => (selection = v)"
  />
</template>

<script setup>
import Autocomplete from '../Autocomplete/Autocomplete.vue'
import { computed, ref, watch } from 'vue'
import { frappeRequest } from '../../utils/frappeRequest'

const props = defineProps({
  value: {
    type: String,
    required: false,
    default: '',
  },
  doctype: {
    type: String,
    required: true,
  },
  searchField: {
    type: String,
    required: false,
    default: 'name',
  },
  labelField: {
    type: String,
    required: false,
    default: 'name',
  },
  valueField: {
    type: String,
    required: false,
    default: 'name',
  },
  pageLength: {
    type: Number,
    required: false,
    default: 10,
  },
})

const records = ref([])

const options = computed(
  () =>
    records.value?.map((result) => ({
      label: result[props.labelField],
      value: result[props.valueField],
    })) || [],
)
const selection = ref(null)

watch(
  () => [props.value, options.value],
  () => {
    selection.value = props.value
      ? options.value.find((o) => o.value === props.value) || null
      : null
  },
  { immediate: true },
)

watch(
  () => props.doctype,
  () => {
    fetchOptions('')
  },
  { immediate: true },
)

async function fetchOptions(query) {
  let filters = query
    ? {
        [props.searchField]: ['like', `%${query}%`],
      }
    : undefined

  let data = await frappeRequest({
    url: 'frappe.client.get_list',
    method: 'GET',
    params: {
      doctype: props.doctype,
      fields: [props.labelField, props.searchField, props.valueField],
      filters,
      limit_page_length: props.pageLength,
      limit: props.pageLength,
    },
  })
  records.value = Array.isArray(data) ? data : []
}

function onUpdateQuery(query) {
  fetchOptions(query)
}
</script>
