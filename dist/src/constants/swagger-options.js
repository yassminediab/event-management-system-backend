"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerOptions = new swagger_1.DocumentBuilder()
    .setTitle('Event Management system')
    .setDescription('Event Management system APIS')
    .setVersion('0.0.2')
    .addBearerAuth()
    .build();
//# sourceMappingURL=swagger-options.js.map