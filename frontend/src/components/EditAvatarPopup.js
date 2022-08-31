import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, submitText}) {
    const [avatar, setAvatar] = React.useState('');

    const handleAvatarChange = (e) => setAvatar(e.target.value);

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => setAvatar(currentUser.avatar), [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatar
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            title="Обновить аватар"
            name="avatar"
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText={submitText}
        >
            <input id="avatar" className="popup__input" name="avatar" type="url"
                   placeholder="Ссылка на аватар" required value={avatar} onChange={handleAvatarChange}/>
            <span className="avatar-error popup__error-message"></span>
        </PopupWithForm>
    );
}