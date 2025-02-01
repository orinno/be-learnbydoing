import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Unit } from './entities/unit.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';

@Injectable()
export class UnitsService {

  constructor(@InjectRepository(Unit) private readonly UnitRepository: Repository<Unit>) { }

  async create(createUnitDto: CreateUnitDto) {
    try {
      const units = new Unit();
      units.name = createUnitDto.name;
      units.description = createUnitDto.description;
      return await this.UnitRepository.save(units);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === "P2002") {
          throw new ConflictException(`Units name ${createUnitDto.name} already exists!`);
        }
      }
      throw new InternalServerErrorException();
    }
  }

  findAll(): Promise<Unit[]> {
    return this.UnitRepository.find();
  }

  findOne(id: number) {
    return this.UnitRepository.findOneBy({ id });
  }

  findUnitByName(name: string) {
    return this.UnitRepository.findOneBy({ name });
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    try {
      const units = await this.UnitRepository.findOneBy({ id });
      if (!units) {
        throw new NotFoundException(`Unit with ID ${id} not found`);
      }
      units.name = updateUnitDto.name;
      units.description = updateUnitDto.description;
      return await this.UnitRepository.save(units);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === "P2002") {
          throw new ConflictException(`Units name ${updateUnitDto.name} already exists!`);
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
      const result = await this.UnitRepository.delete(id);
      
      if (!result) {
        throw new NotFoundException(`Unit with ID ${id} not found`);
      }
      return result; 
  }
}
