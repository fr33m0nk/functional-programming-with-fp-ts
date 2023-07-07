type Customer = {
  name: string,
  age: number,
  wealthy: boolean
};

const saveInDatabase = (show: string, customer: Customer, price: number) => {
  console.log(`REGISTERED: ${customer.name} has requested  a ticket for ${show}. Price: ${price}`);
};

const buyTicket = (show: string, customer: Customer) => {
  let price = 10;

  if (customer.age > 18) {
    price = price + 10;
  }

  saveInDatabase(show, customer, price);
};

/* ------------Solution Start------------ */

type CalculatePrice = (age: number) => number
const calculatePrice: CalculatePrice = age => {
  const price = 10;
  return (age > 18) ? price + 10 : price
}

type BuyTicketBase = (calculate: (a:number) => number) => (show: string, customer: Customer) => void
const buyTicketBase: BuyTicketBase = calculate => (show, customer) => saveInDatabase(show, customer, calculate(customer.age))

type NewBuyTicket = (show: string, customer:Customer) => void
const newBuyTicket: NewBuyTicket = buyTicketBase(calculatePrice)

/* ------------Solution End------------ */

const customer: Customer = {
  name: 'Batman',
  age: 20,
  wealthy: true
}
buyTicket('Dark Night Old', customer)

newBuyTicket('Dark Night New', customer)