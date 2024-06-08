import { Controller, All, Req, Res, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth/auth.service';
import { ProxyService } from './proxy/proxy.service';

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
        await this.proxyService.proxyRequest(request, response, targetService);
      } else {
        response.status(404).send('Service Not Found');
      }
    } else {
      response.status(401).send('Unauthorized');
    }
  }

  getTargetService(request: Request): string {
    if (request.url.startsWith('/gateway/v1/users')) {
      return 'http://localhost:3001/api';
    } else if (request.url.startsWith('/gateway/v1/notifications')) {
      return 'http://localhost:3002/api';
    }
    return 'http://localhost:3002/api';

  }
}
