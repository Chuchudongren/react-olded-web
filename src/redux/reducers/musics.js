/* 定义网站是否自动播放的状态管理 reducer */
import { CHOOSEMUSIC } from '../constent'
const isPlay = 0
export default function ChangePlayReducer(preState = isPlay, action) {
  const { type, data } = action
  switch (type) {
    case CHOOSEMUSIC:
      return data
    default:
      return preState
  }
}
