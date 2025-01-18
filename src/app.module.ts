import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfig } from './config/database-config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './module/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
// import { PrismaService } from './prisma.service';
import { UserService } from './module/users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseConfig,
    AuthModule,
    UsersModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserService,
    // PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  // exports: [PrismaService],
})
export class AppModule {}
