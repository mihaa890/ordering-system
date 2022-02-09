const yaml = require('js-yaml');
const fs = require('fs');

function loadConfigFile (file) {
    try {
      return yaml.load(fs.readFileSync(file, 'utf8'))
    } catch (e) {
      if (!/ENOENT:\s+no such file or directory/.test(e)) {
        console.log('Error Loading ' + file + ':', e)
        throw e
      }
    }
  }
  
  function load(){
    try{
      const env = process.env.NODE_ENV
      return loadConfigFile(`config.${env.trim()}.yml`)
    }
    catch(e){
      console.log(e)
    }

  }
  module.exports = {
      loadConfigFile,
      load
  }