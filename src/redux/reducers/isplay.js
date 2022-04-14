/* 定义网站是否自动播放的状态管理 reducer */
import { CHANGEPLAY } from '../constent'
const isPlay = false
export default function ChangePlayReducer(preState = isPlay, action) {
  const { type, data } = action
  switch (type) {
    case CHANGEPLAY:
      return data
    default:
      return preState
  }
}
