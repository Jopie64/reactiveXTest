import { Observable } from 'rxjs/rx';

export function getFirstNr(obs: Observable<number>):Promise<number> {
    return Promise.resolve(1);
}
