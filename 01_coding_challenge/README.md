# Coding Challenge: Rewriting Function with Better Types

## Problem statement 

We’ve added some imperfect TypeScript types to the function below, which takes two arguments. We’ve discovered that status can only have the values `SUCCESS` and `FAILED` and that scores are always numbers. The function below allows many illegal parameter types, such as `showResult('fake', 'fake')`, to compile when they shouldn’t. Our task in this challenge is to rewrite this function with better types.

```javascript
function showResult(status: string, score: any) {
    if (status === 'SUCCESS' && score === 5) {
        console.log('Great, you got the highest possible score');
    } else if (status === 'SUCCESS') {
        console.log(`Nice, you got ${score}`);
    } else if (status === 'FAILED') {
        console.log('Sorry you failed');
    }
}
showResult('fake', 'fake');
```