import Card from "../card/Card";
import Scoreboard from "../scoreboard/Scoreboard";
import shuffleArray from "../helpers/shuffleArray"
import useFetchCards from "../hooks/useFetchCards";
import { useEffect, useState } from "react";
import "./Gameboard.css"

function Gameboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [cards, setCards] = useState([])
    const [selectedCards, setSelectedCards] = useState([]);
    const [score, setScore] = useState(0);
    const [topScore, setTopScore] = useState(0);
    const [gameStatus, setGameStatus] = useState("playing"); // playing, lost, won

    const fetchedCards = useFetchCards();

    useEffect(() => {
        if (fetchedCards.length > 0) {
            setIsLoading(false);
            setCards(fetchedCards);
        }
    }, [fetchedCards])

    function handleCardClick(id) {
        if (gameStatus !== "playing") return
        if (selectedCards.includes(id)) {
            setGameStatus("lost");

        } else {
            let newScore = score;
            newScore += 1;
            setScore(newScore);
            if (selectedCards.length === cards.length - 1) {
                setGameStatus("won");
                return
            }
            setCards(shuffleArray([...cards]));
            setSelectedCards([...selectedCards, id]);
        }
    }

    function playAgain() {
        if (score > topScore) {
            setTopScore(score);
        }
        setScore(0);
        setSelectedCards([]);
        setGameStatus("playing")
        setCards(shuffleArray([...cards]));

    }

    if (isLoading) {
        return (
            <p className="loading">Game is loading...</p>
        )
    }

    return (<>
        <Scoreboard
            score={score}
            topScore={topScore}
            gameStatus={gameStatus}
            playAgain={playAgain}
        />
        <div className="card-container">
            {cards.map((card) => (
                <Card
                    key={card.id}
                    id={card.id}
                    name={card.name}
                    image={card.image}
                    handleCardClick={handleCardClick}
                />
            ))}
        </div>
    </>)

}

export default Gameboard