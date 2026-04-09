import call from './call'
import initSocket from './socketio'

let defaultOptions = {
  call: true,
  socketio: true,
}

export default {
  install(app, options = {}) {
    options = Object.assign({}, defaultOptions, options)

    if (options.call) {
      let callFunction = typeof options.call == 'function' ? options.call : call
      app.config.globalProperties.$call = callFunction
    }
    if (options.socketio) {
      app.config.globalProperties.$socket = initSocket(options.socketio)
    }
  },
}
