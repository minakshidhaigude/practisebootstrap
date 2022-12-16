import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  postSignupUsers(data: any) {
    return this.http.post<any>('http://localhost:3000/signupUsers', data);
  }
  getLogin() {
    return this.http
      .get<any>('http://localhost:3000/signupUsers')
      .pipe(catchError(this.handleError));
  }
  handleError(err: any) {
    // if(err instance of HttpErrorResponse) {
    //   //server side error
    // } else{
    //   //this is client side error
    // }
    return throwError(err);
  }
  postEmployee(data: any) {
    return this.http.post<any>('http://localhost:3000/posts', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getEmployee() {
    return this.http.get<any>('http://localhost:3000/posts').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateEmployee(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/posts/' + id, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  deleteEmployee(id: number) {
    return this.http.delete<any>('http://localhost:3000/posts/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
