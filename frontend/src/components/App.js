import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Mesto from "./Mesto.js";
import ProtectedRoute from "./ProtectedRoute.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import api from "../utils/Api.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "../utils/Auth.js";
import "../index.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipOpen, setTooltipState] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [userData, setUserData] = useState({});
  const [headerEmail, setHeaderEmail] = useState("");
  const [isEditProfilePopupOpen, setEditPopupState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarState] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupState] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      api
        .getOwner()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getFromServer("/cards")
        .then(async (res) => {
          await res;
          await setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarState(true);
  }

  function handleEditProfileClick() {
    setEditPopupState(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceState(true);
  }

  function handleEditAvatarClose() {
    setEditAvatarState(false);
  }

  function handleEditProfileClose() {
    setEditPopupState(false);
  }

  function handleAddPlaceClose() {
    setAddPlaceState(false);
  }

  function handleImagePopupClose() {
    setImagePopupState(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupState(true);
  }

  function handleUpdateUser(data) {
    api.uploadUserInfo(data).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    });
  }

  function handleUpdateAvatar(data) {
    api.sendAvatar(data).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    });
  }

  function handleAddPlace(data) {
    api.uploadCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCardFromServer(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    handleEditAvatarClose();
    handleEditProfileClose();
    handleAddPlaceClose();
    handleImagePopupClose();
  }

  function authorize(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          setHeaderEmail(email);
          handleLogin();
          navigate("/mesto", { replace: true });
        }
      })
      .catch((err) => handleTooltipOpen(false));
  }

  function registerNew(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        handleTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => handleTooltipOpen(false));
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleTooltipOpen(prop) {
    setTooltipState(true);
    setRegister(prop);
  }

  function handleTooltipClose() {
    setTooltipState(false);
  }

  function handleLogout() {
    setHeaderEmail("");
    setLoggedIn(false);
    localStorage.removeItem("jwt");
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");
    auth
      .getContent(jwt)
      .then((res) => {
        if (res) {
          setUserData(res.data);
          setLoggedIn(true);
          navigate("/mesto", { replace: true });
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        navigate("/sign-in", { replace: true });
      });
  }

  useEffect(() => {
    setHeaderEmail(userData.email);
  }, [userData]);

  useEffect(() => {
    tokenCheck();
  }, []);

  return (
    <>
      <div className="page">
        <Header
          email={headerEmail}
          loggedIn={loggedIn}
          onClick={handleLogout}
        />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/mesto" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/mesto"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Mesto}
                  userData={userData}
                  currentUser={currentUser}
                  cards={cards}
                  handleEditProfileClick={handleEditProfileClick}
                  handleAddPlaceClick={handleAddPlaceClick}
                  handleEditAvatarClick={handleEditAvatarClick}
                  handleCardClick={handleCardClick}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                  isEditProfilePopupOpen={isEditProfilePopupOpen}
                  handleEditProfileClose={handleEditProfileClose}
                  handleUpdateUser={handleUpdateUser}
                  isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                  handleEditAvatarClose={handleEditAvatarClose}
                  handleUpdateAvatar={handleUpdateAvatar}
                  isAddPlacePopupOpen={isAddPlacePopupOpen}
                  handleAddPlaceClose={handleAddPlaceClose}
                  handleAddPlace={handleAddPlace}
                  selectedCard={selectedCard}
                  isImagePopupOpen={isImagePopupOpen}
                  handleImagePopupClose={handleImagePopupClose}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onSubmit={registerNew} />}
            />
            <Route
              exact
              path="/sign-in"
              element={<Login handleLogin={handleLogin} onSubmit={authorize} />}
            />
          </Routes>
        </main>
        <InfoTooltip
          isOpen={isTooltipOpen}
          isRegister={isRegister}
          onClose={handleTooltipClose}
        />
        <Footer />
      </div>
    </>
  );
}

export default App;
