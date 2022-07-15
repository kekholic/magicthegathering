const container = document.querySelector('.container');
const containerFluid = document.querySelector('.container-fluid');
const logoutBtn = document.querySelector('#getLogout');
const url = 'https://mtgeagles.herokuapp.com';

async function getUserId() {
  try {
    const response = await fetch(`${url}/id`);
    const { id } = await response.json();
    console.log(id);
    return id;
  } catch (error) {
    console.log('error: ', error.message);
  }
}

const getIdFromUrl = (num) => {
  const currentlyUrl = window.document.location.pathname;
  const regExp = /\d+/igm;
  const Id = currentlyUrl.match(regExp)[num];
  return Id;
};

container.addEventListener('click', async (event) => {
  event.preventDefault();

  // перейти к форме регистрации
  if (event.target.id === 'go-register') {
    try {
      const response = await fetch(`${url}/auth/register/fetch`);
      const { html } = await response.json();
      container.innerHTML = html;
      logoutBtn.hidden = false;
      window.history.pushState(null, null, '/auth/register');
    } catch (error) {
      console.log('error: ', error.message);
    }
  }
  // зарегистрироваться
  if (event.target.id === 'getRegister') {
    const name = document.querySelector('#inputNameRegister').value;
    const login = document.querySelector('#inputLoginRegister').value;
    const password = document.querySelector('#inputPasswordRegister').value;
    try {
      const response = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          login,
          password,
        }),
      });
      if (response.status === 401) {
        const error = await response.json();
        console.log(error);
        return alert(error.message);
      }
      const { html } = await response.json();
      container.innerHTML = html;
      logoutBtn.hidden = false;

      const userId = await getUserId();
      console.log('USEERID INSIDE', userId);
      logoutBtn.hidden = false;
      window.history.pushState(null, null, `/users/${userId}/collections`);
    } catch (error) {
      console.log('error: ', error);
    }
  }
  // перейти к форме логина
  if (event.target.id === 'go-login') {
    try {
      const response = await fetch(`${url}/auth/login/fetch`);
      const { html } = await response.json();
      container.innerHTML = html;
      logoutBtn.hidden = false;
      window.history.pushState(null, null, '/auth/login');
    } catch (error) {
      console.log('error: ', error.message);
    }
  }
  // залогиниться
  if (event.target.id === 'getLogin') {
    const login = document.querySelector('#inputLoginLogin').value;
    const password = document.querySelector('#inputPasswordLogin').value;
    try {
      const response = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      const { html, err } = await response.json();
      if (err) {
        return alert(err);
      }
      container.innerHTML = html;
      logoutBtn.hidden = false;
      const userId = await getUserId();
      window.history.pushState(null, null, `/users/${userId}/collections`);
    } catch (error) {
      console.log('error: ', error);
    }
  }
  // button create collection FETCH
  if (event.target.dataset.idButton === 'create-button') {
    const titleNewCollection = document.querySelector("[data-id-input = 'create-input']").value;
    // отправляем фетч с созданием новой коллекции
    const userId = getIdFromUrl(0);
    const response = await fetch(`${url}/users/${userId}/collections/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        title: titleNewCollection,
      }),
    });
    const { collectionId } = await response.json();
    // отправляем гет запрос на отрисовку создания новой коллекции
    const repsonse1 = await fetch(`${url}/users/${userId}/collections/${collectionId}/new/fetch`);
    const { html, err } = await repsonse1.json();
    container.innerHTML = html;
    logoutBtn.hidden = false;
    window.history.pushState(null, null, `${url}/users/${userId}/collections/${collectionId}/new`);
  }

  // search smth for route /users/:id/collections/new w/o any fetch
  if (event.target.dataset.idButton === 'search-button') {
    const input = document.querySelector("[data-id-search = 'search-input']");
    const cardDiv = document.querySelector('#card-list');
    cardDiv.innerHTML = '';
    const { value } = input;

    const response = await fetch(
      `${url}/api/search/${value}`,
      {
        credentials: 'include',
      },
    );
    const result = await response.json();
    let count = 0;

    // достаем айди коллекции
    const collectionId = getIdFromUrl(1);
    while (count < 12 && count < result.total_cards) {
      // достаем ссылку картинки карточки
      const imageUrl = result.data[count].image_uris.border_crop;
      // достаем имя карточки
      const imgName = result.data[count].name;
      // достаем цену карточки
      const imgPrice = result.data[count].prices.usd || 0;
      // создаю див кол
      const divCol = document.createElement('div');
      divCol.classList = 'col';
      // создаю див card
      const divCard = document.createElement('div');
      divCard.classList = 'card';
      divCol.append(divCard);
      // создаем кнопку для возомжности добавлять карточку в коллекцию
      const addButton = document.createElement('button');
      addButton.dataset.collId = collectionId;
      addButton.classList = 'add-card-button btn btn-secondary add-card-button2';
      addButton.innerText = 'Добавить';
      // добавляю картинку и сохраняем её данные
      const img = document.createElement('img');
      img.classList = 'my-card card-img-top';
      img.dataset.name = imgName;
      img.dataset.price = imgPrice;
      img.src = imageUrl;
      // создаем наш элемент и прорисовываем его
      divCard.append(img);
      divCard.append(addButton);
      cardDiv.append(divCol);
      count += 1;
    }
  }
  // добавление карточки в дб
  if (event.target.classList.contains('add-card-button')) {
    const userId = getIdFromUrl(0);
    // достаю айди коллекции в которую будем добавлять карточку
    const collectionId = event.target.dataset.collId;
    // достаю имя коллекции которое будем добавлять в дб
    const collectionName = event.target.previousElementSibling.dataset.name;
    // достаю цену карточки которую будем добавлять в дб
    const collectionPrice = event.target.previousElementSibling.dataset.price;
    // достаем ссылку на картинку, которую будем добавлять в дб
    const img = event.target.previousElementSibling.src;
    const response = await fetch(`${url}/users/${userId}/collections/${collectionId}/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionId,
        title: collectionName,
        price: collectionPrice,
        image: img,
      }),
    });
    // easy way
    if (response.status === 200) event.target.remove();
  }

  // изменение колоды
  if (event.target.dataset.editColl === 'edit-coll') {
    const userId = getIdFromUrl(0);
    // eslint-disable-next-line max-len
    const collectionId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
    const response = await fetch(`${url}/users/${userId}/collections/${collectionId}/fetch`);
    const html = await response.json();
    container.innerHTML = html.html;
    logoutBtn.hidden = false;
    window.history.pushState(null, null, `${url}/users/${userId}/collections/${collectionId}`);
  }

  // кнопка перехода на добавления карт в колоду ИЗ созданной колоды
  if (event.target.dataset.name === 'add-cards') {
    const userId = getIdFromUrl(0);
    const collectionId = getIdFromUrl(1);
    const repsonse1 = await fetch(`${url}/users/${userId}/collections/${collectionId}/new/fetch`);
    const { html } = await repsonse1.json();
    container.innerHTML = html;
    window.history.pushState(null, null, `${url}/users/${userId}/collections/${collectionId}/new`);
  }

  // кнопка возврата из окна добавления карт в коллекцию на страницу коллекции
  if (event.target.dataset.idButton === 'save-collection') {
    const userId = getIdFromUrl(0);
    const collectionId = getIdFromUrl(1);
    const response = await fetch(`${url}/users/${userId}/collections/${collectionId}/fetch`);
    const html = await response.json();
    container.innerHTML = html.html;
    window.history.pushState(null, null, `${url}/users/${userId}/collections/${collectionId}`);
  }

  // удаление коллекции из дб и страницы
  if (event.target.dataset.deleteColl === 'delete-coll') {
    const userId = getIdFromUrl(0);
    // eslint-disable-next-line max-len
    const collectionId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
    const cardBody = event.target.parentElement.parentElement.parentElement;
    const response = await fetch(`${url}/users/${userId}/collections/fetch`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: collectionId,
      }),
    });
    if (response.status === 200) {
      cardBody.remove();
    }
  }

  // добавление количества карт в колоду
  if (event.target.classList.contains('incrementButton')) {
    const userId = getIdFromUrl(0);
    const collectionId = getIdFromUrl(1);
    const { cardId } = event.target.previousElementSibling.previousElementSibling.dataset;
    const img = event.target.previousElementSibling.previousElementSibling;
    const span = event.target.previousElementSibling.firstChild;
    const response = await fetch(`${url}/users/${userId}/collections/${collectionId}/fetch`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionId,
        cardId,
      }),
    });
    if (response.status === 200) {
      const accessible = await response.json();
      img.className = 'notGray';
      span.innerHTML = `Кол-во: ${accessible}`;
    }
  }
});

// Слушатель навбара
containerFluid.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.id === 'getLogout') {
    try {
      const response = await fetch(`${url}/auth/logout`);
      const { html } = await response.json();
      container.innerHTML = html;
      logoutBtn.hidden = true;
      window.history.pushState(null, null, '/home');
    } catch (error) {
      console.log('error: ', error.message);
    }
  }

  if (event.target.id === 'getLogoutCollect') {
    try {
      const id = await getUserId();
      const response = await fetch(`${url}/users/${id}/collections/a`);
      const { html } = await response.json();
      container.innerHTML = html;
      logoutBtn.hidden = false;
      window.history.pushState(null, null, `/users/${id}/collections`);
    } catch (error) {
      console.log('error: ', error.message);
    }
  }
});
