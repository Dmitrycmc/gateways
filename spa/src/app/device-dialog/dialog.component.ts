import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DevicesService } from '../api/devices.service';
import { Id } from '../../types/common';

export interface DialogData {
  id?: Id;
  name: string;
  gatewayId?: Id;
  update: () => void;
}

@Component({
  selector: 'app-device-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DeviceDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private devicesService: DevicesService,
  ) {}

  private onSuccess = () => {
    this.dialogRef.close();
    this.data.update();
  };

  public onSave() {
    const { id, name, gatewayId } = this.data;
    if (id) {
      this.devicesService
        .updateDevice(id, { name, gatewayId })
        .subscribe(this.onSuccess);
    } else {
      this.devicesService
        .createDevice({ name, gatewayId })
        .subscribe(this.onSuccess);
    }
  }

  public onDelete() {
    const { id } = this.data;
    this.devicesService.deleteDevice(id!).subscribe(this.onSuccess);
  }
}
