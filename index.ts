import { Observable } from 'rxjs/rx';
import { log, logging } from './logging'
//import './patternMatch'
//import './restCall'


//console.log('');

Observable
    .range(1,14)
    .map(x => x*x)
    .subscribe(log);

function factorize(n: number):number[]{
    let result: number[] = [];
    for (let x = 2; x < Math.sqrt(n); ++x) {
        if ( n % x === 0) {
            result.push(x);
            result.concat(factorize(n/x));
        }
    }
    return result;
}

[91,137,150,154]
//    .map(x => Math.sqrt(x))
    .map(factorize)
    .forEach(log);
