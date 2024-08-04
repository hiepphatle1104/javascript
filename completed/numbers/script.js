'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  // movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  movements: [
    { amount: 200, date: '2019-11-18T21:31:17.178Z' },
    { amount: 455.23, date: '2019-12-23T07:42:02.383Z' },
    { amount: 306.5, date: '2020-01-28T09:15:04.904Z' },
    { amount: 25000, date: '2020-04-01T10:17:24.185Z' },
    { amount: -642.21, date: '2020-05-08T14:11:59.604Z' },
    { amount: -133.9, date: '2020-05-27T17:01:17.194Z' },
    { amount: 79.97, date: '2020-07-11T23:36:17.929Z' },
    { amount: 1300, date: '2020-07-12T10:51:36.790Z' },
  ],
  interestRate: 1.2, // %
  pin: 1111,

  // movementsDates: [
  //   '2019-11-18T21:31:17.178Z',
  //   '2019-12-23T07:42:02.383Z',
  //   '2020-01-28T09:15:04.904Z',
  //   '2020-04-01T10:17:24.185Z',
  //   '2020-05-08T14:11:59.604Z',
  //   '2020-05-27T17:01:17.194Z',
  //   '2020-07-11T23:36:17.929Z',
  //   '2020-07-12T10:51:36.790Z',
  // ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  // movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  movements: [
    { amount: 5000, date: '2019-11-01T13:15:33.035Z' },
    { amount: 3400, date: '2019-11-30T09:48:16.867Z' },
    { amount: -150, date: '2019-12-25T06:04:23.907Z' },
    { amount: -790, date: '2020-01-25T14:18:46.235Z' },
    { amount: -3210, date: '2020-02-05T16:33:06.386Z' },
    { amount: -1000, date: '2020-04-10T14:43:26.374Z' },
    { amount: 8500, date: '2020-06-25T18:49:59.371Z' },
    { amount: -30, date: '2020-07-26T12:01:20.894Z' },
  ],
  interestRate: 1.5,
  pin: 2222,

  // movementsDates: [
  //   '2019-11-01T13:15:33.035Z',
  //   '2019-11-30T09:48:16.867Z',
  //   '2019-12-25T06:04:23.907Z',
  //   '2020-01-25T14:18:46.235Z',
  //   '2020-02-05T16:33:06.386Z',
  //   '2020-04-10T14:43:26.374Z',
  //   '2020-06-25T18:49:59.371Z',
  //   '2020-07-26T12:01:20.894Z',
  // ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // BANKIST APP

// // Data
// const bank_account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const bank_account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const bank_account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const bank_account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [
//   bank_account1,
//   bank_account2,
//   bank_account3,
//   bank_account4,
// ];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const formatMovementsDate = (date, locale) => {
  const calDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = (account, amount) => {
  return new Intl.NumberFormat(account.locale, {
    style: 'currency',
    currency: account.currency,
  }).format(amount);
};

const displayMovements = account => {
  containerMovements.innerHTML = '';

  account.movements.forEach((movement, i) => {
    const type = movement.amount > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(movement.date);
    const formatedDate = formatMovementsDate(date, account.locale);
    const currency = formatCurrency(account, movement.amount);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${type}</div>
        <div class="movements__date">${formatedDate}</div>
        <div class="movements__value">${currency}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const createUserNames = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

const calcDisplayBalance = account => {
  account.balance = account.movements.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  labelBalance.textContent = formatCurrency(account, account.balance);
};

const calcDisplaySummary = account => {
  const incomes = account.movements
    .filter(mov => mov.amount > 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
  labelSumIn.textContent = formatCurrency(account, incomes);

  const outcomes = account.movements
    .filter(mov => mov.amount < 0)
    .reduce((acc, curr) => acc + curr.amount, 0);
  labelSumOut.textContent = formatCurrency(account, Math.abs(outcomes));

  const interest = account.movements
    .filter(mov => mov.amount > 0)
    .map(deposit => (deposit.amount * account.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumInterest.textContent = formatCurrency(account, interest);
};

const updateUI = account => {
  // Display balance
  calcDisplayBalance(account);

  // Display movements
  displayMovements(account);

  // Display summary
  calcDisplaySummary(account);
};

let currentAccount;

// Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 1;

// Timer
let time = 300;
const timer = () => {
  const timeout = setInterval(() => {
    if (time != 0) {
      let minutes = String(Math.floor(time / 60)).padStart(2, 0);
      let seconds = String(time % 60).padStart(2, 0);

      labelTimer.textContent = `${minutes}:${seconds}`;
      time--;
    } else {
      clearInterval(timeout);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
  }, 1000);
};

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  const loginUser = inputLoginUsername.value;
  const loginPin = +inputLoginPin.value;

  currentAccount = accounts.find(account => account.username === loginUser);

  if (currentAccount?.pin === loginPin) {
    console.log('Login successful', currentAccount.owner);

    // Welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // Date
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    const locale = currentAccount.locale;
    const date = setInterval(() => {
      const now = new Date();
      labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(
        now
      );
    }, 1000);

    // Date and timer
    timer();

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();

    // Display UI
    containerApp.style.opacity = 1;

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiver = accounts.find(acc => acc.username === inputTransferTo.value);

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiver?.username !== currentAccount.username
  ) {
    const receiverMov = { amount: amount, date: new Date().toISOString() };

    const currentMov = { amount: -amount, date: new Date().toISOString() };

    // Add movement
    receiver.movements.push(receiverMov);
    currentAccount.movements.push(currentMov);

    // Update UI
    updateUI(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = '';
});

btnClose.addEventListener('click', e => {
  e.preventDefault();

  const username = inputCloseUsername.value;
  const pin = +inputClosePin.value;
  inputCloseUsername.value = inputClosePin.value = '';

  if (currentAccount.username === username && currentAccount.pin === pin) {
    // Delete account
    const index = accounts.findIndex(
      account => account.username === currentAccount.username
    );
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    // Disable welcome message
    labelWelcome.textContent = 'Log in to get started';
  }
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';

  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov.amount >= amount * 0.1)
  ) {
    // Add loan to balance
    const currentMov = { amount: amount, date: new Date().toISOString() };
    currentAccount.movements.push(currentMov);

    // Update UI
    updateUI(currentAccount);
  }
});

let sorted = true;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  if (sorted) {
    currentAccount.movements.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    displayMovements(currentAccount);
  } else {
    currentAccount.movements.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    displayMovements(currentAccount);
  }
  sorted = !sorted;
});
