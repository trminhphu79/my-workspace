import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import Server from "http-proxy"
import { ProxyTargetDetailed } from '../app.controller';

@Injectable()
export class ProxyService {
  private proxy: Server = Server.createProxyServer();

  async proxyRequest(req: Request, res: Response, target: ProxyTargetDetailed) {
    console.log('Proxy target:', target);
    this.proxy.web(req, res, {
      target: target
    }, (err) => {
      console.log('Error:', err);
      if (err) {
        res.status(500).send('Proxy Error');
      }
    });
  }
}
