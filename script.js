// Variables
let balance = 0;
const balanceElement = document.getElementById("balance");
const transactionHistoryElement = document.getElementById("transactionHistory");
const amountInput = document.getElementById("amount");

// Function to update the balance and transaction history
function updateWallet() {
    balanceElement.innerText = balance;

    // Update transaction history
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactionHistoryElement.innerHTML = '';
    transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        listItem.innerText = `${transaction.type} of ₹${transaction.amount}`;
        transactionHistoryElement.appendChild(listItem);
    });
}

// Function to handle deposit
document.getElementById("depositBtn").addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    if (amount > 0) {
        balance += amount;
        saveTransaction("Deposit", amount);
        amountInput.value = ""; // Clear the input field
        updateWallet();
    } else {
        alert("Please enter a valid amount.");
    }
});

// Function to handle withdrawal
document.getElementById("withdrawBtn").addEventListener("click", () => {
    const amount = parseFloat(amountInput.value);
    if (amount > 0 && amount <= balance) {
        balance -= amount;
        saveTransaction("Withdraw", amount);
        amountInput.value = ""; // Clear the input field
        updateWallet();
    } else {
        alert("Please enter a valid amount or ensure you have sufficient balance.");
    }
});

// Function to save transactions in localStorage
function saveTransaction(type, amount) {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({ type, amount });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Initial call to update the wallet on page load
updateWallet();
