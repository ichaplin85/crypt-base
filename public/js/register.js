document.register.addEventListener('submit', async (e) => {
    e.preventDefault();
    const {
        login: {
            value: login,
        }, password: {
            value: password,
        }, email: {
            value: email,
        }, action, method,
    } = e.target;
    // if (!name || !email || !password || name.length < 3 || password.length < 1) {
    //     return alert('Имя должно быть минимум 3 символa, а пароль минимум 6 символов');
    // }
    const response = await fetch(action, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password, email }),
    });
    if (response.ok) {
        window.location = '/';
    } if (!response.ok) {
        alert('Такой email уже есть, перенаправляем на логин');
        window.location = '/login';
    }
});
