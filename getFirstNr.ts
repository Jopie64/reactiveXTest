import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export function getFirstNr_PlainWrong(obs: Observable<number>):Promise<number> {
    return Promise.resolve(1);
}

export function getFirstNr_LastNr(obs: Observable<number>):Promise<number> {
    return obs.toPromise();
}

export function getFirstNr_Naive(obs: Observable<number>):Promise<number> {
    return new Promise((resolve, reject) => {
        const subscription = obs.subscribe(
            value => {
                resolve(value);
                subscription.unsubscribe();
            },
            error => reject(error),
            () => resolve(undefined));
    });
}

// The current best implementation
export function getFirstNr(obs: Observable<number>):Promise<number> {
    return obs.pipe(take(1)).toPromise();
}
