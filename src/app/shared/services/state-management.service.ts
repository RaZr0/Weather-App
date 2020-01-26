import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router, ActivationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


interface IState {
    key: string;
    subject: BehaviorSubject<any>;
}


@Injectable({
    providedIn: 'root'
})
export class StateManagementService {
    private states: IState[] = [];

    constructor(private router: Router) {
        this.initStates();
    }

    getState<T>(key: string): BehaviorSubject<T> {
        let state = this.states.find((obs) => {
            return obs.key === key;
        });
        if (state)
            return state.subject;
        return this.addNewState(key, null).subject;
    }

    updateState<T>(key: string, data: T): Observable<any> {
        let state = this.states.find((obs) => {
            return obs.key === key;
        });
        return new Observable((obs) => {
            this.updateRouterState(key, data).then(() => {
                if (state)
                    state.subject.next(data);
                else
                    this.addNewState(key, data);
                obs.next();
            });
        });
    }

    private addNewState<T>(key: string, data: T): IState {
        const newState: IState = { key: key, subject: new BehaviorSubject(data) };
        this.states.push(newState);
        return newState;
    }


    private updateRouterState<T>(key: string, data: T): Promise<Boolean> {
        const queryParams = {};
        queryParams[key] = JSON.stringify(data);
        return this.router.navigate([], { queryParamsHandling: 'merge', queryParams: queryParams });
    }

    private initStates() {
        const sub = this.router.events.pipe(filter((e) => e instanceof ActivationEnd)).subscribe((e: ActivationEnd) => {
            Object.keys(e.snapshot.queryParams).forEach((key) => {
                const stateData = JSON.parse(e.snapshot.queryParams[key]);
                this.addNewState(key, stateData);
            });
            sub.unsubscribe();
        });
    }
}
