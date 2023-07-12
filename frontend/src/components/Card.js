import { useContext } from "react";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleCardLike() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="element">
      {isOwn && (
        <button
          className="element__trash-button"
          onClick={handleCardDelete}
          type="button"
        ></button>
      )}
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <div className="element__caption">
        <h3 className="element__name">{props.card.name}</h3>
        <div className="element__like-container" onClick={handleCardLike}>
          <button className={cardLikeButtonClassName} type="button"></button>
          <p className="element__like-amount">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
