import { useContext } from "react";
import "../index.css";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__avatar-container"
            type="button"
            onClick={() => {
              props.onEditAvatar();
            }}
          >
            <div className="profile__avatar-edit"></div>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар"
            />
          </button>
          <div className="profile__info">
            <button
              className="profile__edit-button"
              type="button"
              onClick={() => {
                props.onEditProfile();
              }}
            ></button>
            <h1 className="profile__name">{currentUser.name}</h1>
            <h2 className="profile__about">{currentUser.about}</h2>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => {
            props.onAddPlace();
          }}
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((item) => {
          return (
            <Card
              card={item}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              key={item._id}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
