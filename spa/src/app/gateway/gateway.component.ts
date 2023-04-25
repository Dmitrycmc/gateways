import { Component, Input } from '@angular/core';
import { DeviceWithId } from '../../types/devices';
import { GatewayWithId } from '../../types/gateways';
import { MatDialog } from '@angular/material/dialog';
import { GatewayDialogComponent } from '../gateway-dialog/dialog.component';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css'],
})
export class GatewayComponent {
  constructor(public dialog: MatDialog) {}

  @Input('gateway') public gateway: GatewayWithId | null = null;

  @Input('devices') public devices: DeviceWithId[] = [];
  @Input('update') public update!: () => void;

  openDialog() {
    this.dialog.open(GatewayDialogComponent, {
      data: {
        id: this.gateway?.id,
        name: this.gateway?.name,
        update: this.update,
      },
    });
  }
}
