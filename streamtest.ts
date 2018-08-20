import { Observable, interval } from 'rxjs';
import { log, logging } from './logging'
import { take, publishBehavior, tap } from 'rxjs/operators';


let capture = 0;
//let interval$ = Observable.interval(100);
let stream2$ = Observable.create(observer => {
    observer.next(++capture);
    observer.next(++capture);
    observer.next(++capture);
    observer.complete();
}).delay(1000);

let stream$ = interval(100).pipe(
    take(3),
    tap(_ => log('Took ' + _)));

stream$ = stream$.pipe(publishBehavior(-1));

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
*/