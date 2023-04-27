import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GatewaysService } from '../api/gateways.service';
import { Id } from '../../types/common';

export interface DialogData {
  _id?: Id;
  serialNumber: string;
  name: string;
  IPv4: string;
}

@Component({
  selector: 'app-gateway-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class GatewayDialogComponent {
  private errorMap: Record<string, string> = {};

  public getError(fieldName: string): string {
    return this.errorMap[fieldName];
  }

  constructor(
    private dialogRef: MatDialogRef<GatewayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private gatewaysService: GatewaysService,
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
    const { _id, serialNumber, name, IPv4 } = this.data;
    if (_id) {
      this.gatewaysService
        .updateGateway(_id, { serialNumber, name, IPv4 })
        .subscribe({ next: this.onSuccess, error: this.onError });
    } else {
      this.gatewaysService
        .createGateway({ serialNumber, name, IPv4 })
        .subscribe({ next: this.onSuccess, error: this.onError });
    }
  }

  public onDelete() {
    const { _id } = this.data;
    this.gatewaysService.deleteGateway(_id!).subscribe(this.onSuccess);
  }
}
