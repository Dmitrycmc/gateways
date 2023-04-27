import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Id } from 'src/types/common';
import { Gateway, GatewayWithId } from 'src/types/gateways';
import { createRetryWrapper } from './retry';

const retry = createRetryWrapper(250, 3);

@Injectable({
  providedIn: 'root',
})
export class GatewaysService {
  constructor(private http: HttpClient) {}

  createGateway(data: Gateway) {
    return retry(this.http.post<GatewayWithId>('api/gateways', data));
  }

  getGateways() {
    return retry(this.http.get<GatewayWithId[]>('api/gateways'));
  }

  updateGateway(_id: Id, data: Gateway) {
    return retry(this.http.put<GatewayWithId>(`api/gateways/${_id}`, data));
  }

  deleteGateway(_id: Id) {
    return retry(this.http.delete<GatewayWithId>(`api/gateways/${_id}`));
  }
}
