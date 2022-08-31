export default function PopupWithForm(
    {
        isOpen,
        title,
        name,
        children,
        onClose,
        onSubmit,
        submitText = "Сохранить",
        helpMessage,
    }
) {
    function handlePopupClick(event) {
        if (onClose) {
            const classList = event.target.classList;
            if (classList.contains("popup") || classList.contains("popup__close-icon")) {
                onClose();
            }
        }
    }

    return (
        <div className={"popup" + (isOpen ? " popup_opened" : "")} onClick={handlePopupClick}>
            <div className="popup__container">
                {onClose && <button type="button" className="popup__close-icon"></button>}
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}-editor`} className="popup__form" noValidate onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__submit-button">{submitText}</button>
                </form>
                {helpMessage && <p className="popup__help-message">{helpMessage}</p>}
            </div>
        </div>
    );
}
