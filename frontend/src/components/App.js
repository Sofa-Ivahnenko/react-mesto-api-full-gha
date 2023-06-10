import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth";
import reject from "../images/tooltip-reject.svg";
import resolve from "../images/tooltip-resolve.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // Стейт выбранной карточки (для нажатия)
  const [selectedCard, setSelectedCard] = useState({});

  // Стейт текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Перенесли переменную карточек
  const [cards, setCards] = useState([]);

  // Стейт статуса зайдено
  const [isLogged, setIsLogged] = useState(false);
  // Стейты модалки инфоТултип
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [titleTooltip, setTitleTooltip] = useState("");
  const [iconTooltip, setIconTooltip] = useState("");

  const [userEmail, setUserEmail] = useState(null);

  // Записываем функцию useNavigate в переменную navigate
  const navigate = useNavigate();

  const handleInfoTooltip = () => {
    setIsOpenTooltip(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsOpenTooltip(false);
  };

  // Функция лайка карточки
  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API(передаем айди нужной крточки и фалс-значение проверки нашего лайка)
    // Получаем обновлённые данные карточки
    // Далее обновляем стейт карточек
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(err));
  };

  // Функция удаления карточки
  const handleCardDelete = (card) => {
    // Отправляем запрос в API(передаем айди карточки)
    // Оновляем стейт(метод фильтр создает копию массива и исключает из него карточку)
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  // Функция-обработчик, в которой мы
  // Делаем делаем запрос к API на обновление пользовательской информации
  // Обновляем стейт контекста из полученных с сервера данных
  // Закрываем попап
  const handleUpdateUser = (data) => {
    api
      .updateUserInfo(data)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  // Функция-обработчик, в которой мы
  // Делаем делаем запрос к API на обновление аватара
  // Обновляем стейт контекста из полученных с сервера данных (обновляем аватар локально)
  // Закрываем попап
  const handleUpdateAvatar = (data) => {
    api
      .updateAvatar(data)
      .then((newData) => setCurrentUser(newData))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  // Функция-обработчик, в которой мы
  // Делаем запрос к API на добавление карточки
  // Обновляем стейт карточек используя расширенную копию исходного массива (обновляем карточки локально)
  // Закрываем попап
  const handleAddPlaceSubmit = (data) => {
    api
      .addCard(data)
      .then((newData) => {
        setCards([newData, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  // В эту функцию передаются значения инпутов из компонента Логин
  // Отправляем на сервер эти данные
  // Сервер высылает ответ
  // Если в ответе содержится токен, то мы его записываем в локальное хранилище
  const handleLoginSubmit = (email, password) => {
    auth
      .authorization(email, password)
      .then((res) => {
          localStorage.setItem("jwt", res.token); // Сохраняем токен('ключ', 'значение')
          setIsLogged(true); // Обновляем стейт локально
          setUserEmail(email); //Обновляем стейт почты
          navigate("/"); // Перенаправляем
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip();
        setTitleTooltip("Что-то пошло не так! Попробуйте еще раз."); // Обновили стейт татйла
        setIconTooltip(reject); // Обновили стейт иконки
      });
  };

  const handleRegisterSubmit = (email,password) => {
    auth
      .registration(email, password)
      .then(() => {
        setTitleTooltip("Вы успешно зарегистрировались!"); // Обновили стейт тайтлТултип
        setIconTooltip(resolve); // Обновили стейт иконки
        navigate("/signin"); // Перенаправляем в окно авторизации
      })
      .catch((err) => {
        console.log(err);
        setTitleTooltip("Что-то пошло не так! Попробуйте еще раз."); //Обновили стейт тайтла
        setIconTooltip(reject); // Обновили стейт иконки
      })
      .finally(handleInfoTooltip)
  }

  // При монтировании App описан эффект, проверяющий наличие токена и его валидности
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          if(res) {
            setIsLogged(true);
            setUserEmail(res.email);// Обновляем стейт почты
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogged])

  // Проеряем токен
  useEffect(() => {
    if (isLogged === true) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  // Эффект при монтировании делающий запрос за пользовательской информацией и карточками
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, serverCards]) => {
        // Обновляем стейт-переменные из полученных значений
        setCurrentUser(userData);
        setCards(serverCards);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [isLogged]);

  // Функция выхода из профиля
  const signOut = () => {
    setIsLogged(false);
    setUserEmail(null); // Обновляем стейт почты
    navigate("/signin");
    localStorage.removeItem("jwt");
  };

  // Импортировали контекст и обернули весь корневой компонент в его провайдер,
  // Контекст - состояние текущего пользователя

  // Путь sign-up для регистрации
  // Путь sign-in для входа (авторизации)
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="fields">
        <div className="page">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  <Header route="/signin" text="Войти" />
                  <Register onSubmit={handleRegisterSubmit} />
                </>
              }
            />
            <Route
              path="/signin"
              element={
                <>
                  <Header route="/signup" text="Регистрация" />
                  <Login onSubmit={handleLoginSubmit} />
                </>
              }
            />
            <Route
              exact
              path="/"
              element={
                <>
                  <Header route="" text="Выйти" mail={userEmail} signOut={signOut}/>
                  <ProtectedRouteElement
                    component={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                    isLogged={isLogged}
                  />
                  <Footer />
                </>
              }
            />
            <Route path="*" element={<Navigate to={isLogged ? "/" : "/signin"} />} />
          </Routes>
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <InfoTooltip isOpen={isOpenTooltip} title={titleTooltip} image={iconTooltip} onClose={closeAllPopups}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
