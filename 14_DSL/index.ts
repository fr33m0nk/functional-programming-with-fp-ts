import {count, dollars, euros} from './bank_dsl'

console.log(count(
  dollars(2),
  euros(5),
  dollars(1),
))