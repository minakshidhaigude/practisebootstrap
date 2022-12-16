import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  public name: string = '';
  public questionList: any = [];
  currentQuestion: number = 0; //user is attempting the question from questionList[]
  points: number = 0;
  counter = 60;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  interval$: any;
  progress: string = '0';
  isQuizCompleted: boolean = false;
  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    //this localStorage value should not be null so use !
    this.name = localStorage.getItem('name')!;
    this.getAllQuestions();
    // for refreshQuiz() working we have tio intialize/start the counter
    this.startCounter();
  }
  getAllQuestions() {
    this.questionService.getQuestiojson().subscribe((res) => {
      this.questionList = res.questions;
      console.log('questions...', res);
    });
  }
  nextQuestion() {
    // initially currentQuestion is 0 so increment it
    this.currentQuestion++;
  }
  previousQuestion() {
    this.currentQuestion--;
  }
  answer(currentQuestion: number, option: any) {
    //to check if isQuizCompleted or not
    if (currentQuestion === this.questionList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      // to show the change-bg use SetTimeout()
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        // if answer is correct show progress bar status
        this.getProgressPercent();
      }, 1000);
    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
        this.resetCounter();
        // if answer is wrong show progress bar status
        this.getProgressPercent();
      }, 1000);
      this.points -= 10;
    }
  }
  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter === 0) {
        this.currentQuestion++;
        this.counter = 60;
        this.points -= 10;
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 600000);
  }
  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }
  resetCounter() {
    this.stopCounter();
    this.counter = 60;
    this.startCounter();
  }
  resetQuiz() {
    this.resetCounter();
    this.getAllQuestions();
    this.points = 0;
    this.counter = 60;
    this.currentQuestion = 0;
    this.progress = '0';
  }
  getProgressPercent() {
    this.progress = (
      (this.currentQuestion / this.questionList.length) *
      100
    ).toString();
    return this.progress;
  }
}
