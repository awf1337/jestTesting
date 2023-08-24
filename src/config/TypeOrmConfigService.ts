import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<ConfigService>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database_type' as keyof ConfigService),
      url: this.configService.get('database_url' as keyof ConfigService),
      host: this.configService.get('database_host' as keyof ConfigService),
      port: this.configService.get('database_port' as keyof ConfigService),
      username: this.configService.get(
        'database_username' as keyof ConfigService,
      ),
      password: this.configService.get(
        'database_password' as keyof ConfigService,
      ),
      database:
        this.configService.get('NODE_ENV' as keyof ConfigService) === 'test'
          ? this.configService.get('database_name_test' as keyof ConfigService)
          : this.configService.get('database_name' as keyof ConfigService),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    } as TypeOrmModuleOptions;
  }
}
