const container = document.querySelector('.container');
const btnGoRegister = document.querySelector('#go-register');
const btnGoLogin = document.querySelector('#go-login');


container.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.id === 'go-register') {
    try {
      const response = await fetch('/auth/register');
      const { html } = await response.json();
      container.innerHTML = html;
    } catch (error) {
      console.log('error: ', error.message);
    }
  }
  if (event.target.id === 'go-login') {
    try {
      const response = await fetch('/auth/login');
      const { html } = await response.json();
      container.innerHTML = html;
    } catch (error) {
      console.log('error: ', error.message);
    }
  }
  if (event.target.id === 'getRegister') {
    const name = document.querySelector('#inputNameRegister').value
    const login = document.querySelector('#inputLoginRegister').value
    const password = document.querySelector('#inputPasswordRegister').value
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          login,
          password
        })
      });
      const { html } = await response.json();
      container.innerHTML = html;
    } catch (error) {
      console.log("🚀 ~ file: application.js ~ line 30 ~ container.addEventListener ~ error", error)
    }
  }
});