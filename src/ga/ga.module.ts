import { Module, HttpModule } from '@nestjs/common';
import { GaController } from './controller/ga.controller';
import { GaService } from './services/ga.service';

@Module({
    imports: [HttpModule],
    controllers: [GaController],
    providers: [GaService],
})
export class GaModule {}
