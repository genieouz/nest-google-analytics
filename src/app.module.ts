import { GaModule } from './ga/ga.module';
import { GaService } from './ga/services/ga.service';
import { GaController } from './ga/controller/ga.controller';
import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GaModule, 
    HttpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
