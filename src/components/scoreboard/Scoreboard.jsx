import "./Scoreboard.css"

function Scoreboard({ score, topScore, gameStatus, playAgain }) {
    return (<div className="scoreboard">
        {gameStatus !== "playing" &&
            <h2>You {gameStatus}!</h2>}
        <div className="points">
            <p>Score: {score} / 12</p>
            <p>Top Score: {topScore} / 12</p>
        </div>
        {gameStatus !== "playing" &&
            <button className="play-again-btn" onClick={playAgain}>Play again</button>}
    </div>)
}

export default Scoreboard