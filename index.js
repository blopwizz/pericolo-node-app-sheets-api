const fs = require('fs');
var api = require('./api-google.js')
const ID_SPREADSHEET = '14Ly7dabKmGG4sxxOKiY1oB6DHTIEqoVcupzfO1nUkn4';
const NAME_SHEET = 'Pictures';

/** Load client credentials, then call the Google Sheets API and authorise.
 * To get the credentials.json file, you have to create it here :
 *  https://developers.google.com/sheets/api/quickstart/nodejs
 * */
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  api.authorize(JSON.parse(content), action);
});

function action(auth) {
  const sheets = api.google.sheets({version: 'v4', auth});
  let values = [
    [
      '9451709',	
      'stgarti@gmail.com',	
      "1 Place du Jardin Zoologique, 13006, Marseille",
      "2019-04-30T21:43:52",
      "La cage d'escalier",
      "Une fissure sous la volée de marches",
      "https://storage.googleapis.com/media.helloumi.com/customers/9451709/AQT406K2VMDX043L7U0AKCB49N389NAE.png",
      "added_picture"
    ]
  ];
  const resource = {
    values
  };
  write(sheets, resource)
}

function read(sheets, range) {
  sheets.spreadsheets.values.get({
    spreadsheetId: ID_SPREADSHEET,
    range: NAME_SHEET + '!' + 'A1:H6', // Google Sheets syntex "Sheet 1!A1:A1000"
  }, (err, res) => {
    if (err) return console.log('The  API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('data : ');
      rows.map((row) => {
        console.log(`${row[5]}, ${row[6]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}

function write(sheets, resource) {
  sheets.spreadsheets.values.update({
    spreadsheetId : ID_SPREADSHEET,
    range: NAME_SHEET + '!' + 'A7:H7',
    valueInputOption: "RAW",
    resource,
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log('%d cells updated.', result.updatedCells);
    }
  });
}

module.export = {
  action
}