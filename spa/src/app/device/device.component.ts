import { Component, Input } from '@angular/core';
import { DeviceWithId } from '../../types/devices';
import { DeviceDialogComponent } from '../device-dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
})
export class DeviceComponent {
  constructor(private dialog: MatDialog) {}

  @Input('device') public device!: DeviceWithId;
  @Input('update') public update!: () => void;

  openDialog() {
    this.dialog.open(DeviceDialogComponent, {
      data: {
        _id: this.device._id,
        name: this.device.name,
        update: this.update,
      },
    });
  }
}
