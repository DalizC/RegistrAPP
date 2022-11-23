import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/app/services/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  //user: User | undefined;
  user: any;
  loginForm: FormGroup;
  errorMsg = '';

  constructor(private usersService: UsersService, public fb: FormBuilder, public navController: NavController) {
    this.loginForm = this.fb.group({
      'user': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }
  ngOnDestroy() {

  }

  ngOnInit() {

  }

  onSubmit() {
    const formData = this.loginForm.value;

    this.usersService.getUser(formData.user).then(data => {

      if (data.password === formData.password) {
        localStorage.setItem("user", JSON.stringify(data));
        this.loginForm.reset();
        this.errorMsg = '';

        const navigationExtras: NavigationExtras = {
          queryParams: { currentUser: `${data.name} ${data.lastName}` }
        };

        this.navController.navigateForward(['home/'], navigationExtras);
      } else {
        this.errorMsg = 'Usuario y/o contraseña inválidos.'
      }
    }, (error) => {
      console.log(JSON.stringify(error));
      this.errorMsg = 'Usuario y/o contraseña inválidos.'
    });
  }

}
