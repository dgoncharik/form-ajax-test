'use strict';

;(() => {

  const Code = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  function createXhr(cbLoad, cbError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      let error;
      switch (xhr.status) {
        case Code.SUCCESS:
          cbLoad(xhr.response);
          break;
        case Code.NOT_FOUND:
          error = xhr.status + ' Запрашиваемый ресурс не найден.';
          break;
        case Code.SERVER_ERROR:
          error = xhr.status + ' Внутренняя ошибка сервера';
          break;
        default:
          error = 'Ошибка! Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        cbError(error);
      }
    });

    xhr.addEventListener('error', function() {
      cbError('Ошибка соеденения!');
    });

    xhr.addEventListener('timeout', function() {
      cbError('Превышен таймаут ожидания выполнения запроса: ' + xhr.timeout + 'мс');
    })

    return xhr;
  }

  function send(url, data, cbLoad, cbError) {
    const xhr = createXhr(cbLoad, cbError);
    xhr.open('POST', url);
    xhr.send(data);
  }

  window.backend = {
    send: send
  }

})()