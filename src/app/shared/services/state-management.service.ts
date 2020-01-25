// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';
// import { Router, ActivationEnd } from '@angular/router';
// import { filter } from 'rxjs/operators';
// import { KeyValue } from '@angular/common';
// import { WeatherLocation } from '../models/weather-location.model';


// interface IObserver {

//   key: string;
//   subject: Subject<any>;
// }


// @Injectable({
//   providedIn: 'root'
// })
// export class StateManagementService {
//   dictionary: any = {};
//   stateObservers: IObserver[] = [];

//   constructor(private router: Router) {
//     const sub = this.router.events.pipe(filter((e) => e instanceof ActivationEnd)).subscribe((e: ActivationEnd) => {
//       Object.keys(e.snapshot.queryParams).forEach((key) => {
//         this.dictionary[key] = JSON.parse(e.snapshot.queryParams[key]);
//       });
//       sub.unsubscribe();
//     });
//   }

//   notifyMe<T>(key: string): Subject<T> {
//     const subject = new Subject<T>();
//     this.stateObservers.push({ key: key, subject: subject });
//     return subject;
//   }


//   getState<T>(key: string): Observable<T> {
//     return new Observable((obs) => {
//       const stateData = this.dictionary[key];
//       obs.next(stateData);
//     });
//   }

//   updateState<T>(key: string, data: T) {
//     this.dictionary[key] = data;
//     this.stateObservers.forEach((obs) => {
//       if (obs.key === key)
//         obs.subject.next(data);
//     })
//     const queryParams = {};
//     queryParams[key] = JSON.stringify(data);
//     this.router.navigate([], { queryParamsHandling: 'merge', queryParams: queryParams });
//   }
// }
