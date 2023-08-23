import { Injectable } from '@nestjs/common';
import { CreateUrlCheckDto } from './dto/create-url-check.dto';
import { UpdateUrlCheckDto } from './dto/update-url-check.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlCheck } from './entities/url-chek.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UrlCheckService {
  constructor(
    @InjectRepository(UrlCheck)
    private readonly urlCheckRepository: Repository<UrlCheck>,
    private eventEmitter: EventEmitter2,
  ) {}

  async findAll(userId: number) {
    return this.urlCheckRepository.find({ where: { user: { id: userId } } });
  }

  async findOne(id: number) {
    return this.urlCheckRepository.findOne({ where: { id } });
  }

  async create(data: CreateUrlCheckDto, userId: number) {
    data.userId = userId;
    const urlCheck = await this.urlCheckRepository.save(data);
    this.eventEmitter.emit('urlCheck.created', urlCheck);
    return urlCheck;
  }

  async update(id: number, data: UpdateUrlCheckDto) {
    await this.urlCheckRepository.update(id, data);
    const urlCheck = await this.urlCheckRepository.findOne({ where: { id } });
    this.eventEmitter.emit('urlCheck.updated', urlCheck);
    return urlCheck;
  }

  async remove(id: number) {
    await this.urlCheckRepository.delete(id);
    return 'Url check deleted';
  }
}
