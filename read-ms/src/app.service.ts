import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly elasticService: ElasticsearchService) {}

  async findAll(): Promise<User[]> {
    return await (this.elasticService.search({
      index: 'd3d7af60-4c81-11e8-b3d7-01146121b73d',
      body: {
        query: {
          match_all: {},
        },
      },
    }) as unknown as Promise<User[]>);
  }
}
