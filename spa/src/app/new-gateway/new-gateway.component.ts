import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GatewayDialogComponent } from '../gateway-dialog/dialog.component';

@Component({
  selector: 'app-new-gateway',
  templateUrl: './new-gateway.component.html',
  styleUrls: ['./new-gateway.component.css'],
})
export class NewGatewayComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(GatewayDialogComponent, {
      data: {},
    });
  }
}
