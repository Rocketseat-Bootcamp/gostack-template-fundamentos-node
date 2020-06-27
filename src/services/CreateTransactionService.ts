import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    var balance = this.transactionsRepository.getBalance();
    if (value > balance.total && type == "outcome")
      throw Error("Não possível fazer uma retirada com o valor solicitado.")

    return this.transactionsRepository.create({ title, value, type })
  }
}

export default CreateTransactionService;
