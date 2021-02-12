const checkNumInpunts = (selector) => {
    const numInputs = document.querySelectorAll(selector);
    // Проверяем инпуты для того что ввели номер
    numInputs.forEach((item) => {
        item.addEventListener("input", () => {
            item.value = item.value.replace(/\D/, "");
        });
    });
};

export default checkNumInpunts;
