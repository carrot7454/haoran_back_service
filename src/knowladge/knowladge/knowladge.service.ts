/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { KnowladgeEntity } from 'entity/knowladge.entity';
import { ClassEntity } from 'entity/class.entity';
import { Repository } from 'typeorm';
import * as XLSX from 'xlsx';
import { ClassClassifyEntity } from 'entity/classClassify.entity';

interface KnowladgeDto {
  name: string;
  classid?: string;
  serialid?: string;
}

interface KnowladgeResponse {
  message: string;
  code: number;
  data?: any;
}

interface KnowladgeListDto extends ClassEntity {
  knowladges?: KnowladgeEntity[];
  children?: KnowladgeEntity1[];
}

interface KnowladgeEntity1 {
  id?: string;
  name?: string;
}

interface PageDto {
  page: number;
  size: number;
}

interface KnowladgePageResponse {
  page: number;
  size: number;
  total: number;
  list: any[];
}

interface KnowladgeMutiUploadResponse {
  message: string;
  code: number;
  data?: any;
}
interface TreeNode {
  code: string | number;
  parentCode: string | number | null;
  children?: TreeNode[];
  [key: string]: any; // 允许其他属性
}

interface TreeOptions {
  idKey?: string;
  parentIdKey?: string;
  childrenKey?: string;
  rootId?: string | number | null;
}

@Injectable()
export class KnowladgeService {
  constructor(
    @InjectRepository(KnowladgeEntity)
    private knowladgeRepository: Repository<KnowladgeEntity>,

    @InjectRepository(ClassClassifyEntity)
    private classClassifyRepository: Repository<ClassClassifyEntity>,

    @InjectRepository(ClassEntity)
    private classEntityRepository: Repository<ClassEntity>,
  ) {}

  async add(body: KnowladgeDto): Promise<KnowladgeResponse> {
    let data: KnowladgeResponse;
    try {
      let _dt = {};
      if (body.classid) {
        const code = body.classid;
        if (body.serialid) {
          console.log(body.serialid);
          const ls = await this.classClassifyRepository.find({
            where: { parentCode: code + body.serialid },
          });
          const tmp_code = this.addzero(ls.length + 1);
          _dt = {
            code: body.serialid + tmp_code,
            name: body.name,
            parentCode: body.serialid,
            step: code + '/' + body.serialid + '/' + body.serialid + tmp_code,
          };
        } else {
          const ls = await this.classClassifyRepository.find({
            where: { parentCode: code },
          });
          const tmp_code = this.addzero(ls.length + 1);
          _dt = {
            code: code + tmp_code,
            name: body.name,
            parentCode: code,
            step: code + '/' + code + tmp_code,
          };
        }
      } else {
        const _class = await this.classEntityRepository.findOne({
          where: { name: body.name },
        });
        console.log(_class);
        if (!_class) {
          data = {
            message: '未找到班级',
            code: 404,
          };
          return data;
        } else {
          const code = this.addzero(_class.id);
          _dt = {
            code: code,
            name: _class.name,
            parentCode: '0',
            step: code,
          };
        }
      }
      console.log(_dt);
      const dt = await this.classClassifyRepository.save(_dt);
      data = {
        message: '添加成功',
        code: 200,
        data: dt,
      };
    } catch (error) {
      data = {
        message: error instanceof Error ? error.message : String(error),
        code: 500,
      };
    }
    return data;
  }

  async getClassList(): Promise<ClassEntity[]> {
    return await this.classEntityRepository.find();
  }

  async getKnowladgeList(body: PageDto): Promise<KnowladgePageResponse> {
    console.log(body);
    const knowladges = await this.knowladgeRepository
      .createQueryBuilder('knowladge')
      .leftJoinAndSelect('knowladge.className', 'class')
      .orderBy('class.id', 'ASC')
      .skip((body.page - 1) * body.size)
      .take(body.size)
      .getMany();

    return {
      list: knowladges.map((item) => ({
        id: item.id,
        knowladgename: item.name,
        classid: (item.className as ClassEntity | null | undefined)?.id ?? null,
        classname: (item.className?.name as string | undefined) ?? null,
      })),
      total: await this.knowladgeRepository.count(),
      page: body.page,
      size: body.size,
    };
  }

  async simpleKnowledge(): Promise<KnowladgeResponse> {
    let data: KnowladgeListDto[] = [];
    try {
      data = await this.classEntityRepository
        .createQueryBuilder('class')
        .leftJoinAndSelect('class.knowladges', 'knowladges')
        .getMany();

      data = data.map((item) => {
        item.children = (item.knowladges ?? []).map(({ id, name }) => ({
          id,
          name,
        }));
        return item;
      });

      if (data.length === 0) {
        return {
          message: '未找到知识点',
          code: 404,
        };
      }
      return {
        message: '查询成功',
        code: 200,
        data,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : String(error),
        code: 500,
      };
    }
  }

  addzero(num: number | string): string {
    return Number(num) < 10 ? '0' + num : num.toString();
  }

