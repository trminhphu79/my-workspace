import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProxyModule } from './proxy';
import { AuthModule } from './auth';
import { LoggingMiddleware } from './logger-middleware.service';

@Module({
  imports: [
    ProxyModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, LoggingMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
