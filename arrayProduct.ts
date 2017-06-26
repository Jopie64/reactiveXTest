import { Observable } from 'rxjs/rx';

export function arrayProduct(array1: Observable<number>, array2: Observable<number>): Promise<number[]> {
    return array1.flatMap(v1 => array2.map(v2 => v1 * v2)).toArray().toPromise();
}
