import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GatewayDialogComponent } from '../gateway-dialog/dialog.component';

@Component({
  selector: 'app-new-gateway',
  templateUrl: './new-gateway.component.html',
  styleUrls: ['./new-gateway.component.css'],
})
export class NewGatewayComponent {
  constructor(public dialog: MatDialog) {}

  @Input('update') public update!: () => void;

  openDialog() {
    this.dialog.open(GatewayDialogComponent, {
      data: {
        update: this.update,
      },
    });
  }
}
