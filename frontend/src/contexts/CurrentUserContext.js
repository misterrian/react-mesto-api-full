import React from "react";

export const defaultCurrentUser = {
    _id: '',
    name: 'Кто-то неизвестный',
    about: 'Человек мира',
    avatar: '',
};

export const CurrentUserContext = React.createContext(defaultCurrentUser);
