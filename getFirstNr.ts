import { Observable } from 'rxjs/rx';

export function getFirstNr__(obs: Observable<number>):Promise<number> {
    return Promise.resolve(1);
}

export function getFirstNr_(obs: Observable<number>):Promise<number> {
    return obs.first().toPromise();
}

export function getFirstNr(obs: Observable<number>):Promise<number> {
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
