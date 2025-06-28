const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-41",
  headers: {
    authorization: "0b29a7a6-71d4-445b-8202-2b632e1e043c",
    "Content-Type": "application/json",
  },
};

const response = (url, fetchOptions) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.baseUrl}${url}`, fetchOptions)
      .then((res) => {
        if (!res.ok) {
          console.log("Запрос не обработан");
          throw new Error("Error");
        }
        return res.json();
      })
      .then((result) => {
        console.log(result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject("Запрос отклонён");
      });
  });
};

export const deleteCardFromServer = (cardId) =>
  response(`/cards/${cardId}`, {
      method: "DELETE",
      headers: config.headers,
    });

export const like = (cardId) =>
  response(`/cards/likes/${cardId}`, {
      method: "PUT",
      headers: config.headers,
    });

export const unlike = (cardId) =>
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