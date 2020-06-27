import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type == "income")
      .reduce((total, transaction) => total + transaction.value, 0);

    const outcome = this.transactions
      .filter(transaction => transaction.type == "outcome")
      .reduce((total, transaction) => total + transaction.value, 0);

    const total = income - outcome;

    const balance = {
      income, outcome, total
    }

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    var transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
