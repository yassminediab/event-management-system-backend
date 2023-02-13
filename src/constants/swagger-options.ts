import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerOptions: any = new DocumentBuilder()
    .setTitle('Event Management system')
    .setDescription('Event Management system APIS')
    .setVersion('0.0.2')
    .addBearerAuth()
    .build();
