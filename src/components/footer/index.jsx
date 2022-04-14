import React from 'react'
import { Row, Col } from 'antd'
import './index.css'
import {
  QqOutlined,
  WechatOutlined,
  WeiboOutlined,
  AlipayOutlined,
} from '@ant-design/icons'
function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <Row>
          <Col span={5} className="part part1">
            <span>我们的使命</span>
            <ul>
              <li>老吾老,以及人之老</li>
              <li>幼吾幼,以及人之幼</li>
              <li>天下可运于掌</li>
            </ul>
          </Col>
          <Col span={4} className="part part2">
            <span>友情链接</span>
            <ul>
              <li>
                <a href="http://www.12348.gov.cn/">中国法律服务网</a>
              </li>
              <li>
                <a href="https://tj.58.com/">58同城网</a>
              </li>
              <li>
                <a href="http://www.xinhuanet.com/">人民日报网</a>
              </li>
              <li>
                <a href="http://www.people.com.cn/">中国法律服务网</a>
              </li>
            </ul>
          </Col>
          <Col span={7} className="part part3">
            <span>联系我们</span>
            <ul>
              <li>
                <span>地址:</span>天津科技大学十四公寓
              </li>
              <li>
                <span>电话:</span>18238671977
              </li>
              <li>
                <span>邮箱:</span>799734771@qq.com
              </li>
            </ul>
          </Col>
          <Col span={8} className="part part4">
            <span>社交媒体</span>
            <div className="social">
              <a href="http://localhost:3000/" className="qq">
                <span>腾讯QQ</span>
                <br />
                <QqOutlined style={{ fontSize: '50px' }} />
              </a>
              <a href="http://localhost:3000/" className="wx">
                <span>微信</span>
                <br />
                <WechatOutlined style={{ fontSize: '50px' }} />
              </a>
            </div>
            <div className="social">
              <a href="http://localhost:3000/" className="wb">
                <span>新浪微博</span>
                <br />
                <WeiboOutlined style={{ fontSize: '50px' }} />
              </a>
              <a href="http://localhost:3000/" className="dy">
                <span>支付宝</span>
                <br />
                <AlipayOutlined style={{ fontSize: '50px' }} />
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <span className="c1">
              <a href="http://localhost:3000/">
                信息网络传播视听节目许可证xxxxxx
              </a>
              |
              <a href="http://localhost:3000/">
                网络文化经营许可证 京网文[xxxx]xxxx-xxxx号
              </a>
              |
              <a href="http://localhost:3000/">
                网络出版服务许可证（京）字xxxx号
              </a>
              |<a href="http://localhost:3000/">京公网安备xxxxxxxx号</a>
            </span>
            <span className="c2">
              老 来 乐 版 权 所 有 ，未 经 书 面 授 权 禁 止 使 用
            </span>
            <span className="c3">
              Copyright © 2022-2022 by www.laolaile.com. all rights reserved
            </span>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Footer
