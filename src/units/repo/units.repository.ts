import { EntityRepository, EntitySchemaEmbeddedColumnOptions, Repository } from "typeorm";
import { Unit } from "../entities/unit.entity";

@EntityRepository(Unit)
export class UnitRepository extends Repository<Unit> {
     getUnitBYName(name: string): Promise<Unit> {
        return this.findOne({ where: { name } });
    }
}