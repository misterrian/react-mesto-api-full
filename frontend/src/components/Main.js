import React from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Card from "./Card";

export default function Main(props) {
    const {onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete} = props;

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <img src={currentUser.avatar} alt="Аватар" className="profile__avatar-photo"/>
                    <div className="profile__avatar-button" onClick={onEditAvatar}></div>
                </div>
                <div className="profile-info">
                    <h1 className="profile-info__title">{currentUser.name}</h1>
                    <button
                        type="button"
                        className="profile-info__edit-button"
                        onClick={onEditProfile}>
                    </button>
                    <p className="profile-info__subtitle">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>

            <section className="elements">
                {cards.map(cardData => (
                    <Card
                        key={cardData._id}
                        card={cardData}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}
            </section>
        </main>
    );
}
