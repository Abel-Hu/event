/**
 * 重写thinkjs的float验证规则
 */
think.validate('float', (value, min, max) => {
  const _value = parseFloat(value) || undefined;
  const _min = parseFloat(min) || undefined;
  const _max = parseFloat(max) || undefined;
  if (!think.isEmpty(_value) && (think.isEmpty(_min) || think.isEmpty(_max))) {
    return true;
  }
  return _value >= _min && _value <= _max;
});
