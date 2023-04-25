import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GatewaysService } from '../api/gateways.service';
import { Id } from '../../types/common';

export interface DialogData {
  id?: Id;
  name: string;
  update: () => void;
}

@Component({
  selector: 'app-gateway-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class GatewayDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<GatewayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private gatewaysService: GatewaysService,
  ) {}

  private onSuccess = () => {
    this.dialogRef.close();
    this.data.update();
  };

  public onSave() {
    const { id, name } = this.data;
    if (id) {
      this.gatewaysService
        .updateGateway(id, { name })
        .subscribe(this.onSuccess);
    } else {
      this.gatewaysService.createGateway({ name }).subscribe(this.onSuccess);
    }
  }

  public onDelete() {
    const { id } = this.data;
    this.gatewaysService.deleteGateway(id!).subscribe(this.onSuccess);
  }
}
