let Rx = require('./node_modules/rxjs/rx')

//console.log('');

let capture = 0;
//let interval$ = Rx.Observable.interval(100);
let stream2$ = Rx.Observable.create(observer => {
    observer.next(++capture);
    observer.next(++capture);
    observer.next(++capture);
    observer.complete();
}).delay(1000);

let stream$ = Rx.Observable
    .range(0,3)
    .do(_ => ++capture)
    .delay(100);

stream$ = stream$.share();

let result1 = [];
let result2 = [];

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

}, 200);

setTimeout(() => {
    capture
    result1
    result2

}, 300);

//Rx.Observable.return()
