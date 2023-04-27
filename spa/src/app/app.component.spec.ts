import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GatewaysService } from './api/gateways.service';
import { DevicesService } from './api/devices.service';
import { DeviceComponent } from './device/device.component';
import { GatewayComponent } from './gateway/gateway.component';
import { NewDeviceComponent } from './new-device/new-device.component';
import { NewGatewayComponent } from './new-gateway/new-gateway.component';
import { DeviceDialogComponent } from './dialog/device-dialog.component';
import { GatewayDialogComponent } from './dialog/gateway-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CdkListbox } from '@angular/cdk/listbox';
import { MatSelectModule } from '@angular/material/select';

const delay = (ms: number): Promise<void> =>
  new Promise((res) => setTimeout(res, ms));

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        CdkDropList,
        CdkDrag,
        CdkDropListGroup,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        CdkListbox,
        MatSelectModule,
      ],
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
      providers: [GatewaysService, DevicesService, HttpClient],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gateways-spa'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gateways-spa');
  });
});
