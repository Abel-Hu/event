const Application = require('thinkjs');
const path = require('path');

const instance = new Application({
  ROOT_PATH: __dirname,
  env: __filename.replace(`${__dirname}${path.sep}`, '').replace('.js', ''),
});

instance.run();