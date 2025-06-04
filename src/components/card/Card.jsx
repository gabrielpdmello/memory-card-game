import "./Card.css"

function Card({ id, name, image, handleCardClick}) {
    function handleClick() {
        handleCardClick(id);
    }

    return (<div className="card" key={id} onClick={handleClick}>
        <img
            className="card-img"
            src={image}
            alt={name.charAt(0).toUpperCase() + name.slice(1)}
        />
        <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
    </div>)
}

export default Card