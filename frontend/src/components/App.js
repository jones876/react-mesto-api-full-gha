import { useState, useEffect } from 'react';
import '../index.css';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState(false);

  const [deletedCard, setDeletedCard] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [isLoad, setLoad] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState({});
  const [userEmail, setUserEmail] = useState("");

 
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards.data);
      })
      .catch(console.error);
    }
  }, [loggedIn]);


const checkToken = () => {
  const token = localStorage.getItem('token');

  auth
    .getContent(token)
    .then((data) => {
      if (data) {
        setLoggedIn(true);
        navigate('/');
        setUserEmail(data.email)
      }
      return;
    })
    .catch(console.error);
};
useEffect(() => {
  checkToken();
}, []);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleConfirmDeleteClick(card) {
    setIsConfirmPopupOpen(true);
    setDeletedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltip(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    isLiked
      ? api.deleteLike(card._id).then(handleResponse).catch(console.error)
      : api.addLike(card._id).then(handleResponse).catch(console.error);

  }
  function handleResponse(newCard) {
    setCards((state) =>
      state.map((c) => (c._id === newCard._id ? newCard : c))
    );
  }

  function handleCardDelete() {
   
    setLoad(true);
    const cardId = deletedCard._id;
    api
      .deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoad(false);
      });
  }


  function handleUpdateUser(data) {
    setLoad(true);
    api
      .sendUserInfo(data)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoad(false);
      });
  }

  function handleUpdateAvatar(data) {
    setLoad(true);
    api
      .updateAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoad(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setLoad(true);
    api
      .sendNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => {
        setLoad(false);
      });
  }
  function handleInfoTooltip() {
    setIsInfoTooltip(true);
  }
  function handleLogin() {
    setLoggedIn(true);
    checkToken();
    
  }
  
  const navigate = useNavigate();

  
  function signOut() {
  
    localStorage.removeItem('email');
    setLoggedIn(false);
    setUserEmail('');
    navigate('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route
            element={
              loggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Navigate to='/sign-in' replace />
              )
            }
          />
          <Route
            path='/'
            element={
              <>
                <Header
                  title='Выйти'
                  route=''
                  userEmail={userEmail}
                  onClick={signOut}
                />
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={handleConfirmDeleteClick}
                  cards={cards}
                />
              </>
            }
          />

          <Route
            path='/sign-in'
            element={
              <>
                <Header title='Регистрация' route='/sign-up' />
                <Login
                  handleInfoTooltip={handleInfoTooltip}
                  handleLogin={handleLogin}
                  setStatus={setStatus}
                />
              </>
            }
          />

          <Route
            path='/sign-up'
            element={
              <>
                <Header title='Войти' route='/sign-in' />
                <Register
                  handleInfoTooltip={handleInfoTooltip}
                  setStatus={setStatus}
                />
              </>
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoad}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoad={isLoad}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoad}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoad={isLoad}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <InfoTooltip
          status={status}
          onClose={closeAllPopups}
          isOpen={isInfoTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
