function InfoTooltip({tooltip, onClose}) {
    function handlePopupClick(event) {
        const classList = event.target.classList;
        if (classList.contains("popup") || classList.contains("popup__close-icon")) {
            onClose();
        }
    }

    return (
        <div className={`popup ${tooltip && "popup_opened"}`} onClick={handlePopupClick}>
            <div className="popup__container info-tooltip">
                <button type="button" className="popup__close-icon" onClick={handlePopupClick}></button>
                <img src={tooltip?.picture} alt="Картинка с результатом" className="info-tooltip__picture"/>
                <p className="info-tooltip__message">{tooltip?.message}</p>
            </div>
        </div>
    );
}

export default InfoTooltip;