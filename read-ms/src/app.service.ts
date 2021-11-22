import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly elasticService: ElasticsearchService) {}
  async fakeUsers() {
    for (let i = 0; i < 10; i++) {
      await this.elasticService.index({
        index: 'users',
        body: {
          username: `oussema200${i}`,
          password: `${i}`,
          email: `zouaghi.wow199${i}@gmail.com`,
        },
      });
    }
  }
  async findAll(): Promise<User[]> {
    const data = await (this.elasticService.search({
      index: 'users',
      size: 200,
      body: {
        query: {
          match_all: {},
        },
      },
    }) as unknown as any);
    console.log(data.body.hits);
    const cleanedData = data.body.hits.hits.map((el) => {
      const payload = el._source;
      return {
        username: payload.username,
        email: payload.email,
        password: payload.password,
      };
    });
    return cleanedData;
  }

  async findUserByEmail(email: string): Promise<User> {
    const { body } = (await this.elasticService.search({
      index: 'users',
      body: {
        query: {
          match_phrase_prefix: {
            email,
          },
        },
      },
    })) as any;
    const clearedData = (body.hits.hits as any).map((e) => ({
      username: e._source.username,
      password: e._source.password,
      email: e._source.email,
    }));
    return clearedData.length === 0 ? [] : clearedData[0];
  }
}
