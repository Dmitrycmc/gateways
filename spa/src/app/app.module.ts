import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DeviceComponent } from './device/device.component';
import { GatewayComponent } from './gateway/gateway.component';
import { NewDeviceComponent } from './new-device/new-device.component';
import { NewGatewayComponent } from './new-gateway/new-gateway.component';
import { HttpClientModule } from '@angular/common/http';
import { GatewaysService } from './api/gateways.service';
import { DevicesService } from './api/devices.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DeviceDialogComponent } from './device-dialog/dialog.component';
import { GatewayDialogComponent } from './gateway-dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    GatewayComponent,
    NewDeviceComponent,
    NewGatewayComponent,
    DeviceDialogComponent,
    GatewayDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [GatewaysService, DevicesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
