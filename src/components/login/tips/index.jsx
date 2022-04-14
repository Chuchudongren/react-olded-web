import React from 'react'
import { ExclamationOutlined } from '@ant-design/icons'
import './index.css'

function Tips(props) {
  const tip_className = 'tip_' + props.tips.position
  return props.tips.disabled ? (
    <div className={tip_className}>
      <ExclamationOutlined style={{ color: 'red', margin: '0 5px' }} />
      {props.tips.msg}
    </div>
  ) : (
    <div></div>
  )
}

export default Tips
