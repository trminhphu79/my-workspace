import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import Server from "http-proxy"

@Injectable()
export class ProxyService {
  private proxy: Server = Server.createProxyServer();

  async proxyRequest(req: Request, res: Response, target: string) {
    this.proxy.web(req, res, { target }, (err) => {
      if (err) {
        res.status(500).send('Proxy Error');
      }
    });
  }
}
