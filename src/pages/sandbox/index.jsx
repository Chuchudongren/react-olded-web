/* 
  这里是所有内容部分的首页
*/
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeBackgroundAction, chooseMusicAction } from '../../redux/action/action'
import './index.css'
function Sandbox(props) {
  useEffect(() => {
    props.changeBackgroundAction('index')
    props.chooseMusicAction('0')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()
  return (
    <div className="sanbox_bg" >
      <ul className="sandbox_btn">
        <li onClick={() => {
          navigate('/news')
          document.getElementById('scrollTop').scrollIntoView(true);
        }} className='entrance entrance1'></li>
        <li onClick={() => {
          navigate('/life')
          document.getElementById('scrollTop').scrollIntoView(true);

        }} className='entrance entrance2'></li>
        <li onClick={() => {
          navigate('/health/index')
          document.getElementById('scrollTop').scrollIntoView(true);

        }} className='entrance entrance3'></li>
        <li onClick={() => {
          navigate('/hoard')
          document.getElementById('scrollTop').scrollIntoView(true);
        }} className='entrance entrance4'></li>
      </ul>
      <div className="content">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}
export default connect((state) => ({ background: state.Background }), {
  changeBackgroundAction, chooseMusicAction
})(Sandbox)
