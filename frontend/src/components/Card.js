import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner._id === currentUser._id;
    const removeCardButtonClassName = `element__remove ${isOwn ? "" : "element__remove_hidden"}`;
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const likeButtonClassName = `element__like ${isLiked ? "element__like_active" : ""}`;

    return (
        <div className="element" onClick={(event) => onCardClick(card)}>
            <img src={card.link} alt={card.name} className="element__picture"/>
            <div
                className={removeCardButtonClassName}
                onClick={(event) => onCardDelete(event, card)}
            />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div>
                    <div
                        className={likeButtonClassName}
                        onClick={(event) => onCardLike(event, card)}
                    />
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
}
