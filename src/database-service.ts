import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-dotenv';

@Injectable()
export class DatabaseConnectionService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) { }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (this.configService.get('DATABASE_URL')) {
      return {
        name: 'default',
        type: 'postgres',
        url: this.configService.get('DATABASE_URL'),
        synchronize: true,
        entities: ['dist/**/*.entity.js'],
      };
    }
    return {
      name: 'default',
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: Number(this.configService.get('DATABASE_PORT')),
      username: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_DB'),
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.entity.js'],
    };
  }
}
