import React from 'react'
import { connect } from 'react-redux'
import { Avatar, Dropdown } from 'antd'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { chooseMusicAction } from '../../redux/action/action'
import BgMusic from './bgmusic/index'
import styles from './index.module.css'

function Header() {
  const token = qs.parse(localStorage.getItem('token'))
  console.log(token);
  const navigate = useNavigate()
  return (
    <div className={styles.header}>
      <BgMusic />
      <div className="container">
        <div style={{ overflow: 'hidden' }}>
          <div
            className={styles.logo}
            onClick={() => {
              navigate('/index')
            }}
          ></div>
          <div
            className={styles.name}
            onClick={() => {
              navigate('/index')
            }}
          >
            <div className={styles.name1}></div>
            <div className={styles.name2}></div>
          </div>
          {token.nickname ? (
            <div className={styles.userName}>{token.nickname}</div>
          ) : (
            <button
              className={styles.login}
              onClick={() => {
                navigate('/user/login')
              }}
            >
              登录
              <span className={styles.underline}></span>
            </button>
          )}

          {
            token.userid !== undefined ?
              <><div className={styles.avatar}>
                <Dropdown
                  className={styles.dropdown}
                  overlay={
                    <div
                      onClick={() => {
                        localStorage.setItem('token', {})
                        navigate('/')
                      }}
                      className={styles.quit}
                    >
                      <div className={styles.triangle}></div>
                      退出登录
                    </div>
                  }
                  placement="bottom"
                >
                  <Avatar
                    size={64}
                    src={token.avatar}
                  />
                </Dropdown>
              </div>
                <div
                  className={styles.username}
                  onClick={() => {
                    typeof token.userid !== 'undefined' && token.userid ?
                      navigate('/my/' + token.userid) : navigate('/user/login')
                  }}
                >
                  个人中心
                </div></> : <></>
          }
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state) => ({ music: state.MusicIndex }),
  {
    chooseMusicAction,
  }
)(Header)
