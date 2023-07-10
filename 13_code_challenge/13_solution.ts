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

const converse = (person: Nationality) => {
  switch(person.type) {
    case 'Belgian': {
      return `${person.name} loves fries`
    }
    case 'German': {
      return `This guy loves driving in a real German ${person.favoriteCar}`
    }
    case 'American' : {
      return person.eastSide ? 'East side!' : 'West side!'
    }
    default:
      const _exhaustiveCheck: never = person;
      return _exhaustiveCheck
  }
}

const belgian: Belgian = {
  type: 'Belgian',
  name: 'Biradar',
}

const americanEast: American = {
  type: 'American',
  eastSide: true,
}

const americanWest: American = {
  type: 'American',
  eastSide: false,
}

const german: German = {
  type: 'German',
  favoriteCar: 'BMW',
}

console.log('Belgian ', converse(belgian))
console.log('German ', converse(german))
console.log('American E ', converse(americanEast))
console.log('American W ', converse(americanWest))