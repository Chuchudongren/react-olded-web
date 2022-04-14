/*
    该文件专门用于暴露一个store 对象，整个应用只有一个store对象
*/
// 引入 createStore 专门用于创建redux中最为核心的store对象
import { createStore } from 'redux'

// 引入汇总之后的reducer 和 用于持久化的 config 信息
import { allReducers, persistConfig } from './reducers/index'

// 持久化
import { persistStore, persistReducer } from 'redux-persist'

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = createStore(persistedReducer)
const persister = persistStore(store)
// 引入 redux-thunk 用于支持异步action
// import thunk from 'redux-thunk'
// 引入 redux-devtools-extension
// import { composeWithDevTools } from 'redux-devtools-extension'

export { store, persister }
