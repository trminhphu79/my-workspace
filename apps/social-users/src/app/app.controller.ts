import { Controller, Get, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData(@Headers() headers: any) {
    console.log('Headers:', headers);
    console.log('AppController.getData()');
    return this.appService.getData();
  }
}