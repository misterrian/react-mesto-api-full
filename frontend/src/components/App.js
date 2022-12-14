import React from "react";
import {Route, Routes, useNavigate} from "react-router";
import {CurrentUserContext, defaultCurrentUser} from "../contexts/CurrentUserContext";
import {api} from "../utils/api";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import SubmitPopup from "./SubmitPopup";
import ImagePopup from "./ImagePopup";
import {apiAuth} from "../utils/apiAuth";
import InfoTooltip from "./InfoTooltip";
import errorImage from "../images/error.svg";
import successImage from "../images/success.svg";

export default function App() {
    const [email, setEmail] = React.useState('');
    const [currentUser, setCurrentUser] = React.useState(defaultCurrentUser);
    const [cards, setCards] = React.useState([]);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [cardToDelete, setCardToDelete] = React.useState(null);
    const [isRequestInProgress, setIsRequestInProgress] = React.useState(false);
    const [tooltip, setTooltip] = React.useState(null);

    const navigate = useNavigate();

    React.useEffect(() => {
        api.getUserInfo()
            .then(userData => {
                setCurrentUser(userData);
                setEmail(userData.email);
                navigate("/");
            })
            .catch(err => console.log(err));
    }, [navigate]);

    React.useEffect(() => {
        if (currentUser._id) {
            api.getInitialCards()
                .then(response => setCards(response))
                .catch(error => console.log(error));
        }
    }, [currentUser]);

    const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
    const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
    const handleCardClick = (card) => setSelectedCard(card);

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setCardToDelete(null);
    }

    function handleUpdateUser(userData) {
        setIsRequestInProgress(true);
        api.saveProfile(userData)
            .then(response => {
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch(error => console.log(error))
            .finally(() => setIsRequestInProgress(false));
    }

    function handleUpdateAvatar(avatarData) {
        setIsRequestInProgress(true);
        api.saveAvatar(avatarData)
            .then(response => {
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch(error => console.log(error))
            .finally(() => setIsRequestInProgress(false));
    }

    function handleCardLike(event, card) {
        event.stopPropagation();

        const isLiked = card.likes.some(like => like === currentUser._id);

        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => setCards(state => state.map(c => card._id === c._id ? newCard : c)))
            .catch(error => console.log(error));
    }

    function handleCardDelete(event, card) {
        event.stopPropagation();
        setCardToDelete(card);
    }

    function performCardDelete() {
        setIsRequestInProgress(true);
        api
            .removeCard(cardToDelete._id)
            .then(() => {
                setCards((state) => state.filter(c => cardToDelete._id !== c._id));
                closeAllPopups();
            })
            .catch(error => console.log(error))
            .finally(() => setIsRequestInProgress(false));
    }

    function handleAddPlaceSubmit(cardData) {
        setIsRequestInProgress(true);
        api.addCard(cardData)
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(error => console.log(error))
            .finally(() => setIsRequestInProgress(false));
    }

    function handleExitClick() {
        apiAuth.signout()
            .then(() => setCurrentUser(defaultCurrentUser))
            .catch(error => console.log(error));
    }

    function handleRegister(user) {
        apiAuth
            .signup(user)
            .then(() => setTooltip({
                picture: successImage,
                message: "???? ?????????????? ????????????????????????????????????!",
            }))
            .catch(err => {
                console.log(err);
                setTooltip({
                    picture: errorImage,
                    message: "??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.",
                });
            });
    }

    function handleLogin(loginInfo) {
        apiAuth.signin(loginInfo)
            .then(() => navigate("/"))
            .catch(err => {
                console.log(err);
                setTooltip({
                    picture: errorImage,
                    message: "??????-???? ?????????? ???? ??????! ???????????????????? ?????? ??????.",
                });
            });
    }

    function handleCloseTooltip() {
        setTooltip(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/sign-up" element={<Register onRegister={handleRegister}/>}/>
                <Route path="/sign-in" element={<Login onLogin={handleLogin}/>}/>
                <Route path="/" element={
                    <ProtectedRoute isLoggedIn={currentUser._id}>
                        <div className="page">
                            <Header>
                                <p>{email}</p>
                                <p className="header__link header__link_gray" onClick={handleExitClick}>??????????</p>
                            </Header>
                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                selectedCard={selectedCard}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                            <Footer/>
                        </div>
                    </ProtectedRoute>
                }/>
            </Routes>

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                submitText={isRequestInProgress ? "????????????????????..." : "??????????????????"}
            />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                submitText={isRequestInProgress ? "????????????????????..." : "??????????????????"}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                submitText={isRequestInProgress ? "????????????????..." : "??????????????"}
            />

            <SubmitPopup
                isOpen={cardToDelete}
                onClose={closeAllPopups}
                onSubmit={performCardDelete}
                submitText={isRequestInProgress ? "????????????????..." : "????"}
            />

            <ImagePopup
                selectedCard={selectedCard}
                onClose={closeAllPopups}
            />

            <InfoTooltip
                tooltip={tooltip}
                onClose={handleCloseTooltip}
            />
        </CurrentUserContext.Provider>
    );
}
