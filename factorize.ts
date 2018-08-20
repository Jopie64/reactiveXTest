import { from } from 'rxjs';
import { log } from './logging'
import { map } from 'rxjs/operators';

function factorize(n: number):number[]{
    for (let x = 2; x < Math.sqrt(n); ++x) {
        if ( n % x === 0) {
            return [x].concat(factorize(n/x));
        }
    }
    return [n];
}

const toFactorize = [91,137,150,154];
log(`Factorize ${toFactorize}`)
from(toFactorize).pipe(
//Observable.range(1,100)
//    .map(x => Math.sqrt(x))
    map(i => ({i:i,f:factorize(i)})))
    .subscribe(log);
