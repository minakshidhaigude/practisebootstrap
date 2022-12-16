import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private http: HttpClient) {}
  getQuestiojson() {
    //when we create json file in asset folder then is no need to use JSON-server
    // this is another way i.e in asset folder have to put particular json files
    return this.http.get<any>('assets/questions.json');
  }
}
