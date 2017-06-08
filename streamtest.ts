import { Observable } from 'rxjs/rx';
import { log, logging } from './logging'


let capture = 0;
//let interval$ = Observable.interval(100);
let stream2$ = Observable.create(observer => {
    observer.next(++capture);
    observer.next(++capture);
    observer.next(++capture);
    observer.complete();
}).delay(1000);

let stream$ = Observable
    .interval(100).take(3)
    .do(_ => log('Took ' + _));

stream$ = stream$.publishBehavior(-1);

let result1 = [];
let result2 = [];
/*
stream$.subscribe(i => {
    i;
    result1.push(i);
});

stream$.subscribe(i => {
    i;
    result2.push(i);
});

setTimeout(() => {
    stream$.subscribe(i => {
        i;
        result2.push(i);
    });
}, 250);
*/

setTimeout(() => {
    capture
    result1
    result2

}, 150);

setTimeout(() => {
    capture;
    result1;
    result2;
    logging;
}, 300);

logging;
