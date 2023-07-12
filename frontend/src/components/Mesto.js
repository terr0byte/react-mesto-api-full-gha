import "../index.css";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Mesto(props) {
  return (
    <CurrentUserContext.Provider value={props.currentUser}>
      <Main
        cards={props.cards}
        onEditProfile={props.handleEditProfileClick}
        onAddPlace={props.handleAddPlaceClick}
        onEditAvatar={props.handleEditAvatarClick}
        onCardClick={props.handleCardClick}
        onCardLike={props.handleCardLike}
        onCardDelete={props.handleCardDelete}
      />

      <EditProfilePopup
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.handleEditProfileClose}
        onUpdateUser={props.handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.handleEditAvatarClose}
        onUpdateAvatar={props.handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.handleAddPlaceClose}
        onAddPlace={props.handleAddPlace}
      />

      <ImagePopup
        card={props.selectedCard}
        isOpen={props.isImagePopupOpen}
        onClose={props.handleImagePopupClose}
      />

      <PopupWithForm
        title="Вы уверены?"
        name="confirmation"
        buttonClass="confirm-popup__button"
        buttonText="Да"
      ></PopupWithForm>
    </CurrentUserContext.Provider>
  );
}

export default Mesto;
