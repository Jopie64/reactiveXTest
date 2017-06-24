import { Observable } from 'rxjs/rx';
import { log } from './logging'

interface Circle {
    kind: 'circle';
    radius: number;
}

interface Square {
    kind: 'square';
    sidelength: number;
}

type Shape = Circle | Square;

function area(shape: Shape): number {
    switch(shape.kind) {
        case 'circle': return 3.14 * shape.radius * shape.radius;
        case 'square': return shape.sidelength * shape.sidelength;
    }
}

const result = [0,1,2,3,4,5]
//    .map(i => i % 2 === 0 ? { radius: i } : { sidelength: i })
    .map((i):Shape => i % 2 === 0 ?
        { kind: 'circle', radius: i } :
        { kind: 'square', sidelength: i })
    .map(area);

console.log(result);


class CircleImpl implements Circle {
    kind: 'circle';
    constructor(public radius: number){}
}

//Observable.return()
Observable.interval(500)
    .take(6)
//    .map(i => i % 2 === 0 ? <Circle> { radius: 3 } : {kind: 'square', sidelength: 4})
//    .map(i => i % 2 === 0 ? new CircleImpl(3) : {kind: 'square', sidelength: 4})
//    .map(i => i % 2 === 0 ? { kind: 'circle', radius: 3 } : { kind: 'square', sidelength: 4 })
//    .map(i => ({ kind: <'square'>'square', sidelength: 3 }))
    .map((i):Shape => i % 2 === 0 ?
        { kind: 'circle', radius: i }:
        { kind: 'square', sidelength: i })
    .map(area)
    .map(i => `Bla ${i}`)
    .subscribe(log);

let obj: Shape = { kind: 'circle', radius: 3 };
