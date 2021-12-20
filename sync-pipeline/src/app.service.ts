import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly elasticService: ElasticsearchService) {}
  async create(createUserDto: CreateUserDto) {
    const result = await this.elasticService.index({
      index: 'users',
      id: createUserDto.email,
      body: {
        ...createUserDto,
      },
    });
    return result;
  }
  async update(updateUserDto: UpdateUserDto) {
    const result = await this.elasticService.update({
      index: 'users',
      id: updateUserDto.email,
      body: {
        doc: {
          username: updateUserDto.username,
          password: updateUserDto.password,
        },
      },
    });
    return result;
  }
}
