import { Observable } from 'rxjs/rx';
import { log } from './logging';
//import './factorize';
//import './patternMatch'
//import './restCall'
//import './tests';

import * as WebRequest from 'web-request';

interface Post {
    userId: number,
    id: number,
    title: string,
    body: string
}

interface Photo {
    id: number,
    title: string,
    url: string,
    body: string
}

const basePage = 'https://jsonplaceholder.typicode.com/';


function makeRequest<T>(uri: string): Observable<T> {
    return Observable.fromPromise(WebRequest.get(basePage + uri))
        .map(r => r.content)
        .map(c => <T>JSON.parse(c));
}

const getTitle = p => `${p.id}: ${p.title}`;
const getUrl = p => `${p.id}: ${p.url}`;
/*
makeRequest<Post[]>('posts')
    .flatMap(p => Observable.from(p))
    .map(getTitle)
    .subscribe(log);
*/

makeRequest<Post[]>('posts')
    .flatMap(p => Observable.from(p))
    .pluck<Post,number>('id')
    .scan((acc, value, index) => acc += value, 0)
    .takeLast(3)
    .subscribe(log);

makeRequest<Post>('posts/1')
    .map(getTitle)
    .subscribe(log);

makeRequest<Photo>('photos/1')
    .map(getUrl)
    .subscribe(log);
/*
Observable.range(1,5)
    .flatMap(i => makeRequest<Post>('posts/' + i))
    .map(getTitle)
    .subscribe(log);
*/
