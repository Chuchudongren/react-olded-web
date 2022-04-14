import React from 'react'
import { connect } from 'react-redux'
import Footer from '../components/footer'
import Header from '../components/header'
import IndexRouter from '../router/indexRouter'
import './index.css'
function Pages(props) {

  return (
    <div id="scrollTop" className={props.background}>
      <Header />
      <div className="pages">
        <IndexRouter />
      </div>
      <Footer />
    </div>
  )
}

export default connect(
  (state) => ({ isPlay: state.IsPlay, background: state.Background }),
  {
  }
)(Pages)
