/* 定义刷新页面组件的一个状态控制 */
import { FLASH } from '../constent'
const isFlash = false
export default function FlashReducer(preState = isFlash, action) {
    const { type } = action
    switch (type) {
        case FLASH:
            let newF = !preState
            return newF
        default:
            return preState
    }
}
