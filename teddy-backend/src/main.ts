import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { APP_PORT } from './core/environments/environments';
import { BusinessExceptionFilter } from './core/exception/business-exception-filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new BusinessExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors({
    origin: true,
  });
  await app.listen(APP_PORT ?? 3333);
  console.log(`App is running on port ${APP_PORT}`)
}
bootstrap();
