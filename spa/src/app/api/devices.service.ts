import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device, DeviceWithId } from '../../types/devices';
import { Id } from 'src/types/common';
import { catchError, map, Subject } from 'rxjs';
import { prepareDevice } from './transformers';
import { createRetryWrapper } from './retry';

const retry = createRetryWrapper(250, 3);

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  dataChange: Subject<DeviceWithId[] | undefined> = new Subject();
  private _devices?: DeviceWithId[];

  get devices(): DeviceWithId[] | undefined {
    return this._devices;
  }

  set devices(gateways: DeviceWithId[] | undefined) {
    this._devices = gateways;
    this.dataChange.next(gateways);
  }

  constructor(private http: HttpClient) {}

  createDevice(data: Omit<Device, 'createdAt'>) {
    return retry(
      this.http.post<DeviceWithId>('api/devices', {
        ...data,
        status: data.status || false,
      }),
    )
      .pipe(map(prepareDevice))
      .pipe((data) => {
        data.subscribe((data) => {
          this.devices = [...(this.devices || []), data];
        });
        return data;
      });
  }

  getDevices() {
    return retry(this.http.get<DeviceWithId[]>('api/devices'))
      .pipe(map((devices) => devices.map(prepareDevice)))
      .pipe((data) => {
        data.subscribe((data) => {
          this.devices = data;
        });
        return data;
      });
  }

  updateDevice(id: Id, data: Omit<Device, 'createdAt'>) {
    return retry(
      this.http.put<DeviceWithId>(`api/devices/${id}`, {
        ...data,
        status: data.status || false,
      }),
    )
      .pipe(map(prepareDevice))
      .pipe((data) => {
        data.subscribe((data) => {
          this.devices = this.devices?.map((device) =>
            device._id === id ? { ...data, _id: id } : device,
          );
        });
        return data;
      });
  }

  reattachDeviceDevice(id: Id, newGatewayId: Id | null) {
    const editingDevice = this.devices?.find((device) => device._id === id);
    const previousGatewayId = editingDevice?.gatewayId;

    this.devices = this.devices?.map((device) =>
      device._id === id ? { ...device, gatewayId: newGatewayId } : device,
    );
    return retry(
      this.http.patch<DeviceWithId>(`api/devices/${id}`, {
        gatewayId: newGatewayId,
      }),
    ).pipe(
      catchError((e) => {
        this.devices = this.devices?.map((device) =>
          device._id === id
            ? { ...device, gatewayId: previousGatewayId! }
            : device,
        );
        return e;
      }),
    );
  }

  deleteDevice(id: Id) {
    return retry(this.http.delete<DeviceWithId>(`api/devices/${id}`)).pipe(
      (data) => {
        data.subscribe(() => {
          this.devices = this.devices?.filter((device) => device._id !== id);
        });
        return data;
      },
    );
  }

  unattachGaetway(id: Id) {
    this.devices = this.devices?.map((device) =>
      device.gatewayId === id ? { ...device, gatewayId: null } : device,
    );
  }
}
