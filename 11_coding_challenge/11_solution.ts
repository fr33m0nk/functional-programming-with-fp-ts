import {pipe} from "fp-ts/function";
import * as RT from 'fp-ts/ReaderTask'

type Dependencies = {
  bucketName: string,
  tableName: string
}

const upperCaseItAgain = (message: string) => message.toUpperCase();

// Complete the below functions

const writeToBucket = (message: string): RT.ReaderTask<Dependencies, string> =>
  (dependencies: Dependencies) =>
    () => Promise.resolve(`Wrote '${message}' to ${dependencies.bucketName}`)

const writeToTable = (message: string): RT.ReaderTask<Dependencies, string> =>
  (dependencies: Dependencies) =>
    () => Promise.resolve(`Wrote '${message}' to ${dependencies.tableName}`)

const exampleDependencies: Dependencies = {
  bucketName: 'ourBucket',
  tableName: 'ourTable'
};

const application = (message: string) => {
  return pipe(
    upperCaseItAgain(message),
    m => writeToTable(m),
    RT.chainFirst(writeToBucket),
  )(exampleDependencies)();
}

const msg= upperCaseItAgain("How are you")
// writeToBucket(msg)({bucketName: 'ourBucket',tableName: 'ourTable'})().then(res => console.log(res));
// writeToTable(msg)({bucketName: 'ourBucket',tableName: 'ourTable'})().then (res => console.log(res));

application(msg).then(res => console.log(res))
// application(msg).then(res => console.log(res))