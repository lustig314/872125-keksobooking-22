const UrlAddresses = {
  GET: 'https://22.javascript.pages.academy/keksobooking/data',
  POST: 'https://22.javascript.pages.academy/keksobooking',
}

const getOrSendData = (onSuccess, onFail, body, isGet = true) => {
  if (isGet) {
    return fetch(UrlAddresses.GET).then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      },
    );
  } else {
    fetch(
      UrlAddresses.POST, {
        method: 'POST',
        body,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
        } else {
          onFail();
        }
      })
      .catch(() => {
        onFail();
      });
  }
};

export { getOrSendData };

