import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Id } from '../../types/common';
import { DeviceDialogComponent } from '../dialog/device-dialog.component';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css'],
})
export class NewDeviceComponent {
  constructor(public dialog: MatDialog) {}

  @Input('gatewayId') public gatewayId: Id | null = null;

  openDialog() {
    this.dialog.open(DeviceDialogComponent, {
      data: {
        gatewayId: this.gatewayId,
      },
    });
  }
}
