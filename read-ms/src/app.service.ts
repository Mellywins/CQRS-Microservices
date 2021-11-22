import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly elasticService: ElasticsearchService) {}

  findAll(): User[] | Promise<User[]> {
    return [];
  }
}
