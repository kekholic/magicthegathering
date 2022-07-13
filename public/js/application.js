const container = document.querySelector('.container');

container.addEventListener('click', async (event) => {
  event.preventDefault();

  const userId = 1;
  // button create collection FETCH
  if (event.target.dataset.idButton === 'create-button') {
    const titleNewCollection = document.querySelector("[data-id-input = 'create-input']").value;
    // отправляем фетч с созданием новой коллекции
    const response = await fetch(`http://localhost:3000/users/${userId}/collections/new`, {
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
    const repsonse1 = await fetch(`http://localhost:3000/users/${userId}/collections/${collectionId}/new/fetch`);
    const { html } = await repsonse1.json();
    container.innerHTML = html;
    window.history.pushState(null, null, `http://localhost:3000/users/${userId}/collections/${collectionId}/new`);
  }

  // search smth for route /users/:id/collections/new w/o any fetch
  if (event.target.dataset.idButton === 'search-button') {
    const input = document.querySelector("[data-id-search = 'search-input']");
    const cardDiv = document.querySelector('#card-list');
    cardDiv.innerHTML = '';
    const { value } = input;

    const response = await fetch(
      `http://localhost:3000/api/search/${value}`,
      {
        credentials: 'include',
      },
    );
    const result = await response.json();
    let count = 0;
    const currentlyUrl = window.document.location.pathname;
    const regExp = /\d+/igm;
    // достаем айди коллекции
    const collectionId = currentlyUrl.match(regExp)[1];
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
      addButton.classList = 'add-card-button';
      addButton.innerText = 'add';
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

  if (event.target.classList.contains('add-card-button')) {
    // достаю айди коллекции в которую будем добавлять карточку
    const collectionId = event.target.dataset.collId;
    // достаю имя коллекции которое будем добавлять в дб
    const collectionName = event.target.previousElementSibling.dataset.name;
    // достаю цену карточки которую будем добавлять в дб
    const collectionPrice = event.target.previousElementSibling.dataset.price;
    // достаем ссылку на картинку, которую будем добавлять в дб
    const img = event.target.previousElementSibling.src;
    console.log('before fetch');
    const response = await fetch(`http://localhost:3000/users/${userId}/collections/${collectionId}/new`, {
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
    // eslint-disable-next-line max-len
    const collectionId = event.target.parentElement.parentElement.parentElement.parentElement.dataset.id;
    // const response = await fetch('');
  }

  // перейти к форме регистрации
  if (event.target.id === 'go-register') {
    try {
      const response = await fetch('/auth/register');
      const { html } = await response.json();
      container.innerHTML = html;
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
      const response = await fetch('/auth/register', {
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
      if (response.status === 401) console.log('Невалидные данные');
      else {
        const { html } = await response.json();
        container.innerHTML = html;

        // fast route to receive userId
        // container.dataset.userId =
        // window.history.pushState(null, null, '/auth/login');
      }
    } catch (error) {
      console.log('error: ', error);
    }
  }
  // перейти к форме логина
  if (event.target.id === 'go-login') {
    try {
      const response = await fetch('/auth/login');
      const { html } = await response.json();
      container.innerHTML = html;
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
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });
      const { html } = await response.json();
      container.innerHTML = html;
    } catch (error) {
      console.log('error: ', error);
    }
  }
});
