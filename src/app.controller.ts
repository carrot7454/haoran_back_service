/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface Login {
  name: string;
  password: string;
  code?: string;
}

interface Regist extends Login {
  nickname: string;
  classid: number;
}

interface Response {
  name: string;
  nickname: string;
  auth: number;
  level: number;
  id: number;
  password: string;
}

interface ChangeUser {
  id: number;
  classid: number;
}

@Controller('user')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  async login(@Body() body: Login): Promise<any> {
    console.log('============>login');

    console.log(body.name);

    const { name, password } = body;
    if (!name) {
      return { code: 500, message: '用户名不能为空' };
    }
    if (!password) {
      return { code: 500, message: '密码不能为空' };
    }

    const data = await this.appService.login(body);
    if (!data) {
      return { code: 500, message: '用户不存在' };
    }
    if (data.password !== password) {
      return { code: 500, message: '密码错误' };
    }

    return {
      code: 200,
      message: '登录成功',
      data: {
        id: data.id,
        name: data.name,
        nickname: data.nickname,
        auth: data.auth,
        level: data.level,
        classid: data.classid,
      },
    };
  }
  @Post('regist')
  async regist(@Body() body: Regist): Promise<any> {
    console.log(body);
    const ret: { code: number; message: string; data?: any } = {
      code: 500,
      message: '注册失败',
      data: null,
    };
    console.log(body.name);
    console.log(body.password);
    console.log(body.nickname);
    if (!body.name) {
      ret.message = '用户名不能为空';
      return ret;
    }
    if (!body.password) {
      ret.message = '密码不能为空';
      return ret;
    }
    if (!body.nickname) {
      ret.message = '昵称不能为空';
      return ret;
    }
    if (!body.classid) {
      ret.message = '班级不能为空';
      return ret;
    }
    const data: unknown = await this.appService.regist(body);
    if (data) {
      ret.code = 200;
      ret.message = '注册成功';
      ret.data = data;
    } else {
      ret.code = 500;
      ret.message = '注册失败';
    }

    return ret;
  }
  @Post('changeUser')
  async changeUser(@Body() body: ChangeUser): Promise<any> {
    console.log(body);
    const ret = await this.appService.changeUser(body);
    return ret;
  }
}
