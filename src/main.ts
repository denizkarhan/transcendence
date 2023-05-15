import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(session({
	secret: 'asdajhfdsdkjfjksghfkjjhjjkjaksdas', // oturumun gizli kimliği
	saveUninitialized: false, //bilgiler güncellendikten sonra eski bilgileri tutmayacak
	resave: false, // oturum verileri saklanmayacak
	cookie: {
		maxAge: 15 * 60 * 1000, //oturum açık kalma süresi
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
	app.enableCors({
	origin: [
	  'http://localhost:3000',
	],
	methods: ["GET", "POST", "PUT"],
	credentials: true,
  });
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
