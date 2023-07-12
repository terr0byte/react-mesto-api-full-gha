import "../index.css";

function PopupWithForm(props) {
  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button popup__close-button_type_card"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name="popup"
          noValidate
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__header">{props.title}</h2>
          {props.children}
          <button
            className={`popup__submit-button ${props.buttonClass}`}
            type="submit"
          >
            {props.buttonText || "Сохранить"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
