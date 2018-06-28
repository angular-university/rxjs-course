
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export enum RxJsLoggingLevel {
    TRACE,
    DEBUG,
    INFO,
    ERROR
}

let rxjsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
    rxjsLoggingLevel = level;
}


export const debug = (level: number, message:string) =>
    (source: Observable<any>) => source
        .pipe(
            tap(val => {

                if (level >= rxjsLoggingLevel) {
                    console.log(message + ': ', val);
                }
            })
        );