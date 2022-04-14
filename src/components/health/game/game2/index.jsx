import { message } from 'antd'
import React, { useRef, useEffect, useState } from 'react'
import './index.css'
export default function Game2() {
    const operations = ['-', '+']
    const [num, setNum] = useState([])
    const [oper, setOper] = useState([])
    const [ans, setAns] = useState(0)
    const [mark, setMark] = useState(0)
    const [grade, setGrade] = useState(50)
    useEffect(() => {
        game2Input.current.value = ''
        let num1 = Math.floor(Math.random() * grade)
        let num2 = Math.floor(Math.random() * grade)
        let num3 = Math.floor(Math.random() * grade)
        let op1 = Math.floor(Math.random() * 2)
        let ans1 = op1 ? num1 + num2 : num1 - num2
        let op2 = Math.floor(Math.random() * 2)
        setNum([num1, num2, num3])
        setOper([operations[op1], operations[op2]])
        setAns(op2 ? ans1 + num3 : ans1 - num3)
        console.log(op2 ? ans1 + num3 : ans1 - num3);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mark, grade])
    const game2Input = useRef()
    const addNum = (num) => {
        if (num === -1 && (game2Input.current.value === undefined || game2Input.current.value.length === 0)) {
            game2Input.current.value = '-'
        } else if (num !== -1) {
            if (game2Input.current.value !== undefined && game2Input.current.value.length > 6) {
                message.error('您输入的位数太多啦~')
            } else {
                game2Input.current.value = game2Input.current.value + '' + num
            }
        }

    }
    const reduce = () => {
        game2Input.current.value = game2Input.current.value.substr(0, game2Input.current.value.length - 1)
    }
    const submit = () => {
        if (parseInt(game2Input.current.value) === ans) {
            message.success('恭喜你，答对啦！')
            setMark(mark + (grade === 50 ? 10 : grade === 100 ? 20 : 100))
        } else {
            message.error('啊哦，回答错误，再检查一下吧！')
            game2Input.current.value = ''
        }
    }
    return (
        <div className="game2_bg">
            <span className="game2_mark">得分：{mark}</span>
            <header className="game2_header">
                <ul>
                    <li>{num[0]}</li>
                    <li>{oper[0]}</li>
                    <li>{num[1]}</li>
                    <li>{oper[1]}</li>
                    <li>{num[2]}</li>
                    <li>=</li>
                    <li><input disabled ref={game2Input} type="text" /></li>
                </ul>
                <footer className="game2_footer">
                    <button onClick={() => { setGrade(50) }} className={grade === 50 ? 'game2_footer_active' : ''}>难度①</button>
                    <button onClick={() => { setGrade(100) }} className={grade === 100 ? 'game2_footer_active' : ''}>难度②</button>
                    <button onClick={() => { setGrade(1000) }} className={grade === 1000 ? 'game2_footer_active' : ''}>难度③</button>
                </footer>
            </header>
            <section className="game2_btn">
                <span onClick={() => { addNum(-1) }} className="game2_e">-</span>
                <ul>
                    <li onClick={() => { addNum(1) }}>1</li>
                    <li onClick={() => { addNum(2) }}>2</li>
                    <li onClick={() => { addNum(3) }}>3</li>
                    <li onClick={() => { reduce() }}>&lt;-</li>
                    <li onClick={() => { addNum(4) }}>4</li>
                    <li onClick={() => { addNum(5) }}>5</li>
                    <li onClick={() => { addNum(6) }}>6</li>
                    <li onClick={() => { addNum(0) }}>0</li>
                    <li onClick={() => { addNum(7) }}>7</li>
                    <li onClick={() => { addNum(8) }}>8</li>
                    <li onClick={() => { addNum(9) }}>9</li>
                    <li onClick={() => { submit() }}>确认</li>
                </ul>
            </section>
        </div>
    )
}
