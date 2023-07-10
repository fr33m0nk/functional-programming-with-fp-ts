type Dollar = {
  _type: 'dollar'
}
type Euro = {
  _type: 'euro'
}

type Currency = Dollar | Euro;

type Money = {
  amount: number,
  currency: Currency,
}

export const dollars = (amount: number): Money => ({
  amount,
  currency: {
    _type: 'dollar',
  }
});

export const euros = (amount: number): Money => ({
  amount,
  currency: {
    _type: 'euro',
  }
});

export function count(...ms: Money[]) {
  return ms.reduce((acc, curr) => {
    if (curr.currency._type === 'dollar') {
      acc.dollars += curr.amount;
    } else {
      acc.euros += curr.amount;
    }
    return acc;
  }, {dollars: 0, euros: 0});
}