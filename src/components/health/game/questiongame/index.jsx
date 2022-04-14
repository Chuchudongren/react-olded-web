import React, { useState, useEffect, useRef } from 'react'
import './index.css'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { message } from 'antd'
import axios from 'axios'
export default function QSGame() {
    const [qsList, setQsList] = useState([])
    const [currentQ, setCurrentQ] = useState({})
    const [visitedQ, setVisitedQ] = useState([])
    const [mark, setMark] = useState(0)
    const question = useRef()
    const T = useRef()
    const F = useRef()
    useEffect(() => {
        axios.get('/health/getgameone').then(res => {
            setQsList(res.data.results)
        })
    }, [])
    const checkQs = (boolean) => {
        if (visitedQ.length === qsList.length) {
            message.error('题库已耗尽,请刷新后重试')
        } else {
            if (Object.keys(currentQ).length > 0) {
                if (currentQ.answer === boolean * 1) {
                    message.success('回答正确')
                    setMark(mark + 1)
                    clickBtn(boolean, 1)
                } else {
                    clickBtn(boolean, 0)
                    message.error('回答错误')
                }
            }
            let timer1 = setTimeout(() => {
                question.current.className = 'qs_turn'
                clearTimeout(timer1)
                let timer2 = setTimeout(() => {
                    question.current.className = ''
                    turnQs()
                    clearTimeout(timer2)
                }, 300)
            }, 500)
        }
    }
    // 控制按钮显示正确错误的样式
    const clickBtn = (boolean, iscurrect) => {
        if (boolean) {
            T.current.className = iscurrect ? 'qs_section_true qs_correct' : 'qs_section_true qs_error'
            let tiemr = setTimeout(() => {
                T.current.className = 'qs_section_true '
                clearTimeout(tiemr)
            }, 500)
        } else {
            F.current.className = iscurrect ? 'qs_section_false qs_correct' : 'qs_section_false qs_error'
            let tiemr = setTimeout(() => {
                F.current.className = 'qs_section_false '
                clearTimeout(tiemr)
            }, 500)
        }
    }
    const turnQs = () => {

        if (visitedQ.length < qsList.length) {
            let i = Math.round(Math.random() * (qsList.length - 1))
            while (visitedQ.indexOf(i) !== -1) {
                i = Math.round(Math.random() * qsList.length)
            }
            setCurrentQ(qsList[i])
            visitedQ.push(i)
            setVisitedQ(visitedQ)
        }
    }
    return (
        <div className="qs_bg">
            <header className="qs_header">
                <h1>选择您认为正确的答案</h1>
                <span>您的得分：{mark}</span>
            </header>
            <section className="qs_section">
                <h1 ref={question}>提问:{currentQ !== null && typeof currentQ.question !== 'undefined' ? currentQ.question : '准备好请点击对号开始游戏'}</h1>
                <span ref={T} onClick={(e) => { checkQs(true) }} className="qs_section_true"><CheckOutlined /></span>
                <span ref={F} onClick={(e) => { checkQs(false) }} className="qs_section_false"><CloseOutlined /></span>
            </section>
        </div >
    )
}
