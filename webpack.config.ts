/*
 * @Author: Luoxiangyu
 * @LastEditors: Luoxiangyu
 */
module.exports = {
  // ... 其他配置
  target: 'node', // 关键：指定为 Node.js 环境
  externals: {
    // 排除所有 node_modules 依赖，让它们保持为外部依赖
    '@nestjs/core': '@nestjs/core',
    '@nestjs/common': '@nestjs/common',
    '@nestjs/platform-express': '@nestjs/platform-express',
    // 或者排除所有 node_modules
  },
  externalsPresets: { node: true }, // 或者使用这个
};
