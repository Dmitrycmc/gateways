import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DevicesService } from '../api/devices.service';
import { Id } from '../../types/common';

export interface DialogData {
  _id?: Id;
  uid: number;
  vendor: string;
  status: boolean;
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
    const { _id, uid, vendor, status, gatewayId } = this.data;
    if (_id) {
      this.devicesService
        .updateDevice(_id, { uid, vendor, status, gatewayId })
        .subscribe(this.onSuccess);
    } else {
      this.devicesService
        .createDevice({ uid, vendor, status, gatewayId })
        .subscribe(this.onSuccess);
    }
  }

  public onDelete() {
    const { _id } = this.data;
    this.devicesService.deleteDevice(_id!).subscribe(this.onSuccess);
  }
}
