# 05_1 Coding Challenge: Higher-Order Function

## Problem statement

The `buyTicket` function below calculates the price of a ticket and saves the request in our mock database. The price logic is currently hardcoded, but we’d like to change it because in the future, we might prefer to ask wealthy customers to pay more. Our task is to write a `calculatePrice` function that performs the calculation that’s now hardcoded in the `buyTicket` function. It takes customer `age` as a parameter. Next, create a `buyTicketBase` function that takes one parameter called `calculate` (which is a function that takes a number and returns a number) and returns a function that takes two parameters, `show` and `customer`. It uses the `calculate` function that we passed in to retrieve the price and saves that info in the database as before. Finally, create `newBuyTicket` by passing in the `calculatePrice` function as a parameter to the `buyTicketBase` function.

```typescript
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
```

# 05_2 Coding Challenge: Using Option in Function

Write a function called `safeDivide` that takes two parameters called `value` and `divisor`, both of type `number`. If the `divisor` isn’t equal to `0`, the function divides the `value` by the `divisor` and returns the result wrapped in an option. Otherwise, the function returns an empty optional.