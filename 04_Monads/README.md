# Monads

## Monads:
- We have a certain value (a string, a number, or an object), and we put it inside that container. In several functional languages, putting the value inside the monad is called `return`. But, because `return` is a keyword in JavaScript, we’ll find various other words for it, like `of`.
- The various constructors for monads in fp-ts are called lifting functions.
- Monads define `bind` method
  - `bind` is also referred to as `flatMap` (`fp-ts` calls it `chain` )

## Functors
- Functors define `map` function

![img.png](types.png)

## Few good rules

Monads help us be more explicit about what a function will do and return. For example:
- If a function has an `effect`, it’s wrapped in an `IO monad`
- If a function is `async`, it’s wrapped in an `Async` or `Task` monad (both these names and others are used).
- If the function has a `failure` path, an `Either` monad will be used.
- If some `value might not exist` inside the function, `Option` monad will be used.
- If a function does `two or more of the things mentioned` above, we’ll use `monad transformers`.


