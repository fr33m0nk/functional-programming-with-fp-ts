# Coding Challenge: Writing Function Using Switch

## Problem statement

Write a function called `converse` that takes one parameter of type `Nationality` and uses a `switch` to return a suitable message based on the nationality of the person:

- For a `Belgian`: `x loves fries` (x being his name).
- For a `German`: `This guy loves driving in a real German y` (y being his favorite kind of car).
- For an `American`: `East side!` if he likes the east side; otherwise, `West side!`.


```typescript
type Belgian = {
  type: 'Belgian',
  name: string,
};

type German = {
  type: 'German',
  favoriteCar: string,
};

type American = {
  type: 'American',
  eastSide: boolean,
};

type Nationality = Belgian | German | American;
// Write your code below

```