import { Component, OnInit } from '@angular/core';
import {AuthGuard} from "../../shared/auth.guard";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private authGuard: AuthGuard, private router: Router) { }

  ngOnInit(): void {
    if(this.authGuard.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

}
