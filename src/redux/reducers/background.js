/* 定义网站每个网页的背景信息 */
import { CHANGEBACK } from '../constent'
const background_image = 'index'
export default function ChangePlayReducer(
  preState = 'background_' + background_image,
  action
) {
  const { type, data } = action
  switch (type) {
    case CHANGEBACK:
      return 'background_' + data
    default:
      return preState
  }
}
