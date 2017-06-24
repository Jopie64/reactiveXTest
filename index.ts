import { Observable } from 'rxjs/rx';
import { log, logging } from './logging';
import './factorize';
//import './patternMatch'
//import './restCall'


//console.log('');

Observable
    .range(1,14)
    .map(x => x*x)
    .subscribe(log);
