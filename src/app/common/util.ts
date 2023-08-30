import { Observable } from "rxjs";

export function createHttpObservable(url: string): Observable<string> {
  return new Observable((observer) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((error) => {
        observer.error(error);
      });
  });
}
