import { useRef } from "react";
import "../index.css";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(avatarRef.current.value);

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonClass="popup__avatar-button"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <>
        <input
          ref={avatarRef}
          type="url"
          className="popup__field"
          name="avatar"
          id="popupAvatarLink"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__input-error popupAvatarLink-error"></span>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
