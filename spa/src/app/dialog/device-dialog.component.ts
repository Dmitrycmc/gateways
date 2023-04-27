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
}

@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DeviceDialogComponent {
  private errorMap: Record<string, string> = {};

  public getError(fieldName: string): string {
    return this.errorMap[fieldName];
  }

  constructor(
    private dialogRef: MatDialogRef<DeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private devicesService: DevicesService,
  ) {}

  private onSuccess = () => {
    this.dialogRef.close();
  };

  private onError = (e: any) => {
    const messages = e?.error?.message;

    if (messages) {
      this.errorMap = {};

      messages.forEach((message: string) => {
        this.errorMap[message.split(' ')[0]] = message;
      });
    }
  };

  public onSave() {
    const { _id, uid, vendor, status, gatewayId } = this.data;
    if (_id) {
      this.devicesService
        .updateDevice(_id, {
          uid,
          vendor,
          status,
          gatewayId: gatewayId || null,
        })
        .subscribe({ next: this.onSuccess, error: this.onError });
    } else {
      this.devicesService
        .createDevice({ uid, vendor, status, gatewayId: gatewayId || null })
        .subscribe({ next: this.onSuccess, error: this.onError });
    }
  }

  public onDelete() {
    const { _id } = this.data;
    this.devicesService.deleteDevice(_id!).subscribe(this.onSuccess);
  }
}
