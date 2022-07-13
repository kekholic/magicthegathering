const container = document.querySelector('.container');

container.addEventListener('click', async (event) => {
  event.preventDefault();
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
