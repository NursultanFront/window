import checkNumInpunts from "./checkNumInputs";

const forms = (state) => {
    const form = document.querySelectorAll("form"); // Получаем все формы
    const inputs = document.querySelectorAll("input"); // Получаем все инпуты

    checkNumInpunts('input[name="user_phone"');
    // Проверяем инпуты для того что ввели номер

    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так...",
    };

    // Создаем функцию для отправки запроса
    const postData = async (url, data) => {
        document.querySelector(".status").innerHTML = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data,
        });

        return await res.text(); // Возвращаеться текстовый формат
    };
    // Функция для очищения инпутов
    const clearInputs = () => {
        inputs.forEach((item) => {
            item.value = "";
        });
    };

    // Функция для очищение объекта State
    const clearState = () => {
        for (let key in state) {
            if (state.hasOwnProperty(key)) {
                delete state[key];
            }
        }
    };

    // На каждый форму навешиваем обработчик событий с объектом события
    form.forEach((item) => {
        item.addEventListener("submit", (e) => {
            e.preventDefault(); // Страница не будет перезагружаться

            let statusMessage = document.createElement("div"); // Создаем DIV!!  для объекта messsage
            statusMessage.classList.add("status");
            item.appendChild(statusMessage); // Помещаем div в конец формы

            // Собираем данные с форм
            const formData = new FormData(item);
            // Здесь проверяем на атрибут data calc
            if (item.getAttribute("data-calc") === "end") {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }
            // Здесь возвращаеться промис
            postData("assets/server.php", formData)
                .then((res) => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs(); // Очищаем инпуты
                    clearState();
                    // Функция для удаления элемента statusMessage со страницы
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;
