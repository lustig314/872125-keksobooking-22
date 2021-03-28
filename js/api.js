

const makeRequest = ({url, method, body, onSuccess, onFail}) => {
  fetch(url, {
    method,
    body,
  }).then((response) => {
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


export { makeRequest };

