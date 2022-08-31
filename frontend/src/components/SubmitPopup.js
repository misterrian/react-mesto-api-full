import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function SubmitPopup({isOpen, onClose, onSubmit, submitText}) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit();
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            title="Вы уверены?"
            name="submit"
            submitText={submitText}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    );
}