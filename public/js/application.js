console.log('perdim');

const container = document.querySelector('.container');

container.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.dataset.idButton === 'search-button') {
    const input = document.querySelector("[data-id-search = 'search-input']");
    const cardDiv = document.querySelector('#card-list');
    const { value } = input;

    const response = await fetch(
      `http://localhost:3000/api/search/${value}`,
      {
        credentials: 'include',
      },
    );
    const result = await response.json();
    let count = 0;
    while (count < 10 && count < result.total_cards) {
      const imageUrl = result.data[count].image_uris.border_crop;
      // создаю див кол
      const divCol = document.createElement('div');
      divCol.classList = 'col';
      // создаю див carf
      const divCard = document.createElement('div');
      divCard.classList = 'card';
      divCol.append(divCard);
      const addButton = document.createElement('button');
      addButton.innerText = 'add';
      divCol.append(addButton);
      // добавляю картинку
      const img = document.createElement('img');
      img.classList = 'my-card card-img-top';
      img.src = imageUrl;
      divCard.append(img);
      cardDiv.append(divCol);
      count += 1;
    }
  }
});
