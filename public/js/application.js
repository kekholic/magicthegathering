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
});
