const fs = require('fs');
const path = require('path');

let folderPath = path.resolve(__dirname, '../source/languages');
let distPath = path.resolve(__dirname, '../dist/languages');
fs.mkdirSync(distPath);

fs.readdir(folderPath, (err, files) => {
    files.forEach(file => {
      let json = require(path.resolve(folderPath, file));
      json = JSON.stringify(json);
      fs.writeFile(path.resolve(distPath, file), json, (err) => {
        if (err) throw err;
        console.log(file, ' generated');
      });
    });
  });