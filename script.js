 2. WORK WITH MULTIPLE RECORDS (Arrays)
let totalBudget = 0;
let expenses = []; // Array to store expense objects

// 4. DOM ELEMENT REFERENCES
const budgetInput = document.getElementById("budget-input");
const setBudgetBtn = document.getElementById("set-budget-btn");
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseCategoryInput = document.getElementById("expense-category");

const totalBudgetDisplay = document.getElementById("total-budget");
const totalSpentDisplay = document.getElementById("total-spent");
const remainingBalanceDisplay = document.getElementById("remaining-balance");
const statusMessage = document.getElementById("status-message");
const expenseList = document.getElementById("expense-list");

// 5. HANDLE USER INTERACTIONS (Event Listeners)

// Set Budget Button Click
setBudgetBtn.addEventListener("click", function () {
  const enteredBudget = parseFloat(budgetInput.value);

  // 1. Decision Making: Validate budget input
  if (isNaN(enteredBudget) || enteredBudget <= 0) {
    alert("Please enter a valid budget amount greater than 0.");
    return;
  }

  totalBudget = enteredBudget;
  budgetInput.value = "";
  updateDashboard(); // 6. Connect everything together
});

// Add Expense Form Submission
expenseForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategoryInput.value;

  // 1. Decision Making: Validate expense inputs
  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Please provide a valid expense name and amount.");
    return;
  }

  // Create an expense record object and push it to the array
  const newExpense = {
    id: Date.now(), // Unique ID for deletion
    name: name,
    amount: amount,
    category: category
  };

  expenses.push(newExpense);

  // Clear form inputs
  expenseNameInput.value = "";
  expenseAmountInput.value = "";

  updateDashboard(); // 6. Connect everything together
});

// ==========================================
// 3, 4 & 6. LOOPS, DOM UPDATES & FLOW
function updateDashboard() {
  let totalSpent = 0;

  // Clear current list before re-rendering
  expenseList.innerHTML = "";

  // 3. Process Data with Loops: Calculate total & build DOM list
  for (let i = 0; i < expenses.length; i++) {
    const item = expenses[i];
    totalSpent += item.amount;

    // 4. Update the Dashboard Dynamically (Create list items)
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${item.name}</strong> (${item.category}) - $${item.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteExpense(${item.id})">Delete</button>
    `;
    expenseList.appendChild(li);
  }

  const remainingBalance = totalBudget - totalSpent;

  // Update summary numbers on the webpage
  totalBudgetDisplay.textContent = `$${totalBudget.toFixed(2)}`;
  totalSpentDisplay.textContent = `$${totalSpent.toFixed(2)}`;
  remainingBalanceDisplay.textContent = `$${remainingBalance.toFixed(2)}`;

  // Run conditional budget evaluation
  evaluateBudgetStatus(totalBudget, totalSpent, remainingBalance);
}

// 1. IMPLEMENT DECISION MAKING (Conditionals)
function evaluateBudgetStatus(budget, spent, remaining) {
  // Reset banner classes
  statusMessage.className = "status-banner";

  if (budget === 0) {
    statusMessage.textContent = "Please set a monthly budget to track your spending health.";
  } else if (remaining < 0) {
    statusMessage.textContent = `Alert: You have exceeded your budget by $${Math.abs(remaining).toFixed(2)}!`;
    statusMessage.classList.add("status-danger");
  } else if (spent >= budget * 0.8) {
    statusMessage.textContent = "Warning: You have used 80% or more of your budget.";
    statusMessage.classList.add("status-warning");
  } else {
    statusMessage.textContent = "Great job! Your spending is well within your budget.";
    statusMessage.classList.add("status-good");
  }
}

// Bonus: Allow users to delete an expense record
function deleteExpense(id) {
  // Keep only items that do not match the deleted ID
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });

  updateDashboard();
}
