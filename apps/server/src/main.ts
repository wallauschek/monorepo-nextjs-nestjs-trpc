import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TrpcRouter } from '@server/trpc/trpc.router';
// import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const trpc = app.get(TrpcRouter);
  trpc.applyMiddleware(app);
  await app.listen(Number(config.get<string>('PORT')) || 4000);
}
bootstrap();
