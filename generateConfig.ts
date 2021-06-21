import * as fs from "fs";
require('dotenv').config();

fs.readFile('./subgraph.template.yaml', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  let result = data;

  ["MONEYPOOL", "LTOKEN", "DTOKEN", "TOKENIZER", "CONNECTOR"].forEach((key) => {
    result = result.replace(new RegExp(`{${key}}`, "g"), process.env[key] || key)
  })


  fs.writeFile('./subgraph.yaml', result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});