import { useState, useEffect, useContext } from "react";
import "../index.css";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="card"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonClass=""
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <>
        <input
          value={name ?? ""}
          type="text"
          className="popup__field"
          name="name"
          id="popupName"
          placeholder=""
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          required
        />
        <span className="popup__input-error popupName-error"></span>
        <input
          value={description ?? ""}
          type="text"
          className="popup__field"
          name="about"
          id="popupAbout"
          placeholder=""
          minLength="2"
          maxLength="200"
          onChange={handleDescriptionChange}
          required
        />
        <span className="popup__input-error popupAbout-error"></span>
      </>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
