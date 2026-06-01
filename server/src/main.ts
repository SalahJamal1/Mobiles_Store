import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { GlobalExceptionFilter } from './exception/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 1. Security headers
  app.use(helmet());
  app.use(hpp());

  // 2. Parse body first, then sanitize
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.includes('/api/v1/payments/webhook')) {
      return next();
    }

    if (req.body) {
      req.body = JSON.parse(xss(JSON.stringify(req.body)));
    }

    // ✅ mutate individual query values instead of reassigning req.query
    if (req.query) {
      for (const key of Object.keys(req.query)) {
        const val = req.query[key];
        if (typeof val === 'string') {
          req.query[key] = xss(val);
        }
      }
    }

    next();
  });

  // 3. CORS & rate limiting
  app.use(
    cors({
      origin: [
        'http://localhost:8081',
        'http://192.168.4.241:8081',
        "'http://192.168.1.27:8081'",
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    }),
  );
  app.use(
    rateLimit({
      windowMs: 3 * 60 * 1000,
      message: 'Too many requests, please try again later.',
      max: 100,
    }),
  );

  app.use(
    '/api/v1/payments/webhook',
    express.raw({ type: 'application/json' }),
  );
  // 4. Utilities
  app.use(express.json());
  app.use(cookieParser());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Mobile Store API')
    .setDescription('API documentation for Mobile Store')
    .setVersion('1.0')
    .addBearerAuth() // ✅ adds Authorization header support
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // SwaggerModule.setup('api/docs', app, document); // ✅ available at /api/docs
  app
    .getHttpAdapter()
    .get('/api/docs/swagger.json', (req: Request, res: Response) => {
      res.json(document);
    });
  SwaggerModule.setup('api/docs', app, document, {
    explorer: true,
    swaggerOptions: {
      urls: [
        {
          url: '/api/docs/swagger.json',
          name: 'v1 - swagger.json',
        },
      ],
    },
  });
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
