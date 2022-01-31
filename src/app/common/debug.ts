import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export const debug =
  (level: number, message: string) => (source: Observable<any>) =>
    source.pipe(
      tap((val) => {
        console.log(message + ": " + val);
      })
    );
