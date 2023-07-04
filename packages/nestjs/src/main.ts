import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { UserAchievements } from './typeorm/entities/userAchievements';
import { Achievements } from './typeorm/entities/achievements';
import { DataSource } from 'typeorm';
import { SeedService } from './seed/seed.service';

// ,  {cors: {
// 	origin: 'http://k2m13s05.42kocaeli.com.tr:3000',
// 	methods: ['GET', 'POST'],
//   }},


async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });
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
		.addBearerAuth(
			{
				// I was also testing it without prefix 'Bearer ' before the JWT
				description: `[just text field] Please enter token in following format: Bearer <JWT>`,
				name: 'Authorization',
				bearerFormat: 'Bearer', // I`ve tested not to use this field, but the result was the same
				type: 'http', // I`ve attempted type: 'apiKey' too
				in: 'Header'
			}
		)
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	// app.enableCors({
	// 	origin: [
	// 		'http://10.12.13.5:3000',
	// 	],
	// 	credentials: true,
	// });	
	app.use(passport.initialize());
	app.use(passport.session());

	const seedService = app.get(SeedService);
	await seedService.seedAchievements();
	// const http = require('http');
	// const appIP = '127.0.0.1';
	// const appPort = 3001;
	// const targetIP = '78.163.157.121';
	// const targetPort = 8080;
	// const server = http.createServer((req, res) => {
	// 	// Gelen istekleri hedef IP adresi ve port'a yönlendirme
	// 	const options = {
	// 		hostname: targetIP,
	// 		port: targetPort,
	// 		path: req.url,
	// 		method: req.method,
	// 		headers: req.headers
	// 	};

	// 	const proxyReq = http.request(options, (proxyRes) => {
	// 		// Hedef sunucudan gelen yanıtı istemciye iletiyoruz
	// 		res.writeHead(proxyRes.statusCode, proxyRes.headers);
	// 		proxyRes.pipe(res);
	// 	});

	// 	req.pipe(proxyReq);
	// });
	// server.listen(appPort, appIP, () => {
	// 	console.log(`Server running at http://${appIP}:${appPort}/`);
	// });
	await app.listen(3001);
}
bootstrap();