import React, { useRef, useEffect } from 'react'
import { connect } from 'react-redux'
import { changeIsPlayAction } from '../../../redux/action/action'
import styles from './index.module.css'
import { PauseCircleFilled, PlayCircleFilled } from '@ant-design/icons'
function BgMusic(props) {
  const audio = useRef()
  // 0是首页 1是登录 2是新闻政策 3是生活服务 4是健康管理 5是娱乐论坛 6是我的
  const musicList = [
    'http://127.0.0.1:8002/uploads/header/music/index.mp3',
    'http://127.0.0.1:8002/uploads/header/music/login.mp3',
    'http://127.0.0.1:8002/uploads/header/music/news.mp3',
    'http://127.0.0.1:8002/uploads/header/music/life.mp3',
    'http://127.0.0.1:8002/uploads/header/music/health.mp3',
    'http://127.0.0.1:8002/uploads/header/music/hoard.mp3',
    'http://127.0.0.1:8002/uploads/header/music/my.mp3',
  ]
  useEffect(() => {
    audio.current.load()
    props.isPlay ? audio.current.play() : audio.current.pause()
  }, [props.isPlay, props.music])
  return (
    <div className={styles.container}>
      <span className={styles.alert}>点击右边按钮开启/关闭音乐</span>
      {props.isPlay === false ? (
        <div className={styles.span}>
          <PlayCircleFilled
            onClick={() => {
              audio.current.play()
              props.changeIsPlayAction(!props.isPlay)
            }} />
        </div>
      ) : (
        <div className={styles.span}>
          <PauseCircleFilled
            onClick={() => {
              audio.current.pause()
              props.changeIsPlayAction(!props.isPlay)
            }} />
        </div>
      )}
      <audio
        key={props.music}
        ref={audio}
        loop
        preload="auto"
        src={musicList[props.music]}
      ></audio>
    </div>
  )
}

export default connect(
  (state) => ({ isPlay: state.IsPlay, music: state.MusicIndex }),
  {
    changeIsPlayAction,
  }
)(BgMusic)
