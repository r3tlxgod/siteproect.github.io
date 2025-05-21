document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');

    calculateBtn.addEventListener('click', () => {
        // Получение значений из полей ввода
        const age = parseFloat(document.getElementById('age').value);
        const gender = document.getElementById('gender').value;
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const activityFactor = parseFloat(document.getElementById('activity').value);

        // Элементы для вывода результатов
        const bmrResultEl = document.getElementById('bmrResult');
        const tdeeResultEl = document.getElementById('tdeeResult');
        const lossResultEl = document.getElementById('lossResult');
        const gainResultEl = document.getElementById('gainResult');
        const resultsDiv = document.getElementById('results');

        // Сброс предыдущих результатов и сообщений об ошибках
        bmrResultEl.textContent = '---';
        tdeeResultEl.textContent = '---';
        lossResultEl.textContent = '---';
        gainResultEl.textContent = '---';
        // Убираем предыдущие ошибки, если были
        const existingError = resultsDiv.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Валидация ввода
        if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
            const errorP = document.createElement('p');
            errorP.textContent = 'Пожалуйста, введите корректные числовые значения для возраста, веса и роста.';
            errorP.style.color = 'red';
            errorP.classList.add('error-message'); // Для возможного удаления
            resultsDiv.insertBefore(errorP, resultsDiv.firstChild); // Вставить ошибку перед заголовком "Результаты"
            return;
        }

        // Расчет BMR по формуле Миффлина-Сан Жеора
        let bmr;
        if (gender === 'male') {
            // Для мужчин: BMR = (10 × вес в кг) + (6.25 × рост в см) - (5 × возраст в годах) + 5
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else { // female
            // Для женщин: BMR = (10 × вес в кг) + (6.25 × рост в см) - (5 × возраст в годах) - 161
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        // Расчет TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * activityFactor;

        // Расчет для похудения и набора массы (примерно)
        const caloriesForLoss = tdee - 500;
        const caloriesForGain = tdee + 500;

        // Вывод результатов
        bmrResultEl.textContent = bmr.toFixed(0);
        tdeeResultEl.textContent = tdee.toFixed(0);
        lossResultEl.textContent = caloriesForLoss.toFixed(0);
        gainResultEl.textContent = caloriesForGain.toFixed(0);
    });
});
