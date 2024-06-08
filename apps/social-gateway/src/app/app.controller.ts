import { Controller, All, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { ProxyService } from './proxy/proxy.service';
import Server from 'http-proxy';


export interface ProxyTargetDetailed {
  host: string;
  port: number;
  protocol?: string | undefined;
  hostname?: string | undefined;
  socketPath?: string | undefined;
  key?: string | undefined;
  passphrase?: string | undefined;
  pfx?: Buffer | string | undefined;
  cert?: string | undefined;
  ca?: string | undefined;
  ciphers?: string | undefined;
  secureProtocol?: string | undefined;
}

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly proxyService: ProxyService
  ) { }

  @All('*')
  async handleRequest(@Req() request: Request, @Res() response: Response) {
    console.log('Request:', request.url);
    const token = request.headers['authorization'];
    if (this.authService.validateToken(token)) {
      const targetService = this.getTargetService(request);
      console.log('Target Service:', targetService);
      if (targetService) {
        let value = await this.proxyService.proxyRequest(request, response, targetService);
        console.log("value", value);
      } else {
        response.status(404).send('Service Not Found');
      }
    } else {
      response.status(401).send('Unauthorized');
    }
  }

  getTargetService(request: Request) {
    let targetService: ProxyTargetDetailed = {
      host: 'localhost',
      port: 3001,
      protocol: 'http'
    }
    if (request.url.startsWith('/gateway/v1/users')) {
      targetService.port = 3001;
    } else if (request.url.startsWith('/gateway/v1/notifications')) {
      targetService.port = 3002;
    }

    return targetService;
  }
}
