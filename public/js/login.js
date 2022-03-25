
document.login.addEventListener('submit', async (e) => {
    e.preventDefault();
    const {
        password: {
            value: password,
        }, email: {
            value: email,
        }, action, method,
    } = e.target;
    const response = await fetch(action, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, email }),
    });
    console.log(response);
    if (response.ok) {
        window.location = '/';
    } if (!response.ok) {
        alert('Введите правильный пароль, логин или перейдите на регистрацию');
        const addDiv = document.createElement('div');
        addDiv.style.margin = '15px';
        addDiv.style.fontSize = '20px';
        addDiv.innerHTML = `
    <a href="/register">Register</a>
    `;
        document.login.appendChild(addDiv);
    }
});
