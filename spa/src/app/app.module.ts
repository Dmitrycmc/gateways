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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    GatewayComponent,
    NewDeviceComponent,
    NewGatewayComponent,
    DeviceDialogComponent,
    GatewayDialogComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
    MatProgressSpinnerModule,
  ],
  providers: [GatewaysService, DevicesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
