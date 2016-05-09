'use strict';// eslint-disable-line

const express = require('express');
const router = express.Router();// eslint-disable-line new-cap
const staticDataImport = require('./data/static_data');

router.templateConfig = {
  devMode: false,
  fileHash: null,
};

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
