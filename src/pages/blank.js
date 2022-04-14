// 空页面
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { changeBackgroundAction } from '../redux/action/action'
function Blank() {
  useEffect((props) => {
    props.changeBackgroundAction('blank')
  }, [])
  return <>NOT FOUNT 404</>
}

export default connect((state) => ({ background: state.Background }), {
  changeBackgroundAction,
})(Blank)