  async mutiUpload(buffer: Buffer): Promise<KnowladgeMutiUploadResponse> {
    try {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      console.log(workbook);
      const sheetName = workbook.SheetNames;
      if (!sheetName) {
        return {
          message: 'Excel文件中没有工作表',
          code: 400,
        };
      }
      const ret_result: any[] = [];
      if (sheetName[0]) {
        const sheet = workbook.Sheets[sheetName[0]];

        const data: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        if (data.length < 2) {
          return {
            message: 'Excel文件中没有数据',
            code: 400,
          };
        }

        data.shift(); // Remove the first row (header)

        const classlist = await this.classEntityRepository.find();

        const classMap: Record<string, string> = {};
        classlist.forEach((item) => {
          classMap[item.name] = item.id.toString();
        });

        const obj: Record<
          string,
          { code: string; step: string; parentCode: string }
        > = {};

        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          let _step = '';
          let _code = '';
          if (!obj[element[0]]) {
            _code = this.addzero(classMap[element[0]]);
            obj[element[0]] = {
              code: _code,
              step: (_step += _code),
              parentCode: '0',
            };
          } else {
            _code = obj[element[0]].code;
            _step = obj[element[0]].code;
          }
          const chapterKey = `第${element[3]}章-${element[4]}`;
          if (!obj[chapterKey]) {
            const parentCode = _code;
            _code = _code += element[3];
            obj[chapterKey] = {
              code: _code,
              step: (_step += '/' + _code),
              parentCode: parentCode,
            };
          } else {
            _code = obj[chapterKey].code;
            _step += '/' + obj[chapterKey].code;
          }
          const sectionKey = `第${element[5]}节-${element[6]}`;
          if (!obj[sectionKey]) {
            const parentCode = _code;
            _code = _code += element[5];
            obj[sectionKey] = {
              code: _code,
              step: (_step += '/' + _code),
              parentCode: parentCode,
            };
          }
        }

        for (const key in obj) {
          const item = obj[key];
          const entity = {
            name: key,
            ...item,
          };
          ret_result.push(entity);
        }
      }

      if (sheetName[3]?.length > 2) {
        const sheet = workbook.Sheets[sheetName[3]];
        const data: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        data.shift(); // Remove the first row (header)
        console.log(data);
        const obj: Record<
          string,
          { code: string; step: string; parentCode: string }
        > = {};
        obj['中考'] = {
          code: '04',
          step: '04',
          parentCode: '0',
        };
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          let _step = '04';
          let _code = '';
          if (!obj[element[1]]) {
            _code = '04' + element[0];
            obj[element[1]] = {
              code: _code,
              step: (_step += '/' + _code),
              parentCode: '04',
            };
          } else {
            _code = obj[element[1]].code;
            _step = _step + '/' + obj[element[1]].code;
          }
          if (!obj[element[4]]) {
            const parentCode = _code;
            _code = _code += element[3];
            obj[element[4]] = {
              code: _code,
              step: (_step += '/' + _code),
              parentCode: parentCode,
            };
          }
        }
        for (const key in obj) {
          const item = obj[key];
          const entity = {
            name: key,
            ...item,
          };
          ret_result.push(entity);
        }
      }

      if (sheetName[4]?.length > 2) {
        const sheet = workbook.Sheets[sheetName[4]];
        const data: string[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        data.shift(); // Remove the first row (header)
        console.log(data);
        const obj: Record<
          string,
          { code: string; step: string; parentCode: string }
        > = {};
        obj['高考'] = {
          code: '08',
          step: '08',
          parentCode: '0',
        };
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          let _step = '08';
          let _code = '';
          if (!obj[element[1]]) {
            _code = '08' + element[0];
            obj[element[1]] = {
              code: _code,
              step: (_step += '/' + _code),
              parentCode: '08',
            };
          } else {
            _code = obj[element[1]].code;
            _step = _step + '/' + obj[element[1]].code;
          }
          if (!obj[element[4]]) {
            const parentCode = _code;
            _code = _code += element[3];
            obj[element[4]] = {
              code: _code,
              step: (_step += '/' + _code),
              parentCode: parentCode,
            };
          }
        }
        for (const key in obj) {
          const item = obj[key];
          const entity = {
            name: key,
            ...item,
          };
          ret_result.push(entity);
        }
      }

      await this.classClassifyRepository
        .createQueryBuilder()
        .insert()
        .into(ClassClassifyEntity)
        .values(ret_result)
        .orIgnore()
        .updateEntity(false)
        .execute();

      return {
        message: '上传成功',
        code: 200,
        data: ret_result,
      };
    } catch (error) {
      return {
        message: error instanceof Error ? error.message : String(error),
        code: 500,
      };
    }
  }

  listToTree(data: TreeNode[], options: TreeOptions = {}): TreeNode[] {
    const {
      idKey = 'code',
      parentIdKey = 'parentCode',
      childrenKey = 'children',
      rootId = null,
    } = options;

    if (!data || !Array.isArray(data)) return [];

    const nodeMap = new Map<string | number, TreeNode>();
    const tree: TreeNode[] = [];

    // 1. 初始化：将所有节点放入 Map，并初始化 children 数组
    // 使用 {...item} 浅拷贝，避免修改原始数据
    data.forEach((item) => {
      const node = { ...item, [childrenKey]: [] };
      nodeMap.set(node[idKey], node);
    });

    // 2. 组装：遍历所有节点，根据 parentId 找到父节点并挂载
    data.forEach((item) => {
      const currentNode = nodeMap.get(item[idKey]);
      if (!currentNode) return;

      const parentId = item[parentIdKey] as string;

      // 判断是否为根节点
      if (parentId === rootId || !nodeMap.has(parentId)) {
        tree.push(currentNode);
      } else {
        // 找到父节点，将当前节点加入父节点的 children
        const parentNode = nodeMap.get(parentId);
        if (parentNode) {
          // 确保父节点有 children 数组（虽然第一步已初始化，但防御性编程）
          let children = parentNode[childrenKey] as TreeNode[] | undefined;
          if (!children) {
            children = [];
            parentNode[childrenKey] = children;
          }
          children.push(currentNode);
        }
      }
    });
    return tree;
  }

  async getMutiClass() {
    try {
      const data = await this.classClassifyRepository.find();
      const tree = this.listToTree(data, { rootId: 0 });
      return {
        message: '查询成功',
        code: 200,
        data: tree,
      };
    } catch (err) {
      return {
        message: err instanceof Error ? err.message : String(err),
        code: 500,
      };
    }
  }
}
