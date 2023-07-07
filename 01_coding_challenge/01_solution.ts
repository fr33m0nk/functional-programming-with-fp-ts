// Note that parameter1 and parameter2 are just placeholders
//you have to set their types and also can change their names.
type ShowResult = (status: string, score: number) => void
const showResult: ShowResult = (status, score) =>
  (status === 'SUCCESS' && score === 5) ?
    console.log('Great, you got the highest possible score') :
    (status === 'SUCCESS') ? console.log(`Nice, you got ${score}`) :
      (status === 'FAILED') ? console.log('Sorry you failed') : console.log('Sorry you failed')

showResult('SUCCESS', 0)