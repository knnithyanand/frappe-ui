import { reactive } from 'vue'
import debounce from '@yletlabs/frappe-ui/utils/debounce'
import { frappeRequest } from '@yletlabs/frappe-ui/utils/frappeRequest'
import { getConfig } from '@yletlabs/frappe-ui/utils/config'

let cachedResources = {}
let listCache = reactive({})
let resourcesByDocType = {}

export function createResource(options, vm) {
  if (typeof options === 'string') {
    options = {
      url: options,
      auto: true,
    }
  }

  let cacheKey = null
  if (options.cache) {
    cacheKey = getCacheKey(options.cache)
    let cached = cachedResources[cacheKey]
    if (cached) {
      if (cached.auto) {
        cached.reload()
      }
      return cached
    }
  }

  let fetchFunction = options.debounce ? debounce(fetch, options.debounce) : fetch

  let out = reactive({
    method: options.method,
    url: options.url,
    data: options.initialData || null,
    previousData: null,
    loading: false,
    fetched: false,
    error: null,
    promise: null,
    auto: options.auto,
    params: null,
    fetch: fetchFunction,
    reload: fetchFunction,
    submit: fetchFunction,
    reset,
    update,
    setData,
  })

  async function fetch(params, tempOptions = {}) {
    if (params instanceof Event) {
      params = null
    }

    params = params || out.params
    if (options.makeParams) {
      params = options.makeParams.call(vm, params)
    }
    out.params = params
    out.previousData = out.data ? JSON.parse(JSON.stringify(out.data)) : null
    out.loading = true
    out.error = null

    options.onFetch?.call(vm, out.params)

    let beforeSubmitFunctions = [options.beforeSubmit, tempOptions.beforeSubmit]
    for (let fn of beforeSubmitFunctions) {
      fn?.call(vm, out.params)
    }

    let validateFunction = tempOptions.validate || options.validate
    let errorFunctions = [options.onError, tempOptions.onError]
    let successFunctions = [options.onSuccess, tempOptions.onSuccess]
    let dataFunctions = [options.onData, tempOptions.onData]

    if (validateFunction) {
      try {
        let invalidMessage = await validateFunction.call(vm, out.params)
        if (invalidMessage && typeof invalidMessage === 'string') {
          throw new Error(invalidMessage)
        }
      } catch (error) {
        handleError(error, errorFunctions)
        return
      }
    }

    try {
      let resourceFetcher =
        options.resourceFetcher || getConfig('resourceFetcher') || frappeRequest
      out.promise = resourceFetcher({
        ...options,
        onError: undefined,
        params: params || options.params,
      })
      let data = await out.promise
      out.data = transform(data)
      out.fetched = true
      for (let fn of successFunctions) {
        fn?.call(vm, data)
      }
      for (let fn of dataFunctions) {
        fn?.call(vm, data)
      }
    } catch (error) {
      handleError(error, errorFunctions)
    }

    out.loading = false
    return out.data
  }

  function update({ method, url, params, auto }) {
    if (method && method !== options.method) out.method = method
    if (url && url !== options.url) out.url = url
    if (params && params !== options.params) out.params = params
    if (auto !== undefined && auto !== out.auto) out.auto = auto
  }

  function reset() {
    out.data = options.initialData || null
    out.previousData = null
    out.loading = false
    out.fetched = false
    out.error = null
    out.params = null
    out.auto = options.auto
  }

  function transform(data) {
    if (options.transform) {
      let returnValue = options.transform.call(vm, data)
      if (returnValue != null) {
        return returnValue
      }
    }
    return data
  }

  function setData(data) {
    if (typeof data === 'function') {
      data = data.call(vm, out.data)
    }
    out.data = transform(data)
  }

  function handleError(error, errorFunctions) {
    out.loading = false
    if (out.previousData) {
      out.data = out.previousData
    }
    out.error = error
    for (let fn of errorFunctions) {
      fn?.call(vm, error)
    }
    if (errorFunctions.every((fn) => fn == null)) {
      let errorHandler = getConfig('fallbackErrorHandler')
      if (errorHandler) {
        try {
          errorHandler(error)
        } catch (fallbackError) {
          console.warn('Error in fallbackErrorHandler', fallbackError)
        }
      }
    }
    throw error
  }

  if (cacheKey && !cachedResources[cacheKey]) {
    cachedResources[cacheKey] = out
  }

  if (options.auto) {
    out.fetch()
  }

  return out
}

