import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class RestorePage implements OnInit {

  errorMsg = '';
  user: any;
  restoreForm: FormGroup;

  constructor(public fb: FormBuilder, private usersService: UsersService, public navController: NavController) {
    this.restoreForm = this.fb.group({
      'user': new FormControl("", Validators.required),
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const formData = this.restoreForm.value;

    this.usersService.getUser(formData.user).then(data => {

      if (data) {
        this.restoreForm.reset();
        this.errorMsg = '';

        const navigationExtras: NavigationExtras = {
          queryParams: { currentUser: `${data.email}` }
        };
        localStorage.setItem("user", JSON.stringify(data));
        this.navController.navigateForward(['reset/'], navigationExtras);
      } else {
        this.errorMsg = 'Usuario no se encuentra registrado.'
      }
    }, (error) => {
      console.log(JSON.stringify(error));
      this.errorMsg = 'Usuario no se encuentra registrado.'
    });
  }

}
