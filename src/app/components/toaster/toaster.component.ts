import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastEvent } from 'src/app/models/toast-event';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
})

//this component is our toast container
// it holds our toasts alert one on the top of the other
export class ToasterComponent implements OnInit {
  currentToasts: ToastEvent[] = [];
  subscription!: Subscription;

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscribeToToasts();
  }

  // subscribe to catch toast events
  subscribeToToasts() {
    this.subscription = this.toastService.toastEvents.subscribe((toasts) => {
      //add new toast
      const currentToast: ToastEvent = {
        type: toasts.type,
        title: toasts.title,
        message: toasts.message,
      };
      this.currentToasts.push(currentToast);
      this.cdr.detectChanges();
    });
  }

  //dispose toast
  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }
}