export function createListResource(options, vm) {
  if (!options.doctype) {
    throw new Error('List resource requires doctype')
  }

  let cacheKey = getCacheKey(options.cache)
  if (cacheKey) {
    let cached = listCache[cacheKey]
    if (cached) {
      if (cached.auto) {
        cached.reload()
      }
      return cached
    }
  }

  let defaultListUrl = getConfig('defaultListUrl') || 'frappe.client.get_list'
  let defaultDocInsertUrl = getConfig('defaultDocInsertUrl') || 'frappe.client.insert'
  let defaultDocUpdateUrl = getConfig('defaultDocUpdateUrl') || 'frappe.client.set_value'
  let defaultDocDeleteUrl = getConfig('defaultDocDeleteUrl') || 'frappe.client.delete'
  let defaultRunDocMethodUrl = getConfig('defaultRunDocMethodUrl') || 'run_doc_method'

  let out = reactive({
    doctype: options.doctype,
    fields: options.fields,
    filters: options.filters,
    orFilters: options.orFilters,
    orderBy: options.orderBy,
    start: options.start || 0,
    pageLength: options.pageLength || 20,
    groupBy: options.groupBy,
    parent: options.parent,
    debug: options.debug || 0,
    originalData: null,
    dataMap: {},
    data: null,
    previous,
    hasPreviousPage: false,
    next,
    hasNextPage: true,
    auto: options.auto,
    list: createResource(
      {
        url: options.url || defaultListUrl,
        makeParams() {
          return {
            doctype: out.doctype,
            fields: out.fields,
            filters: out.filters,
            or_filters: out.orFilters,
            order_by: out.orderBy,
            start: out.start,
            limit: out.pageLength,
            limit_start: out.start,
            limit_page_length: out.pageLength,
            group_by: out.groupBy,
            parent: out.parent,
            debug: out.debug,
          }
        },
        onSuccess(data) {
          out.hasPreviousPage = !!out.start
          out.hasNextPage = data.length < out.pageLength ? false : true
          let pagedData = !out.start ? data : (out.originalData || []).concat(data)
          setData(pagedData)
          options.onSuccess?.call(vm, out.data)
        },
        onError: options.onError,
      },
      vm,
    ),
    insert: createResource(
      {
        url: defaultDocInsertUrl,
        makeParams(values) {
          return {
            doc: {
              doctype: out.doctype,
              ...values,
            },
          }
        },
        onSuccess(data) {
          out.list.fetch()
          options.insert?.onSuccess?.call(vm, data)
        },
        onError: options.insert?.onError,
      },
      vm,
    ),
    setValue: createResource(
      {
        url: defaultDocUpdateUrl,
        makeParams(values) {
          let { name, ...fieldValues } = values
          return {
            doctype: out.doctype,
            name,
            fieldname: fieldValues,
          }
        },
        onSuccess(doc) {
          updateRowInListResource(out.doctype, doc)
          options.setValue?.onSuccess?.call(vm, doc)
        },
        onError: options.setValue?.onError,
      },
      vm,
    ),
    delete: createResource(
      {
        url: defaultDocDeleteUrl,
        makeParams(name) {
          return {
            doctype: out.doctype,
            name,
          }
        },
        onSuccess(data) {
          out.list.fetch()
          options.delete?.onSuccess?.call(vm, data)
        },
        onError: options.delete?.onError,
      },
      vm,
    ),
    runDocMethod: createResource(
      {
        url: defaultRunDocMethodUrl,
        makeParams({ method, name, ...values }) {
          return {
            dt: out.doctype,
            dn: name,
            method,
            args: values,
          }
        },
        onSuccess(data) {
          options.runDocMethod?.onSuccess?.call(vm, data)
        },
        onError: options.runDocMethod?.onError,
      },
      vm,
    ),
    update,
    fetch,
    reload,
    setData,
    transform,
  })

  function update(updatedOptions) {
    Object.assign(out, updatedOptions)
  }

  function transform(data) {
    if (options.transform) {
      let returnValue = options.transform.call(vm, data)
      if (returnValue != null) {
        return returnValue
      }
    }
    return data
  }

  function setData(data) {
    out.originalData = data
    if (typeof data === 'function') {
      data = data.call(vm, out.data)
    }
    out.data = transform(data)

    if (Array.isArray(out.data)) {
      out.dataMap = {}
      for (let row of out.data) {
        if (!row.name) continue
        out.dataMap[row.name.toString()] = row
      }
    }
  }

  function reload() {
    let currentStart = out.start
    let currentPageLength = out.pageLength
    if (out.start > 0) {
      out.start = 0
      out.pageLength = out.originalData?.length || currentPageLength
    }
    return out.list.fetch().finally(() => {
      out.start = currentStart
      out.pageLength = currentPageLength
    })
  }

  function fetch() {
    return reload()
  }

  function previous() {
    out.start = out.start - out.pageLength
    out.list.fetch()
  }

  function next() {
    out.start = out.start + out.pageLength
    out.list.fetch()
  }

  if (cacheKey) {
    listCache[cacheKey] = out
  }

  if (options.auto) {
    out.list.fetch()
  }

  resourcesByDocType[out.doctype] = resourcesByDocType[out.doctype] || []
  resourcesByDocType[out.doctype].push(out)

  return out
}

function updateRowInListResource(doctype, doc) {
  if (!doc?.name) return
  let resources = resourcesByDocType[doctype] || []
  for (let resource of resources) {
    if (!resource.originalData) continue
    for (let row of resource.originalData) {
      if (row.name && row.name == doc.name) {
        for (let key in row) {
          if (key in doc) {
            row[key] = doc[key]
          }
        }
      }
    }
    resource.data = resource.transform(resource.originalData)
  }
}

function getCacheKey(cacheKey) {
  if (!cacheKey) return null
  if (typeof cacheKey === 'string') {
    cacheKey = [cacheKey]
  }
  return JSON.stringify(cacheKey)
}
