# Problem statement
In this challenge, rewrite the following `if\else` statement as an expression (without changing the function signature) in the function given below.

```typescript
function checkHealth(health: number) {
    if (health > 80) {
        return 'You are in good shape';
    } else {
        return 'You should work out more!';
    }
}
console.log(checkHealth(80));
```