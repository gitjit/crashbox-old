import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { ICrash } from "../models/crash";
import { TopCrash } from '../models/topcrash';

@Injectable({
  providedIn: "root",
})
export class CrashService {
  private crashUrl = "https://crashbox.azurewebsites.net/api/crash";

  constructor(private http: HttpClient) {}

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured ${err.error.message}`;
    } else {
      errorMessage = `Server returned code : ${err.status}, error message is : ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // GET CRASHES
  getCrashes(pk: string, page: number): Observable<ICrash[]> {
    let api = this.crashUrl + "?" + "page=" + page + "&pk=" + pk ;
    console.log("GetCrashes : " + api);
    return this.http.get<ICrash[]>(api).pipe(
      tap((data) => {
        for (let cr of data) {
          console.log(cr._ts);
        }
      }),
      catchError(this.handleError)
    );
  }

  // GET Projects 
  getProjects():Observable<string[]>{
      let api = this.crashUrl + "?" + "qp=projects";
      console.log("GetCrashes : " + api);
      return this.http.get<string[]>(api).pipe(
            tap((data) => {
              for (let item of data) {
                console.log(item);
              }
            }),
            catchError(this.handleError)
          );
  }

  // Get LAST CRASH IN APP
  getLastCrash(pk: string): Observable<ICrash> {
    let api = this.crashUrl + "?" + "qp=latest&pk=" + pk ;
    console.log("GetLastCrash : " + api);
    return this.http.get<ICrash>(api).pipe(
      tap((data) => {
          console.log("getLastCrash : Response = " + data._ts);
      }),
      catchError(this.handleError)
    );
  }

  // Get CRASH COUNT 
  getCrashCount(pk: string): Observable<number> {
    let api = this.crashUrl + "?" + "qp=count&pk=" + pk ;
    console.log("GetCrashCount : " + api);
    return this.http.get<number>(api).pipe(
      tap((data) => {
          console.log("GetCrashCount : Response = "+ data);
      }),
      catchError(this.handleError)
    );
  }

  // GET CRASH DETAILS
  getCrashDetails(pk:string, id:string){
    let api = this.crashUrl + "?pk=" + pk + '&id=' + id;
    console.log("GetCrashDetails : " + api);
    return this.http.get<ICrash>(api).pipe(
      tap((data) => {
          console.log("GetCrashDetails : Response = "+ data);
      }),
      catchError(this.handleError)
    );
  }

  // GET TOP 10 CRASHES
  getTop10(pk:string):Observable<TopCrash[]>{
    let api = this.crashUrl + "?qp=top10&pk="+pk;
    console.log("GetTop10Crashes : " + api);
    return this.http.get<TopCrash[]>(api).pipe(
      tap((data) => {
          console.log("GetTopCrash : Response = "+ data);
      }),
      catchError(this.handleError)
    );
  }

}
