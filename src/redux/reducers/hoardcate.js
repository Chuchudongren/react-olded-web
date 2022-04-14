/* 定义论坛分类的状态控制 */
import { SETHOARDCATE } from '../constent'
const cate = 1
export default function HoardCateReducers(preState = cate, action) {
    const { type, data } = action
    switch (type) {
        case SETHOARDCATE:
            return data
        default:
            return preState
    }
}
