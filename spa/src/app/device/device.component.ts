import { Component, Input } from '@angular/core';
import { DeviceWithId } from '../../types/devices';
import { DeviceDialogComponent } from '../dialog/device-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { GatewayWithId } from '../../types/gateways';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
})
export class DeviceComponent {
  constructor(private dialog: MatDialog) {}

  @Input('device') public device!: DeviceWithId;
  @Input('gateways') public gateways: GatewayWithId[] = [];

  openDialog() {
    this.dialog.open(DeviceDialogComponent, {
      data: {
        _id: this.device._id,
        uid: this.device.uid,
        vendor: this.device.vendor,
        status: this.device.status,
        gatewayId: this.device.gatewayId,
        gateways: this.gateways,
      },
    });
  }
}
