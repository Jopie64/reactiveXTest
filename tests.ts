import { interval, range, empty, from, throwError } from 'rxjs';
import { log } from './logging';

import { getFirstNr } from './getFirstNr';
import { arrayProduct } from './arrayProduct';
import { trueIn3Seconds_Promise,
         trueIn3Seconds_Observable,
         produce2468,
         printNewValue } from './reactiveXReplacingPatterns'
import { take, map } from 'rxjs/operators';

const expect = exp => value => {
    if (JSON.stringify(exp) !== JSON.stringify(value)) {
        console.error(`Expected value to be ${exp}, but it was found to be ${value}`);
        return false;
    }
    return true;
}

// **** testGetFirstNr1

function testGetFirstNr1() : Promise<boolean> {
    return getFirstNr(interval(100).pipe(take(10)))
        .then(expect(0));
}

function testGetFirstNr2() : Promise<boolean> {
    return getFirstNr(range(3,10))
        .then(expect(3));
}

function testGetFirstNr3(): Promise<boolean> {
    return getFirstNr(empty())
        .then(expect(undefined));
}

function testGetFirstNr4(): Promise<boolean> {
    return getFirstNr(throwError(new Error('Just an error')))
        .then(v => { log(`Not expecting a value but got ${v}`); return false; })
        .catch(_ => true); // Expect failure
}


// **** testArrayProduct1

function testArrayProduct1(): Promise<boolean> {
    return arrayProduct(from([5,10]), from([1,2]))
        .then(expect([5,10,10,20]));
}

function testArrayProduct2(): Promise<boolean> {
    return arrayProduct(from([1,2,3,4]), from([1,2,3,4]))
        .then(expect([1,2,3,4,2,4,6,8,3,6,9,12,4,8,12,16]));
}

function testArrayProduct3(): Promise<boolean> {
    return arrayProduct(from([1,2]), from([10,100,1000]))
        .then(expect([10,100,1000,20,200,2000]));
}


function testObsAsPromise1(): Promise<boolean> {
    return trueIn3Seconds_Promise();
}

function testObsAsPromise2(): Promise<boolean> {
    return trueIn3Seconds_Observable();
}

function testObsAsStream(): Promise<boolean> {
    return produce2468().then(x => JSON.stringify(x) === "[2,4,6,8]");
}

function testPrintNewValue(): Promise<boolean> {
    return printNewValue();
}

const tests = [
    testGetFirstNr1,
    testGetFirstNr2,
    testGetFirstNr3,
    testGetFirstNr4,
    testArrayProduct1,
    testArrayProduct2,
    testArrayProduct3,
    testObsAsPromise1,
    testObsAsPromise2,
    testObsAsStream,
    testPrintNewValue
];

function runTests() {
    Promise.all(tests.map(test => test()))
        .then(results => results.reduce((p,c) => c ? p : p + 1, 0))
        .then(failures => failures === 0 ?
            console.log("All tests succeeded") :
            console.error(`${failures} tests failed`))
        .catch(e => log(`Things went wrong. ${e}`));
}

runTests();
