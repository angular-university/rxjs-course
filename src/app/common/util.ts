import {Observable} from 'rxjs';


export function createHttpObservable(url: string) {
    return Observable.create(observer => {
        fetch(url)
            .then(response => response.json())
            .then(body => {
                observer.next(body);
                observer.complete();
            })
            .catch(err => observer.error(err));
    });
}