import checkNumInpunts from "./checkNumInputs";

const changeModalState = (state) => {
    const windowForm = document.querySelectorAll(".balcon_icons_img"); // Получаем span 4 окна
    const windowWidth = document.querySelectorAll("#width"); // Получаем инпут ширины
    const windowHeight = document.querySelectorAll("#height"); // Получаем инпут высоты
    const windowType = document.querySelectorAll("#view_type"); // Получаем тип окна (select, то есть выбор)
    const windowProfile = document.querySelectorAll(".checkbox"); // Получаем два чекбокса (холодное и теплое)

    checkNumInpunts("#width");
    checkNumInpunts("#height");

    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                switch (item.nodeName) {
                    case "SPAN":
                        state[prop] = i;
                        break;
                    case "INPUT":
                        if (item.getAttribute("type") === "checkbox") {
                            i === 0
                                ? (state[prop] = "Холодное")
                                : (state[prop] = "Теплое"); // если индекс псевдомассива checkbox будет 0, то это будет холодная, а если 1 то теплое
                            elem.forEach((box, k) => {
                                // Получаем все чекбоксы
                                box.checked = false; // Ставим все чекбоксы false, а затем тот который обозначил пользователь i мы ставим true
                                if (i == k) {
                                    box.checked = true;
                                }
                            });
                        } else {
                            state[prop] = item.value; // Если это инпут то просто присваеваем ему значение
                        }
                        break;
                    case "SELECT":
                        state[prop] = item.value; // Если это select то тоже присваеваем значение
                        break;
                }

                console.log(state);
            });
        });
    }
    bindActionToElems("click", windowForm, "form");
    bindActionToElems("input", windowHeight, "height");
    bindActionToElems("input", windowWidth, "width");
    bindActionToElems("change", windowType, "type");
    bindActionToElems("change", windowProfile, "profile");
};

export default changeModalState;
