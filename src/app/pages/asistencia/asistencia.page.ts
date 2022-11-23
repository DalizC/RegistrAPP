import { Component, OnDestroy, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { NavController } from '@ionic/angular';
import { CoursesService } from 'src/app/services/courses.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit, OnDestroy {
  scannedResult: any;
  content_visibility = '';
  coursesList: any;
  currentAssistance = 0;
  currentUser: any;
  errorMsg = '';

  constructor(private coursesService: CoursesService, public navController: NavController, private usersService: UsersService) {
    this.listCourses();
    const currentUser = JSON.parse(localStorage.getItem("user")!);
    this.currentAssistance = Number.parseInt(currentUser.asistencia);
  }

  getCourse(id: string) {
    this.coursesService.getCourse(id)
      .then(data => {
        this.coursesList = data;
        console.log(data);
      },
        (error) => {
          console.error(error)
        }
      );
  }

  ngOnInit() {
  }

  listCourses() {
    this.coursesService.getCourses()
      .then(data => {
        this.coursesList = data;
        console.log(data);
      },
        (error) => {
          console.error(error)
        }
      );
  }

  async checkPermission() {
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user granted permission
        return true;
      }
      return false;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async startScan() {
    try {
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.querySelector('body')!.classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log(result);
      BarcodeScanner.showBackground();
      document.querySelector('body')!.classList.remove('scanner-active');
      this.content_visibility = '';
      if (result?.hasContent) {
        this.scannedResult = JSON.parse(result.content!);
        console.log(this.scannedResult);

        this.coursesService.getCourse(this.scannedResult.id).then(data => {

          if (data.id) {
            this.currentUser = JSON.parse(localStorage.getItem("user")!);
            this.currentUser.asistencia = Number.parseInt(this.currentUser.asistencia) + 1;
            this.currentAssistance = this.currentUser.asistencia;

            this.usersService.updateUser(this.currentUser.email, this.currentUser)
              .then(data => {
                this.currentUser = data;
                localStorage.setItem("user", JSON.stringify(this.currentUser));
              },
                (error) => {
                  console.error(error)
                  this.errorMsg = 'Error en el procesamiento del código.'
                }
              );
            this.errorMsg = 'Asistencia actualizada.'
            //this.navController.navigateForward(['asistencia/']);
          } else {
            this.errorMsg = 'Código QR inválido.'
          }
        }, (error) => {
          console.log(JSON.stringify(error));
          this.errorMsg = 'Código QR inválido.'
        });



      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }

  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')!.classList.remove('scanner-active');
    this.content_visibility = '';
  }

  ngOnDestroy(): void {
    this.stopScan();
  }

}
