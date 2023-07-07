type CheckHealth = (health: number) => string
const checkHealth: CheckHealth = health => (health > 80) ? 'You are in good shape' : 'You should work out more!'

console.log(checkHealth(80));