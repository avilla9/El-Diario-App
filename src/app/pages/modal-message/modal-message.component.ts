import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss'],
})
export class ModalMessageComponent implements OnInit {
  message;

  constructor(
    private modalController: ModalController,
  ) { }

  ngOnInit() { }

  close() {
    this.modalController.dismiss();
  }

}
