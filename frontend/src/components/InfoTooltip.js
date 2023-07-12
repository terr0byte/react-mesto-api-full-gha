import okPath from "../images/Union.svg";
import errorPath from "../images/Error.svg";
import "../index.css";

function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button popup__close-button_type_tooltip"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__tooltip">
          <img
            className="popup__image"
            src={props.isRegister ? okPath : errorPath}
          ></img>
          <p className="popup__caption">
            {props.isRegister
              ? "Вы успешно зарегестрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
