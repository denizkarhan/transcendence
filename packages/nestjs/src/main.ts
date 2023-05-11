import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
	secret: 'asdajhfdsdkjfjksghfkjjhjjkjaksdas',
	saveUninitialized: false,
	resave: false,
	cookie: {
		maxAge: 99999,
	}
  }));
  const config = new DocumentBuilder()
    .setTitle('Transcendence')
    .setDescription('WinxClup')
    .setVersion('1.0')
    .addTag('bros')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
//   app.setGlobalPrefix('api');
	app.enableCors({
	origin: [
	  'http://localhost:3001',
	],
	methods: ["GET", "POST"],
	credentials: true,
  });
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.NEST_PORT);
}
bootstrap();
