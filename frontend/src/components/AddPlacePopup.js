import { useState } from "react";
import "../index.css";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  function handlePlaceNameChange(e) {
    setPlaceName(e.target.value);
  }

  function handlePlaceLinkChange(e) {
    setPlaceLink(e.target.value);
  }

  function handlePlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="create-mesto"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonClass=""
      buttonText="Создать"
      onSubmit={handlePlaceSubmit}
    >
      <>
        <input
          type="text"
          className="popup__field"
          name="name"
          id="popupImageName"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handlePlaceNameChange}
          required
        />
        <span className="popup__input-error popupImageName-error"></span>
        <input
          type="url"
          className="popup__field"
          name="link"
          id="popupLink"
          placeholder="Ссылка на картинку"
          onChange={handlePlaceLinkChange}
          required
        />
        <span className="popup__input-error popupLink-error"></span>
      </>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
