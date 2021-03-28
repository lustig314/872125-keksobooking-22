
const makeRequest = ({ url, method, body, onSuccess, onFail }) => {
  fetch(url, {
    method,
    body,
  })
    .then((response) => {
      if (!response.ok) {
        new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onFail();
    });
};

export { makeRequest };

