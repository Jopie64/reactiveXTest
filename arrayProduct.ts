import { Observable } from 'rxjs';
import { map, flatMap, toArray } from 'rxjs/operators';

// The current best implementation
export function arrayProduct(array1: Observable<number>, array2: Observable<number>): Promise<number[]> {
    return array1.pipe(
        flatMap(v1 => array2.pipe(map(v2 => v1 * v2))),
        toArray())
        .toPromise();
}
