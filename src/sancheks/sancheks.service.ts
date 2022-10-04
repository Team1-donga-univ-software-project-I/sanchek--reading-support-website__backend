import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSanchekDto } from "./dtos/create-sanchek.dto";
import { UpdateSanchekDto } from "./dtos/update-sanchek.dto";
import { Sanchek } from "./entities/sanchek.entity";

@Injectable()
export class SanchekService {
  constructor(
    @InjectRepository(Sanchek)
    private readonly sancheks: Repository<Sanchek>
  ) {}

  getAll(): Promise<Sanchek[]> {
    return this.sancheks.find();
  }

  createSanchek(createSanchekDto: CreateSanchekDto): Promise<Sanchek> {
    const newSanchek = this.sancheks.create(createSanchekDto);
    return this.sancheks.save(newSanchek);
  }

  updateSanchek({ id, data }: UpdateSanchekDto) {
    return this.sancheks.update(id, { ...data });
  }
}
