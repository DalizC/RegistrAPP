import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  userName = '';
  currentUser: any;
  servicesList: any;
  constructor(private servicesService: ServicesService, public navController: NavController, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.currentUser = params['currentUser'];
    });
    this.listServices();

  }

  ngOnInit() {
  }

  listServices() {
    this.servicesService.getServices()
      .then(data => {
        this.servicesList = data;
      },
        (error) => {
          console.error(error)
        }
      );
  }

  goToPage(page: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        pageTitle: JSON.stringify(page.name)
      }
    };
    if (page.page) {
      this.navController.navigateForward([`${page.page}/`], navigationExtras);
    } else {
      this.navController.navigateForward(['service/'], navigationExtras);
    }
  };

}
