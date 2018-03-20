import { Observable } from "rxjs/Observable";


export const debbugerOn = true;

Observable.prototype.debug = function(message:string){
    return this.do(
        nextValue => {
            if(debbugerOn){
                console.log(message, nextValue);
            }
        },
        error => {
            if(debbugerOn){
                console.log(message, error);
            }
        },
        () => {
            if(debbugerOn){
                console.log("Observable completed -", message);
            }
        }
    )
}

declare module 'rxjs/Observable' {
    interface Observable<T> {
        debug: (...any) => Observable<T>
    }
}