'use strict';// eslint-disable-line

const express = require('express');
const router = express.Router();// eslint-disable-line new-cap
const staticDataImport = require('./../data/static_data');
const fs = require('fs');
let fileHashImport;
fs.readFile('./src/data/hash.txt', 'utf8', (err, contents) => {
  if (err) {
    console.log('!!! error reading file hash: ', err);
  }
  fileHashImport = contents;
  console.log(`fileHashImport: ${fileHashImport}`);
  router.templateConfig = {
    fileHash: fileHashImport,
  };
});


router.get('/hello', (req, res) => {
  let result = '';
  result = '<h1>hulloo wurld</h1>';
  res.send(result);
});

router.get('/', (req, res) => {
  res.render('index', {
    config: router.templateConfig,
    staticData: staticDataImport,
    pageTitle: 'Welcome page',
    title: 'Dan',
    job: 'fe dev',
    techs: [
      'Node',
      'Express',
      'Dust',
      'Webpack',
      'Tooling and boilerplate',
    ],
  });
});

module.exports = router;
