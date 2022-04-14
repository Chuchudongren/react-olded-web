import React, { useEffect, useRef, useState } from 'react'
import './index.css'
export default function Game3(props) {
    const [mark, setMark] = useState(0)
    const apple = useRef()
    const player = useRef()
    const audio = useRef()
    const [appleXY, setAppleXY] = useState([0, 0])
    const [playerX, setPlayerX] = useState(500)
    const [playerY, setPlayerY] = useState(100)
    // 定义一个函数 使得屏幕上随机出现apple
    useEffect(() => {
        let AX = Math.round(Math.random() * 1150);
        let AY = Math.round(Math.random() * 550);
        apple.current.style.left = AX + 'px'
        apple.current.style.top = AY + 'px'
        apple.current.style.display = 'block'
        setAppleXY([AX, AY])
        return () => {
            document.onkeydown = function () { }
        }
    }, [mark])
    document.onkeydown = function (event) {
        event = event || window.event;
        if (event.key === 'ArrowLeft') {
            isEat()
            setPlayerX(playerX - 10)
            return false
        }
        if (event.key === 'ArrowUp') {
            isEat()
            setPlayerY(playerY - 10)
            return false
        }
        if (event.key === 'ArrowRight') {
            isEat()
            setPlayerX(playerX + 10)
            return false
        }
        if (event.key === 'ArrowDown') {
            isEat()
            setPlayerY(playerY + 10)
            return false
        }
    }

    const isEat = () => {
        if ((player.current.offsetTop >= appleXY[1] && player.current.offsetTop <= appleXY[1] + 50) || (player.current.offsetTop + 50 >= appleXY[1] && player.current.offsetTop <= appleXY[1])) {
            if ((player.current.offsetLeft >= appleXY[0] && player.current.offsetLeft <= appleXY[0] + 50) || (player.current.offsetLeft + 50 >= appleXY[0] && player.current.offsetLeft <= appleXY[0])) {
                setMark(mark + 10)
                audio.current.volume = 0.4
                audio.current.play()
            }
        }
    }
    return (
        <div className="game3_bg">
            <span>得分：{mark}</span>
            <div ref={apple} className="game3_apple"></div>
            <div ref={player} style={{ left: playerX + 'px', top: playerY + 'px', transition: 'all 0.1s linear' }} className="game3_user"></div>
            <audio ref={audio} src='http://127.0.0.1:8002/uploads/body/index/health/game/wang.mp3' controls="controls" loop={false} hidden={true}>
            </audio>
        </div>
    )
}
