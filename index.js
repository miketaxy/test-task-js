const amountInput = document.getElementById('amount');
const amountSlider = document.getElementById('amountSlider');
const periodInput = document.getElementById('period');
const periodSlider = document.getElementById('periodSlider');

const calculateForm = document.getElementById('calculate-form');
const calculateBtn = document.getElementById('calculate-btn');

const dailyPaymentDisplay = document.getElementById('dailyPayment');
const totalPaymentDisplay = document.getElementById('totalPayment');

const amountErrorDisplay = document.getElementById('amountError');
const periodErrorDisplay = document.getElementById('periodError');

const interestRate = 2.2;

//Флаги для перевірки чи користувач торкався полів введення
let amountTouched = false;
let periodTouched = false;


// Синхронізація полів введення та слайдерів
amountInput.addEventListener('input', () => {
    amountSlider.value = amountInput.value;
    if (amountInput.value === '') {
        amountSlider.value = 0;
    }
    validateForm();
});

amountSlider.addEventListener('input', () => {
    amountInput.value = amountSlider.value;
    validateForm();
});

periodInput.addEventListener('input', () => {
    periodSlider.value = periodInput.value;
    if (periodInput.value === '') {
        periodSlider.value = 0;
    }
    validateForm();
});

periodSlider.addEventListener('input', () => {
    periodInput.value = periodSlider.value;
    validateForm();
});



// Функція перевірки правильності введених даних
function validateForm() {
    const amount = parseFloat(amountInput.value);
    const period = parseFloat(periodInput.value);

    if (amount >= 1000 && amount <= 50000 && period >= 7 && period <= 60) {
        calculateBtn.disabled = false;
        return true;
    } else {
        calculateBtn.disabled = true;
        return false;
    }
}

// Функція відображення помилок
function errorHandler() {
    if (amountInput.value >= 1000 && amountInput.value <= 50000) {
        amountErrorDisplay.textContent = '';
    } else if (amountInput.value > 50000) {
        amountErrorDisplay.textContent = 'Сума кредиту не може бути більше 50000 грн';
    }
    else {
        amountErrorDisplay.textContent = 'Сума кредиту не може бути менше 1000 грн';
    }

    if (periodInput.value >= 7 && periodInput.value <= 60) {
        periodErrorDisplay.textContent = '';
    }
    else if (periodInput.value > 60) {
        periodErrorDisplay.textContent = 'Максимальний термін кредиту 60 днів';
    }
    else {
        periodErrorDisplay.textContent = 'Мінімальний термін кредиту 7 днів';
    }

}

// Функція обчислення суми кредиту
function calculateCredit() {
    const amount = parseFloat(amountInput.value);
    const period = parseFloat(periodInput.value);

    const dailyPayment = (amount + (amount * (interestRate / 100) * period)) / period;
    const totalPayment = dailyPayment * period;

    dailyPaymentDisplay.textContent = dailyPayment.toFixed(2);
    totalPaymentDisplay.textContent = totalPayment.toFixed(2);
}


// Облобка кліку на кнопку "Отримати кредит"
calculateBtn.addEventListener('click', calculateCredit);


// Обробка клавіш Enter та Escape для зручності користувача
function keyHandler(event) {
    if (event.key === 'Enter' && amountInput !== document.activeElement && validateForm()) {
        calculateCredit()
    }

    else if (event.key === 'Escape') {
        calculateForm.reset();
        amountInput.blur(); // для вирішення бага з асінхронністю флагів
        amountInput.value = '';
        amountTouched = false;
        periodTouched = false;
        amountInput.focus();
    }
    else if (event.key === 'Enter' && amountInput === document.activeElement) {
        periodInput.focus();
    }
    else if (event.key === 'Enter' && periodInput === document.activeElement) {
        amountInput.focus();
    }
}

// Додаємо обробник подій для клавіш
document.addEventListener('keydown', function (event) {
    keyHandler(event);
});


// Очищення полів введення при фокусі
amountInput.addEventListener('focus', () => {
    if (!amountTouched) {
        amountInput.value = ''; // Чистимо поле при першому касании
        amountTouched = true;   // Оновлюємо флаг
        amountSlider.value = 0;  // Синхронізуємо слайдер, щоб не гуляв по центру
    }

    validateForm();
}, true);

periodInput.addEventListener('focus', () => {
    if (!periodTouched) {
        periodInput.value = ''; // Чистимо поле при першому касании
        periodTouched = true; // Оновлюємо флаг
        periodSlider.value = 0;  // Синхронізуємо слайдер, щоб не гуляв по центру
    }

    validateForm();
}, true);


// Відображення помилок при виході з поля введення
amountInput.addEventListener('blur', () => {
    errorHandler();
});

periodInput.addEventListener('blur', () => {
    errorHandler();
});



// Виклик функції валідації при завантаженні сторінки, щоб відразу увімкнути кнопку
validateForm();