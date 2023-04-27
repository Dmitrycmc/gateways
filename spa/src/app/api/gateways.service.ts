import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Id } from 'src/types/common';
import { Gateway, GatewayWithId } from 'src/types/gateways';
import { createRetryWrapper } from './retry';
import { Subject } from 'rxjs';
import { DevicesService } from './devices.service';

const retry = createRetryWrapper(250, 3);

@Injectable({
  providedIn: 'root',
})
export class GatewaysService {
  dataChange: Subject<GatewayWithId[] | undefined> = new Subject();
  private _gateways?: GatewayWithId[];

  get gateways(): GatewayWithId[] | undefined {
    return this._gateways;
  }

  set gateways(gateways: GatewayWithId[] | undefined) {
    this._gateways = gateways;
    this.dataChange.next(gateways);
  }

  constructor(
    private http: HttpClient,
    private devicesService: DevicesService,
  ) {}

  createGateway(data: Gateway) {
    return retry(this.http.post<GatewayWithId>('api/gateways', data)).pipe(
      (data) => {
        data.subscribe((data) => {
          this.gateways = [...(this.gateways || []), data];
        });
        return data;
      },
    );
  }

  getGateways() {
    return retry(this.http.get<GatewayWithId[]>('api/gateways')).pipe(
      (data) => {
        data.subscribe((data) => {
          this.gateways = data;
        });
        return data;
      },
    );
  }

  updateGateway(id: Id, data: Gateway) {
    return retry(this.http.put<GatewayWithId>(`api/gateways/${id}`, data)).pipe(
      (data) => {
        data.subscribe((data) => {
          this.gateways = this.gateways?.map((gateway) =>
            gateway._id === id ? { ...data, _id: id } : gateway,
          );
        });
        return data;
      },
    );
  }

  deleteGateway(id: Id) {
    return retry(this.http.delete<GatewayWithId>(`api/gateways/${id}`)).pipe(
      (data) => {
        data.subscribe(() => {
          this.gateways = this.gateways?.filter(
            (gateway) => gateway._id !== id,
          );
          this.devicesService.unattachGaetway(id);
        });
        return data;
      },
    );
  }
}
