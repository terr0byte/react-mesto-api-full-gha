import "../index.css";

function ImagePopup(props) {
  function handleClose() {
    props.onClose();
  }

  return (
    <div className={`popup image-popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container image-popup__container">
        <button
          className="popup__close-button image-popup__close-button"
          type="button"
          onClick={handleClose}
        ></button>
        <img
          className="image-popup__image"
          src={`${props.card.link}`}
          alt="Изображение"
        />
        <h3 className="image-popup__name">{props.card.name}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
