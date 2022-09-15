import { Component, OnInit } from '@angular/core';
import { Caisse } from 'src/app/models/caisse';
import { HttpService } from 'src/app/services/http.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpParams } from '@angular/common/http';
import { AppConstants } from 'src/app/config/app-constants';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-caisses-list',
  templateUrl: './caisses-list.component.html',
  styleUrls: ['./caisses-list.component.css'],
})
export class CaissesListComponent implements OnInit {
  form!: FormGroup;
  closeResult!: string;
  caisses: Caisse[] = [];
  isSubmited: boolean = false;
  title: String = 'Bruilard de caisse';
  headers: String[] = [
    'libelle',
    'amountIn',
    'amountOut',
    'operationDate',
    'solde',
  ];

  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
    private exportService: ExportService
  ) {}

  ngOnInit(): void {
    // instanciate a form
    this.form = this.formBuilder.group({
      // set the default end date to this day
      end: [new Date().toISOString().substring(0, 10), Validators.required],
      // set the default start date to a month before today
      start: [
        new Date(new Date().setMonth(new Date().getMonth() - 1))
          .toISOString()
          .substring(0, 10),
        Validators.required,
      ],
    });

    this.getCaisses(this.form.value);
  }

  get errorControl() {
    return this.form.controls;
  }

  getCaisses(dates: any) {
    // set the header of the page
    this.title = `Bruilard de caisse ${dates.start} - ${dates.end} `;

    // add start and end date to the request
    const params = new HttpParams()
      .set('start', dates.start)
      .set('end', dates.end);

    //get data from server and handle response
    this.httpService.authGet(AppConstants.caisseByPeride, params).subscribe({
      next: (data: any) => {
        if (data.body.length > 0) {
          console.log('1st scenario !');

          this.caisses = data.body.map((item: any) => {
            item.operationDate = new Date(item.operationDate);
            return item;
          });
        } else {
          console.log('2nd scenario !');
          this.caisses = data.body;
        }
        console.log(this.caisses.length);
      },
      error: (error) => {
        // console.log(error)
        this.toastService.showErrorToast(
          'Erreurs de Serveur',
          'Problème de connexion avec le serveur !'
        );
      },
    });
  }

  // get the selected periode's caisses
  submitForm() {
    this.isSubmited = true;
    if (this.form.valid) {
      console.log('Front end validation succeeded !');
      this.getCaisses(this.form.value);
    } else {
      console.log('Front end validation failed !');
      console.log('Please provide all the required values!');
      this.toastService.showErrorToast(
        'Erreurs de validation',
        'vérifier que tous les dates sont valides'
      );
    }
  }

  // open a modal to confirm delete option
  open(content: any, domaineProviderId: any) {
    this.modalService
      .open(content, { centered: true, backdrop: false })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result === 'yes') {
            console.log('delete clicked');
            this.deleteData(domaineProviderId);
          }
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  // get the modal dismiss reason
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // delete a specific caisse
  deleteData(id: any) {
    this.httpService.authDelete(`${AppConstants.caisse}/${id}`).subscribe({
      next: (resp) => {
        console.log('caisse deleted succesfully !');
        this.toastService.showSuccessToast(
          'Succes!',
          'Ppération a été bien supprimer'
        );
        this.ngOnInit(); // this.router.navigate(['/dashboard/all-server-providers']);
      },
      error: (error) => {
        console.log('success , ', error);
        this.toastService.showErrorToast(
          'Oops!',
          'impossible de supprimer cette operation'
        );
      },
    });
  }

  //check for validation errors
  checkTrue(controlName: string, errorName: string): boolean {
    return (
      this.isSubmited && this.errorControl[controlName].errors?.[errorName]
    );
  }

  // print the list of data if exists
  print() {
    if (this.caisses.length > 0) {
      window.print();
    } else {
      this.toastService.showErrorToast(
        "Impossible d'imprimer",
        "Oops, il n'y a aucune donnée a imprimer !"
      );
    }
  }

  //download selected periode's data if exists
  downloadCSV() {
    if (this.caisses.length > 0) {
      this.exportService.csvDownload(this.caisses, this.headers);
    } else {
      this.toastService.showErrorToast(
        "Impossible d'imprimer",
        "Oops, il n'y a aucune donnée a exporter !"
      );
    }
  }
}
