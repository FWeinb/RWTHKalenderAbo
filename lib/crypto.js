var crypto = require('crypto');
var key = process.env.rwthSecretKey || 'UNSECURE UNLESS CHANGED OR ENV VAR SET';

var encrypt = function(plaintext){
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var encryptedPassword = cipher.update(plaintext, 'utf8', 'base64');
  encryptedPassword += cipher.final('base64');
  return encryptedPassword;
};

var decrypt = function(encrypted){
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decryptedPassword = decipher.update(encrypted, 'base64', 'utf8');
  decryptedPassword += decipher.final('utf8');

  return decryptedPassword;
};


module.exports = {
  encrypt : function(obj){
    var encrytpedObjStr = encrypt(JSON.stringify(obj));
    return encrytpedObjStr;
  },

  decrypt : function(objStr){
    try{
      var decrytpedObjStr = decrypt(objStr);
      return JSON.parse(decrytpedObjStr);
    } catch (e) {
      return null;
    }
  },
};

