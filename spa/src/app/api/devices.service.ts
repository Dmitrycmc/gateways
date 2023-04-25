import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device, DeviceWithId } from '../../types/devices';
import { Id } from 'src/types/common';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  createDevice(data: Device) {
    return this.http.post<DeviceWithId>('api/devices', data);
  }

  getDevices() {
    return this.http.get<DeviceWithId[]>('api/devices');
  }

  updateDevice(id: Id, data: Device) {
    return this.http.put<DeviceWithId>(`api/devices/${id}`, data);
  }

  deleteDevice(id: Id) {
    return this.http.delete<DeviceWithId>(`api/devices/${id}`);
  }
}
