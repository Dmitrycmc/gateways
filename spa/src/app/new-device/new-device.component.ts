import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Id } from '../../types/common';
import { DeviceDialogComponent } from '../device-dialog/dialog.component';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css'],
})
export class NewDeviceComponent {
  constructor(public dialog: MatDialog) {}

  @Input('gatewayId') public gatewayId: Id | null = null;
  @Input('update') public update!: () => void;

  openDialog() {
    this.dialog.open(DeviceDialogComponent, {
      data: {
        gatewayId: this.gatewayId,
        update: this.update,
      },
    });
  }
}
