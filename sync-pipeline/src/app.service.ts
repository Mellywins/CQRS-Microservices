import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly elasticService: ElasticsearchService) {}
  async create(createUserDto: CreateUserDto) {
    console.log('sync pipeline received creation event')
    // const result = await this.elasticService.index({
    //   index: 'users',
    //   body: {
    //     ...createUserDto,
    //   },
    // });
  }
  async update(updateUserDto: UpdateUserDto) {}
}
