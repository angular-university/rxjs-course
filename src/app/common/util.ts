import { Observable } from "rxjs";
import { Payload } from "../model/course";

export function createHttpObservable(url: string): Observable<Payload> {
  return new Observable((observer) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        observer.next(body);

        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });
  });
}
