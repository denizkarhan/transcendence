import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Transcendence')
    .setDescription('WinxClup')
    .setVersion('1.0')
    .addTag('bros')
    .build();
  const document = SwaggerModule.createDocument(app, config); //SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
//   app.setGlobalPrefix('api');
	app.enableCors({
	origin: [
	  'http://localhost:3000',
	],
	methods: ["GET", "POST"],
	credentials: true,
  });
  await app.listen(3000);
}
bootstrap();
