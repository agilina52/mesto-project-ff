const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "0b29a7a6-71d4-445b-8202-2b632e1e043c",
    "Content-Type": "application/json",
  },
};

const response = (url, fetchOptions) => {
  return fetch(`${config.baseUrl}${url}`, fetchOptions)
      .then(res => {
      if (res.ok) {
        return res.json();
      }

      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

export const deleteCardFromServer = (cardId) =>
  response(`/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });

export const setLikeCard = (cardId) =>
  response(`/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    });

export const setUnlikeCard = (cardId) =>
  response(`/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });

export const updateAvatar = (userPhotoLink) =>
  response(`/users/me/avatar`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        avatar: userPhotoLink,
      }),
    });

export const updateProfile = (userProfile) =>
  response(`/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(userProfile),
    });

export const addCard = (cardData) =>
  response(`/cards`, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(cardData),
    });

export const getUser = () =>
  response(`/users/me`, {
    method: "GET",
    headers: config.headers,
  });

export const getCards = () =>
  response(`/cards`, {
    headers: config.headers,
  });