import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IgucaService } from '../services/iguca-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  public igucaLogo = '../../../assets/Logoconfondoblanco.jpg';
  public userInput = '';
  public passwordInput = '';

  constructor(
    private afAuth: AngularFireAuth,
    private igucaService: IgucaService,
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.userInput === '' && this.passwordInput === '') {
      return;
    }
    this.afAuth.auth.signInWithEmailAndPassword(this.userInput, this.passwordInput).then(
      (data) => {
        this.igucaService.userLogIn();
      }, (err) => {
        console.log(err);
      },
    );
  }

}
