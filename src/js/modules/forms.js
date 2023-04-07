
const forms = () => {
    const allForms = document.querySelectorAll('form');
    const inputs = document.querySelectorAll('input');
    const phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach((input) => {
        input.addEventListener('input', () => {
            input.value = input.value.replace(/\D/, '');
        });
    })

    const message = {
        loading: 'загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
        });

        return await response.text();
    }

    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = '';
        });
    }

    allForms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.appendChild(statusMessage);

            const formData = new FormData(form);
            postData('https://simple-server-cumz.onrender.com/api/data', formData)
                .then(response => {
                    console.log(response);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 10000);
                })
        });
    });
};

export default forms;
