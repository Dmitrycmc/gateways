import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Id } from 'src/types/common';
import { Gateway, GatewayWithId } from 'src/types/gateways';

@Injectable({
  providedIn: 'root',
})
export class GatewaysService {
  constructor(private http: HttpClient) {}

  createGateway(data: Gateway) {
    return this.http.post<GatewayWithId>('api/gateways', data);
  }

  getGateways() {
    return this.http.get<GatewayWithId[]>('api/gateways');
  }

  updateGateway(_id: Id, data: Gateway) {
    return this.http.put<GatewayWithId>(`api/gateways/${_id}`, data);
  }

  deleteGateway(_id: Id) {
    return this.http.delete<GatewayWithId>(`api/gateways/${_id}`);
  }
}
