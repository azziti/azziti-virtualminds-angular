import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isSubmited: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService,
    private storageService: StorageService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get errorControl() {
    return this.form.controls;
  }

  //check if form is valid then submit
  submitForm() {
    this.isSubmited = true;
    if (this.form.valid) {
      console.log('Front end validation succeeded !');
      this.login(this.form.value);
    } else {
      console.log('Front end validation failed !');
      console.log('Please provide all the required values!');
      this.toastService.showErrorToast(
        'Validation errors',
        'Please make sure that all fields are valid'
      );
    }
  }

  //send login request to the server
  login(user: any) {
    console.log('trying to connect ...');
    this.auth.login(user).subscribe({
      next: (resp) => {
        console.log(resp);
        const token = resp.headers.get('Authorization');
        if (token !== null) {
          this.storageService.saveToken(token);
          this.toastService.showSuccessToast(
            'Succès !',
            'Vous êtes bien connectés !'
          );
          this.router.navigate(['dashboard']);
        }
      },
      error: (error) => {
        console.log('Connexion with the server failed !');
        const status = error.status;
        console.log(`error status ${status}`);

        if (status == 403) {
          this.toastService.showErrorToast(
            'Données invalides',
            "Nom d'utilisateur ou mot de passe incorrect"
          );
        } else {
          this.toastService.showErrorToast(
            'Erreur',
            'Veuillez réessayer plus tard. '
          );
        }
      },
    });
  }

  //check for validation errors
  checkTrue(controlName: string, errorName: string): boolean {
    return (
      this.isSubmited && this.errorControl[controlName].errors?.[errorName]
    );
  }
}
