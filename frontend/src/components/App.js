import {useState, useEffect} from 'react';
import {Route, Redirect, useHistory} from "react-router-dom";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ProtectedRoute from "./ProtectedRoute";
import AddPlacePopup from './AddPlacePopup';
import PopupWithForm from "./PopupWithForm";
import InfoTooltip from "./InfoTooltip";
import authApi from "../utils/authApi";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import api from "../utils/api";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import Main from "./Main";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [cards, setCards] = useState([]);

    const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [headerEmail, setHeaderEmail] = useState("");
    const history = useHistory();

    useEffect(() => {
        if (isLoggedIn) {
            api.getUserInfo()
                .then(profileInfo => setCurrentUser(profileInfo))
                .catch(err => console.log(err))

            api.getCards().then(data => {
                setCards(data.reverse().map((card) => ({
                    _id: card._id,
                    name: card.name,
                    link: card.link,
                    likes: card.likes,
                    owner: card.owner
                })))
            })
                .catch(err => console.log(err))
        }
    }, [isLoggedIn]);

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsSuccessPopupOpen(false)
        setSelectedCard({});
    }

    function handleUpdateAvatar(newAvatar) {
        setIsLoading(true);
        api.setUserAvatar(newAvatar)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function handleUpdateUser(newUserInfo) {
        setIsLoading(true);
        api.setUserInfo(newUserInfo)
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api.setCard(data)
            .then(newCard => {
                setCards([newCard, ...cards])
                closeAllPopups();
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false));
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(userId => userId === currentUser._id);
        api.setLike(card._id, !isLiked)
            .then(data => setCards((
                state) => state.map(
                item => item._id === card._id ? data.data : item)))
            .catch(err => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => setCards(
                state => state.filter(
                    item => item._id !== card._id)))
            .catch(err => console.log(err));
    }

    const isOpen = isEditAvatarPopupOpen
        || isEditProfilePopupOpen
        || isAddPlacePopupOpen
        || isSuccessPopupOpen
        || selectedCard;

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === "Escape") {
                closeAllPopups();
            }
        }

        if (isOpen) {
            document.addEventListener("keydown", closeByEscape);
            return () => document.removeEventListener("keydown", closeByEscape);
        }
    }, [isOpen]);

    function handleRegisterUser(email, password) {
        authApi
            .registerUser(email, password)
            .then((data) => {
                if (data) {
                    setIsInfoTooltipSuccess(true);
                    history.push("/sign-in");
                }
            })
            .catch((err) => {
                setIsInfoTooltipSuccess(false);
                console.log(err);
            })
            .finally(() => setIsSuccessPopupOpen(true));
    }

    function handleAuthUser(email, password) {
        authApi
            .loginUser(email, password)
            .then((data) => {
                if (data.token) {
                    setHeaderEmail(email);
                    setIsLoggedIn(true);
                    localStorage.setItem("jwt", data.token);
                    history.push("/");
                }
            })
            .catch((err) => {
                setIsInfoTooltipSuccess(false);
                setIsSuccessPopupOpen(true);
                console.log(err);
            });
    }

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            authApi
                .checkToken(jwt)
                .then((data) => {
                    if (data) {
                        setIsLoggedIn(true);
                        setHeaderEmail(data.email);
                        history.push("/");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [history]);

    function handleSignOut() {
        localStorage.removeItem("jwt");
        setHeaderEmail("");
        setIsLoggedIn(false);
        history.push("/sign-in");
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="main">
                    <Header
                        onSignOut={handleSignOut}
                        headerEmail={headerEmail}
                        signUp="Регистрация"
                        signIn="Войти"
                        signOut="Выйти"
                    />
                    <ProtectedRoute
                        component={Main}
                        onEditProfile={setIsEditProfilePopupOpen}
                        onEditAvatar={setIsEditAvatarPopupOpen}
                        onAddPlace={setIsAddPlacePopupOpen}
                        onCardDelete={handleCardDelete}
                        onCardClick={setSelectedCard}
                        onCardLike={handleCardLike}
                        isLoggedIn={isLoggedIn}
                        cards={cards}
                        path="/"
                    />
                    {isLoggedIn && <Footer/>}
                    <Route path="/sign-up">
                        <Register
                            onRegister={handleRegisterUser}
                            buttonText="Зарегистрироваться"
                            title="Регистрация"
                            message="Уже зарегистрированы? Войти"
                        />
                    </Route>
                    <Route path="/sign-in">
                        <Login
                            onLogin={handleAuthUser}
                            buttonText="Войти"
                            title="Вход"
                        />
                    </Route>
                    <Route>
                        {isLoggedIn
                            ? <Redirect to="/"/>
                            : <Redirect to="/sign-in"/>
                        }
                    </Route>
                    <AddPlacePopup
                        onAddPlace={handleAddPlaceSubmit}
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onLoading={isLoading}
                    />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onUpdateUser={handleUpdateUser}
                        onClose={closeAllPopups}
                        onLoading={isLoading}
                    />
                    <EditAvatarPopup
                        onUpdateAvatar={handleUpdateAvatar}
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onLoading={isLoading}
                    />
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                    <PopupWithForm
                        title="Вы уверены?"
                        buttonText="Да"
                        name="confirm"
                    />
                    <InfoTooltip
                        isSuccess={isInfoTooltipSuccess}
                        isOpen={isSuccessPopupOpen}
                        onClose={closeAllPopups}
                        name={"success"}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
