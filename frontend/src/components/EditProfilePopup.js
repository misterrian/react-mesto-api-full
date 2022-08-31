import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser, submitText}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            title="Редактировать профиль"
            name="profile"
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText={submitText}
        >
            <input id="name" type="text" name="name" className="popup__input" placeholder="Имя" minLength="2"
                   maxLength="40" required value={name} onChange={handleNameChange}/>
            <span className="name-error popup__error-message"></span>
            <input id="job" type="text" name="about" className="popup__input"
                   placeholder="Профессиональная деятельность" minLength="2" maxLength="200" required
                   value={description} onChange={handleDescriptionChange}/>
            <span className="job-error popup__error-message"></span>
        </PopupWithForm>
    );
}