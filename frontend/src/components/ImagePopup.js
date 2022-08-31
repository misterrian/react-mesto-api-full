export default function ImagePopup({selectedCard, onClose}) {
    return (
        <div className={`popup popup_dark ${selectedCard && "popup_opened"}`}>
            <div className="popup__preview">
                <img src={selectedCard?.link} alt={selectedCard?.name} className="popup__photo"/>
                <button type="button" className="popup__close-icon" onClick={onClose}></button>
                <p className="popup__name-preview">{selectedCard?.name}</p>
            </div>
        </div>
    );
}
