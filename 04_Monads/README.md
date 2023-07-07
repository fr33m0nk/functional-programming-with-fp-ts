# Monads

## Monads:
- We have a certain value (a string, a number, or an object), and we put it inside that container. In several functional languages, putting the value inside the monad is called `return`. But, because `return` is a keyword in JavaScript, we’ll find various other words for it, like `of`.
- The various constructors for monads in fp-ts are called lifting functions.
- Monads define `bind` method
  - `bind` is also referred to as `flatMap` (`fp-ts` calls it `chain` )

## Functors
- Functors define `map` function

![img.png](types.png)
