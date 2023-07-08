import {flow} from "fp-ts/function";

type BasicPerson = {
  name: string,
};

type PersonWithAge = BasicPerson & {
  age: number,
};

type PersonWithAgeAndCountry = PersonWithAge & {
  country: string,
}

const buildBasicPerson = (name: string): BasicPerson => ({
  name,
});

const enrichWithAge = (person: BasicPerson): PersonWithAge => ({
  ...person,
  age: person.name.length,
});

const enrichWithCountry = (person: PersonWithAge): PersonWithAgeAndCountry => ({
  ...person,
  country: 'Frediano',
});

// Complete the below function
const application = (name: string): PersonWithAgeAndCountry => {
  return flow(
    buildBasicPerson,
    enrichWithAge,
    enrichWithCountry
  )(name)
}

console.log(application("Ali"));