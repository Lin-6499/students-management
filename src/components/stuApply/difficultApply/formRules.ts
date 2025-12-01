export const validateIncome = (rule, value, callback) => {
  // 允许空值（由 required 规则处理）
  if (value === '' || value == null) {
    return callback();
  }

  const num = Number(value);
  // 检查是否为有效数字
  if (isNaN(num) || num <= 0) {
    callback(new Error('请输入有效的正整数'));
  }
  // 检查数值范围（例如：100 ~ 10,000,000）
  else if (num < 100 || num > 10000000) {
    callback(new Error('家庭年收入应在 100 ~ 10,000,000 元之间'));
  }
  else {
    callback();
  }
};
export const validateDescription = (rule, value, callback) => {
  // 允许空值由 required 规则处理，这里只关注长度
  if (value === '' || value == null) {
    return callback(); // 交给 required 判断是否必填
  }

  const len = value.length;

  if (len < 100) {
    callback(new Error('申请理由不少于 100 字'));
  } else if (len > 300) {
    callback(new Error('申请理由不超过 300 字'));
  } else {
    callback(); // 验证通过
  }
};
