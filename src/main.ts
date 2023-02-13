import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {INestApplication, ValidationPipe} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';
import * as fs from 'fs'
import {SwaggerModule} from "@nestjs/swagger";
import {swaggerOptions} from "./constants/swagger-options";
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.use(cors({ origin: true }));
  generateSwagger(app);
  await app.listen(app.get(ConfigService).get('port'));
}
bootstrap();

function generateSwagger(app: INestApplication) {
  const document: any = SwaggerModule.createDocument(app, swaggerOptions);
  fs.writeFileSync('./swagger/swagger.json', JSON.stringify(document, null, 2));
  SwaggerModule.setup('docs', app, document);
}

