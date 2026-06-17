/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(bodyParser.json({ limit: ConfigService.get('MAX_REQ_BODY_SIZE') || '10mb' }));
  // app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.enableCors();
  const port = process.env.PORT || 3000;
  console.log(`Server is running on port ${port}`);
  await app.listen(port);
}
bootstrap();
