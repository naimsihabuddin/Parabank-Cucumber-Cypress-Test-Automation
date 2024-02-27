const report = require('multiple-cucumber-html-reporter')
report.generate({
  jsonDir: 'jsonlogs', // ** Path of .json file **//
  reportPath: './reports',
})
