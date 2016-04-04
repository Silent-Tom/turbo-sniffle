var fs = require('fs');
var buddyFilter = require(__dirname + '/../lib/filter/buddy.js');

var json = fs.readFileSync(__dirname + "/get_battle_init_data-morphing_boss.json").toString();
try {
  json = JSON.parse(json);
} catch (e) {
  json = new Function('return ' + json)();
}
json = json.battle.buddy;

buddyFilter.update(json);
