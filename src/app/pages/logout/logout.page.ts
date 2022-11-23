import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(public navController: NavController) {
    localStorage.removeItem("user");
    this.navController.navigateForward(['login/']);
  }

  ngOnInit() {
    //localStorage.removeItem("user");
    //this.navController.navigateForward(['login/']);
  }

}
