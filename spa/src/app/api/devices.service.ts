import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device, DeviceWithId } from '../../types/devices';
import { Id } from 'src/types/common';
import {map} from "rxjs";
import {prepareDevice} from "./transformers";

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  createDevice(data: Omit<Device, 'createdAt'>) {
    return this.http.post<DeviceWithId>('api/devices', {
      ...data,
      status: data.status || false,
    });
  }

  getDevices() {
    return this.http.get<DeviceWithId[]>('api/devices')
      .pipe(map(devices => devices.map(prepareDevice)));
  }

  updateDevice(_id: Id, data: Omit<Device, 'createdAt'>) {
    return this.http.put<DeviceWithId>(`api/devices/${_id}`, {
      ...data,
      status: data.status || false,
    });
  }

  deleteDevice(_id: Id) {
    return this.http.delete<DeviceWithId>(`api/devices/${_id}`);
  }
}
