import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url = "https://63556b3a483f5d2df3b41568.mockapi.io/api/duocv1/services";

  constructor(private http: HttpClient) { }


  getServices(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url)
        .subscribe({
          next: (res) => resolve(res),
          error: (err) => reject(err),
          complete: () => console.log('complete.')
        });
    });
  }
}
