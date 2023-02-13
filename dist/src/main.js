"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const class_validator_1 = require("class-validator");
const fs = require("fs");
const swagger_1 = require("@nestjs/swagger");
const swagger_options_1 = require("./constants/swagger-options");
const cors = require('cors');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    app.use(cors({ origin: true }));
    generateSwagger(app);
    await app.listen(app.get(config_1.ConfigService).get('port'));
}
bootstrap();
function generateSwagger(app) {
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_options_1.swaggerOptions);
    fs.writeFileSync('./swagger/swagger.json', JSON.stringify(document, null, 2));
    swagger_1.SwaggerModule.setup('docs', app, document);
}
//# sourceMappingURL=main.js.map