import React, { useRef } from 'react'
import { Anchor } from 'antd';
import './index.css'
const { Link } = Anchor;
export default function LifeSiderBar() {
    const anchor = useRef()
    window.onscroll = function () {
        let affix = document.getElementsByClassName('ant-affix')
        if (document.documentElement.scrollTop > 3000) {
            let h = 3000 - document.documentElement.scrollTop
            affix[0].style.top = h + 'px'
        }
    }
    return (
        <div className="sidebar_nav">
            <div ref={anchor}>
                <Anchor className="sidebar_anchor">
                    <div className="sidebar_index_bg"></div><Link className="link" href="#life_index" title="|"></Link>
                    <div className="sidebar_volunt_bg"></div><Link className="link" href="#life_volunt" title="|"></Link>
                    <div className="sidebar_law_bg"></div><Link className="link" href="#life_law" title="|"></Link>
                    <div className="sidebar_service_bg"></div><Link className="link" href="#life_service" title="|"></Link>
                </Anchor>
            </div>
            <div className="sidebar_occlude"></div>
            <div className="sidebar_demo"></div>
            <div className="sidebar_demo1"></div>
        </div>
    )
}
