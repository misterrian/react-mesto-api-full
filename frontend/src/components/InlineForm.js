function InlineForm({name, title, helpMessage, submitText, onSubmit, children}) {
    return (
        <div className="inline-form">
            <div className="popup__container inline-form_dark">
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}-editor`} className="popup__form" noValidate onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__submit-button popup__submit-button_dark">
                        {submitText}
                    </button>
                </form>
                {helpMessage}
            </div>
        </div>
    );
}

export default InlineForm;
