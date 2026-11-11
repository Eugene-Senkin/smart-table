import {createComparison, defaultRules} from "../lib/compare.js";

// step: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // step: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
        .forEach((elementName) => {                        // Перебираем по именам
            elements[elementName].append(                    // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                    .map(name => {                        // используйте name как значение и текстовое содержимое
                        // step: создать и вернуть тег опции
                      const option =  document.createElement('option');
                      option.textContent = name;
                      option.value = name;

                      return option;
                    })
            )
        })

    return (data, state, action) => {
        // step: #4.2 — обработать очистку поля
         if (action && action.name === 'clear') {
             const input = action.parentElement.querySelector('input');
             input.value = '';
             state[action.dataset.field] = '';


    }
        // step: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}