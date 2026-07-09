/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from 'entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';

interface Login {
  code?: string;
  name: string;
  password: string;
}

interface ChangeUser {
  id: number;
  classid: number;
}

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async login(body: Login): Promise<User | null> {
    // const params = {
    //   appid: 'wxa49311a37e7b66e9',
    //   secret: '1a7e3fecc3d85f2a8578bca8d69c7401',
    //   js_code: body.code,
    //   grant_type: 'authorization_code',
    // };
    // const response = await lastValueFrom(
    //   this.httpService.get('https://api.weixin.qq.com/sns/jscode2session', {
    //     params,
    //   }),
    // );
    // console.log(response.data);
    const user = await this.userRepository.findOneBy({ name: body.name });

    console.log(user);

    return user;
  }
  async regist(params: any): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await this.userRepository.save(params);
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async changeUser(body: ChangeUser) {
    let data = {};
    const user = await this.userRepository.findOne({ where: { id: body.id } });
    if (!user) {
      data = {
        code: 500,
        msg: '用户不存在',
      };
    } else {
      user.classid = body.classid;
      await this.userRepository.save(user);
      data = {
        code: 200,
        msg: '修改成功',
      };
    }
    return data;
  }
}
