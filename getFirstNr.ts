import { Observable } from 'rxjs/rx';

export function getFirstNr__(obs: Observable<number>):Promise<number> {
    return Promise.resolve(1);
}

export function getFirstNr(obs: Observable<number>):Promise<number> {
    return obs.take(1).toPromise()
        .then(i => { if (i === undefined) { throw new Error('No value received'); } return i; });
}

export function getFirstNr_(obs: Observable<number>):Promise<number> {
    return new Promise((resolve, reject) => {
        const subscription = obs.subscribe(
            value => {
                resolve(value);
                subscription.unsubscribe();
            },
            error => reject(error),
            () => reject(new Error('Completed before getting a value')))
    });
}
