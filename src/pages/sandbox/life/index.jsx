import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { chooseMusicAction, changeBackgroundAction } from '../../../redux/action/action'
import LifeSiderBar from '../../../components/life/sidebar'
import IndexVolunt from '../../../components/life/index_volunt'
import IndexLaw from '../../../components/life/index_law'
import IndexService from '../../../components/life/index_service'
import './index.css'
function Life(props) {
  useEffect(() => {
    props.chooseMusicAction(3)
    props.changeBackgroundAction('life_index')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="life_bg">
      <div className="life_left">
        <LifeSiderBar />
      </div>
      <div className="life_right">
        {/* <div id="life_index">
          <div className="life_index_title"><div></div></div>
        </div> */}
        <div id="life_volunt"><IndexVolunt /></div>
        <div id="life_law"><IndexLaw /></div>
        <div id="life_service"><IndexService /></div>
      </div>
    </div>
  )
}

export default connect(state => ({}), {
  chooseMusicAction,
  changeBackgroundAction
})(Life)
