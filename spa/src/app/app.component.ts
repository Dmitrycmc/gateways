import { Component, OnInit } from '@angular/core';
import { DeviceWithId } from '../types/devices';
import { GatewayWithId } from '../types/gateways';
import { GatewaysService } from './api/gateways.service';
import { DevicesService } from './api/devices.service';
import { Id } from '../types/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gateways-spa';
  gateways?: GatewayWithId[];
  devices?: DeviceWithId[];

  public getAttachedDevices(gatewayId: Id | null) {
    return this.devices?.filter((device) => device.gatewayId === gatewayId);
  }

  constructor(
    private gatewaysService: GatewaysService,
    private devicesService: DevicesService,
  ) {
    gatewaysService.dataChange.subscribe((data) => {
      this.gateways = data;
    });
    devicesService.dataChange.subscribe((data) => {
      this.devices = data;
    });
  }

  private update = () => {
    this.gatewaysService.getGateways();
    this.devicesService.getDevices();
  };

  ngOnInit(): void {
    this.update();
  }
}
