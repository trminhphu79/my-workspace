import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('notifications')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
