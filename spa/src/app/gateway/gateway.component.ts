import { Component, Input } from '@angular/core';
import { DeviceWithId } from '../../types/devices';
import { GatewayWithId } from '../../types/gateways';
import { MatDialog } from '@angular/material/dialog';
import { GatewayDialogComponent } from '../gateway-dialog/dialog.component';
import { MAX_BOUND_DEVICES } from '../../constants';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { DevicesService } from '../api/devices.service';

@Component({
  selector: 'app-gateway',
  templateUrl: './gateway.component.html',
  styleUrls: ['./gateway.component.css'],
})
export class GatewayComponent {
  constructor(
    public dialog: MatDialog,
    private devicesService: DevicesService,
  ) {}

  public maxBoundDevices = MAX_BOUND_DEVICES;

  @Input('gateway') public gateway: GatewayWithId | null = null;

  @Input('devices') public devices: DeviceWithId[] = [];
  @Input('update') public update!: () => void;

  openDialog() {
    this.dialog.open(GatewayDialogComponent, {
      data: {
        _id: this.gateway?._id,
        serialNumber: this.gateway?.serialNumber,
        name: this.gateway?.name,
        IPv4: this.gateway?.IPv4,
        update: this.update,
      },
    });
  }

  drop(event: CdkDragDrop<DeviceWithId[]>) {
    const newGatewayId =
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      // @ts-ignore
      event.container.element.nativeElement.dataset.gatewayid || null;
    /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
    // @ts-ignore
    const id = event.item.element.nativeElement.dataset.id!;
    if (event.previousContainer !== event.container) {
      this.devicesService
        .updatePartiallyDevice(id, { gatewayId: newGatewayId })
        .subscribe(this.update);
    }
  }
}
