import { Observable } from 'rxjs/rx';
import { log } from './logging';

import { getFirstNr } from './getFirstNr';

const expect = exp => value => {
    if (exp !== value) {
        console.error(`Expected value to be ${exp}, but it was found to be ${value}`);
        return false;
    }
    return true;
}

function testGetFirstNr1() : Promise<boolean> {
    return getFirstNr(Observable.interval(1000))
        .then(expect(0));
}

function testGetFirstNr2() : Promise<boolean> {
    return getFirstNr(Observable.range(3,10))
        .then(expect(3));
}

function testExpectException(obs: Observable<number>): Promise<boolean> {
    return getFirstNr(obs)
        .then(v => { log(`Not expecting a value but got ${v}`); return false; })
        .catch(_ => true); // Expect failure
}

function testGetFirstNr3(): Promise<boolean> {
    return testExpectException(Observable.empty());
}

function testGetFirstNr4(): Promise<boolean> {
    return testExpectException(Observable.throw(new Error('Just an error')));
}

const tests = [
    testGetFirstNr1,
    testGetFirstNr2,
    testGetFirstNr3,
    testGetFirstNr4
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
