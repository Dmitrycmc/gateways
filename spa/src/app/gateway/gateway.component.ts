import { Component, Input } from '@angular/core';
import { DeviceWithId } from '../../types/devices';
import { GatewayWithId } from '../../types/gateways';
import { MatDialog } from '@angular/material/dialog';
import { MAX_BOUND_DEVICES } from '../../constants';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DevicesService } from '../api/devices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GatewayDialogComponent } from '../dialog/gateway-dialog.component';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css'],
})
export class GatewayComponent {
  constructor(
    public dialog: MatDialog,
    private devicesService: DevicesService,
    private _snackBar: MatSnackBar,
  ) {}

  public maxBoundDevices = MAX_BOUND_DEVICES;

  @Input('gateway') public gateway: GatewayWithId | null = null;
  @Input('devices') public devices: DeviceWithId[] = [];
  @Input('gateways') public gateways: GatewayWithId[] = [];

  openDialog() {
    this.dialog.open(GatewayDialogComponent, {
      data: {
        _id: this.gateway?._id,
        serialNumber: this.gateway?.serialNumber,
        name: this.gateway?.name,
        IPv4: this.gateway?.IPv4,
      },
    });
  }

  drop(event: CdkDragDrop<DeviceWithId[]>) {
    const newGatewayId =
      (event.container.element.nativeElement.dataset as { gatewayid?: string })
        .gatewayid || null;
    const id = (event.item.element.nativeElement.dataset as { id: string }).id;
    if (event.previousContainer !== event.container) {
      this.devicesService.reattachDeviceDevice(id, newGatewayId).subscribe({
        next: () => {
          this._snackBar.open('Success', '', {
            duration: 3000,
            verticalPosition: 'top',
          });
        },
        error: () => {
          this._snackBar.open('Error', '', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'right',
          });
        },
      });
    }
  }

  isNotFull = () => {
    return this.devices.length < this.maxBoundDevices || !this.gateway;
  };
}
