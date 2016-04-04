'use strict';// eslint-disable-line

const express = require('express');
const router = express.Router();// eslint-disable-line new-cap

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
    pageTitle: ' - index page',
    title: 'dan',
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
