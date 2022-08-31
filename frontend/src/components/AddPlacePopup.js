import React from 'react';
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onAddPlace, submitText}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleLinkChange = (e) => setLink(e.target.value);

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: name,
            link: link,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            title="Новое место"
            name="new-place"
            submitText={submitText}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input id="place" type="text" name="name" className="popup__input" placeholder="Название" minLength="2"
                   maxLength="30" required value={name} onChange={handleNameChange}/>
            <span className="place-error popup__error-message"></span>
            <input id="link" type="url" name="link" className="popup__input" placeholder="Ссылка на картинку"
                   required value={link} onChange={handleLinkChange}/>
            <span className="link-error popup__error-message"></span>
        </PopupWithForm>
    );
}