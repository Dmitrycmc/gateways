import { Component, OnInit } from '@angular/core';
import { DeviceWithId } from '../types/devices';
import { GatewayWithId } from '../types/gateways';
import { GatewaysService } from './api/gateways.service';
import { DevicesService } from './api/devices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'gateways-spa';
  gateways: GatewayWithId[] = [];
  devices: DeviceWithId[] = [];

  constructor(
    private gatewaysService: GatewaysService,
    private devicesService: DevicesService,
  ) {}

  public update = () => {
    this.gatewaysService.getGateways().subscribe((data) => {
      this.gateways = data;
    });
    this.devicesService.getDevices().subscribe((data) => {
      this.devices = data;
    });
  };

  ngOnInit(): void {
    this.update();
  }
}