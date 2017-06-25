import { Observable } from 'rxjs/rx';
import { log } from './logging';

import { getFirstNr } from './getFirstNr';

const expect = exp => value => {
    if (exp != value) {
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

const tests = [
    testGetFirstNr1,
    testGetFirstNr2,
];

function runTests() {
    Promise.all(tests.map(test => test()))
        .then(results => results.reduce((p,c) => c ? p : p + 1, 0))
        .then(failures => failures == 0 ?
            console.log("All tests succeeded") :
            console.error(`${failures} tests failed`));
}

runTests();
