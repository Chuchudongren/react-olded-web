import { CHANGEPLAY, CHOOSEMUSIC, CHANGEBACK, FLASH, SETHOARDCATE } from '../constent'
// 控制 music 播放的 action
export const changeIsPlayAction = (data) => ({ type: CHANGEPLAY, data })
// 控制 播放 哪一首歌曲的action
export const chooseMusicAction = (data) => ({ type: CHOOSEMUSIC, data })
// 切换网站网页的背景图片
export const changeBackgroundAction = (data) => ({ type: CHANGEBACK, data })
// 刷新页面组件的控制管理
export const falshAction = () => ({ type: FLASH })
// 设置论坛分类组件的控制管理
export const sethoardcateAction = (data) => ({ type: SETHOARDCATE, data })
