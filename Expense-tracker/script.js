const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit", addTransaction);

function addTransaction(e) {
  e.preventDefault(); // this doesen't allow browser to reload on submit press

  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value.trim());

  console.log(description, amount);

  transactions.push({ id: Date.now(), description, amount });

  localStorage.setItem("transactions", JSON.stringify(transactions));

  updateUI();
  updateSummary();

  transactionFormEl.reset();
}

function updateUI(e) {
  let transactionItems = transactions.reverse();

  transactionItems.forEach((value, index, array) => {
    const listItems = createListItems(value);
    transactionListEl.appendChild(listItems);
  });
}

const createListItems = (value) => {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(value.amount < 0 ? "expense" : "income");
  //creating dynamic html
  li.innerHTML = `<span>${value.description}</span><span>${formatCurrency(
    value.amount
  )}<button class="delete-btn" onclick="deleteTransaction(${
    value.id
  })">x</button><span/>`;
  return li;
};

function updateSummary() {
  const balance = transactions?.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const income = transactions
    ?.filter((trans) => trans.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions
    ?.filter((trans) => trans.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expense);
}

function deleteTransaction(id) {
  let deletedtransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );
  localStorage.setItem("transactions", JSON.stringify(deletedtransactions));
  updateSummary();
  updateUI();
}
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

updateUI();
updateSummary();
