var metaData = require('../data/metaData.json');

var locRegEx = /^(LOCATION:)([^ ]+)(.+?)$/gm;
var addDescription = function(ics, result){

  // Remove other DESCRIPTION
  ics = ics.replace(/DESCRIPTION:\r?\n?/g, '');

  // Prepend new DESCRIPTION after each LOCATION (if metadata exists)
  ics = ics.replace(locRegEx, function(all, before, roomid, after){
    var roomData = metaData[roomid];
    if (roomData){

      var newLocation = before + roomid + ' ' + roomData.Raumname;

      newLocation += '\nDESCRIPTION:';
      newLocation += 'Raumart: ' + roomData.Raumart+ '\\n';
      newLocation += 'Geschoss: ' + roomData.Geschoss + '\\n';
      newLocation += '\\n';

      newLocation += 'Anschrift: ' + roomData.Gebaeudeanschrift + '\\n';
      newLocation += 'Hörsaalgruppe: ' + roomData.Hoersaalgruppe + '\\n';
      newLocation += '\\n';

      // Add link to google maps
      if (roomData.location) {
        newLocation += 'Karte: \\nhttp://maps.google.com/maps?z=12&t=m&q=loc:' + roomData.location.lat + '+' + roomData.location.lng + '\\n\\n';
      }

      // Add link to Campus
      newLocation += 'Mehr: \\nhttp://www.campus.rwth-aachen.de/rwth/all/room.asp?room=' + roomid + '\\n';

      return newLocation;
    } else {
      return all;
    }
  });

  return ics;
};

module.exports = addDescription;