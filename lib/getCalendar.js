var request = require('request');
var moment = require('moment');

/**
 * Use the username/password to login to CompusOffice and download the *.ics file
 *
 * @param {object} data - User Object
 + @param {function} callback
 */
module.exports = function(data, callback){
  // Always use a fresh cookie jar. (Cookies stay tasty)
  request = request.defaults({ jar: request.jar() });

  request.post("https://www.campus.rwth-aachen.de/office/views/campus/redirect.asp", { form: { u : data.username, p : data.password } }, function (error, response) {
    console.log(response.headers);
    if (response.headers.location && response.headers.location.indexOf('default.asp?timeout=true') !== -1){
      return callback(new Error('Benutzername oder Passwort falsch'));
    }

    var start = moment().subtract(1, 'Month').format('DD.MM.YYYY');
    var end   = moment().add(8, 'Month').format('DD.MM.YYYY');

    request.get('https://www.campus.rwth-aachen.de/office/views/calendar/iCalExport.asp?startdt='+start+'&enddt='+end+'%2023:59:59', callback);
  });
};