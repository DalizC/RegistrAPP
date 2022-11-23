import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  resetForm: FormGroup;
  errorMsg = '';
  user: any;

  constructor(public fb: FormBuilder, public navController: NavController, private usersService: UsersService) {
    this.resetForm = this.fb.group({
      'newPassword1': new FormControl("", Validators.required),
      'newPassword2': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const formData = this.resetForm.value;

    this.user = JSON.parse(localStorage.getItem("user")!);

    if (formData.newPassword1 === formData.newPassword2) {
      this.usersService.getUser(this.user.email).then(data => {

        this.user.password = formData.newPassword1;

        this.usersService.updateUser(this.user.email, this.user)
          .then(data => {
            this.user = data;
            const navigationExtras: NavigationExtras = {
              queryParams: { currentUser: `${data.name} ${data.lastName}` }
            };

            this.navController.navigateForward(['home/'], navigationExtras);
          },
            (error) => {
              console.error(error)
            }
          );

      }, (error) => {
        console.log(JSON.stringify(error));
        this.errorMsg = 'Usuario y/o contraseña inválidos.'
      });
    } else {
      this.errorMsg = 'Las contraseñas no coinciden.';
    }
  }

}
