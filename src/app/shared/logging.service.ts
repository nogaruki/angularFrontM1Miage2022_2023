import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  log(AssignmentName: any, action: any)
  {
    console.log("Assignment" + AssignmentName + " " + action);
  }
}
