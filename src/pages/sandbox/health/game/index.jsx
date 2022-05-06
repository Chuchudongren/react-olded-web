import React, { useState } from 'react';
import './index.css'
import QSGame1 from '../../../../components/health/game/questiongame';
import QSGame2 from '../../../../components/health/game/game2';
import QSGame3 from '../../../../components/health/game/game3';
import { message } from 'antd';
function HealthGame() {
  const [currentGame, setCurrentGame] = useState(0)
  return (
    <div className="game_bg">
      <header className="game_header">
        <span>选择游戏：</span>
        <button onClick={() => { setCurrentGame(1) }}>智力问答</button>
        <button onClick={() => { setCurrentGame(2) }}>算术⑨</button>
        <button onClick={() => {
          setCurrentGame(3)
          message.info('按住方向键即可开始游戏')
        }}>吃苹果</button>
      </header>
      <section className="game_window">
        {currentGame === 0 && <>
          <div className="game_index_bg">
            {/* <span>请选择您要玩的游戏</span> */}
          </div>
        </>}
        {currentGame === 1 && <QSGame1 />}
        {currentGame === 2 && <QSGame2 />}
        {currentGame === 3 && <QSGame3 currentGame={currentGame} />}
      </section>
    </div>
  );
}

export default HealthGame;
