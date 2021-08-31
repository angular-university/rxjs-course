import { Observable } from "rxjs";

export function createHttpObservable(url: string) {
  return new Observable(observer => {
    fetch('/api/courses')
      .then(response => {
        return response.json();
      })

      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      });
  });
}
