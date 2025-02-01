import { Module } from '@nestjs/common';
import { UnitsService } from './units.service';
import { UnitsController } from './units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { UnitRepository } from './repo/units.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  controllers: [UnitsController],
  providers: [UnitsService],
})
export class UnitsModule {}
