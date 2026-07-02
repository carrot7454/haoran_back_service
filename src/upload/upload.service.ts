/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
import { Injectable } from '@nestjs/common';
import qiniu from 'qiniu';
import axios from 'axios';

interface FileType {
  name: string;
  base64: string;
}

@Injectable()
export class UploadService {
  constructor() {}
  async uploadFile(file: FileType): Promise<any> {
    const accessKey = '2jIO9Fv8KwIB3Sgwgnkmulk8D2c8CqrUDiifsT98';
    const secretKey = 'fF_h_SBOit2y_-yvV_ORsmvmK86uRNYc2ROQSCP7';
    const bucketName = 'shizhiquestions';
    console.log(accessKey, secretKey, bucketName);
    const auth = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: bucketName,
      expires: 7200,
    };

    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(auth);
    // let name = cryptojs.enc.Base64.stringify(
    //   cryptojs.enc.Utf8.parse(file.name),
    // );
    // name = saveBase64(name);
    // console.log(name);
    const base64 = file.base64.replace(/^.*?base64,/, '');
    const config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z1;
    let data: unknown = {};
    try {
      const dt = await axios.request<unknown>({
        url: `https://upload-z1.qiniup.com/putb64/-1/keys/${file.name}`,
        method: 'POST',
        headers: {
          Authorization: `UpToken ${uploadToken}`,
          'content-type': 'application/octet-stream',
        },
        data: base64,
      });
      data = {
        code: 200,
        data: dt.data,
        message: '上传成功',
      };
    } catch (error: unknown) {
      console.error('上传失败', error);
      data = {
        code: 500,
        data: error instanceof Error ? error.message : String(error),
        message: '上传失败',
      };
    }

    return data;
  }
}

// const fileSize = (str: string): number => {
//   let filesize = 0;
//   if (str.indexOf('=') > 0) {
//     const indexOf = str.indexOf('=');
//     str = str.substring(0, indexOf); //把末尾的’=‘号去掉
//   }
//   filesize = Math.round(str.length - (str.length / 8) * 2);
//   return filesize;
// };

// const saveBase64 = (base64: string): string => {
//   return base64.replace('+', '-').replace('/', '_');
// };
