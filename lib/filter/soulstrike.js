/**
 * 
 *
 */
var loaded_sb;

exports.update = function(json) {
	
    for (var buddy in json.battle.buddy) {
		var playerId = json.battle.buddy[buddy].id;
		loaded_sb = undefined;
		
		// Specific Character Event
		switch (playerId) {
			case '15000100':
				// Ramza
				loaded_sb = require(__dirname + '/../properties/ramza.json');
				break;
			case '15000200':
				// Agrias
				loaded_sb = require(__dirname + '/../properties/agrias.json');
				
				// Resistance
				json.battle.buddy[buddy].params[0].def_attributes.push({attribute_id: 107,factor: 11});
				break;
			case '11000200':
				// Yuna
				loaded_sb = require(__dirname + '/../properties/yuna.json');
				
				// SSB/BSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '8') {
					json.battle.buddy[buddy].weapon_effect = loaded_sb.supporter[1].weapon_effect;
				} else if (json.battle.buddy[buddy].weapon.category_id == '15') {
					json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
					json.battle.buddy[buddy].weapon_effect = loaded_sb.supporter[0].weapon_effect;
				}
				break;
			case '10200400':
				// Leon
				loaded_sb = require(__dirname + '/../properties/leon.json');
				break;
			case '10300100':
				// Luneth
				loaded_sb = require(__dirname + '/../properties/steiner.json');
				break;
			case '10400200':
				// Paladin Cecil
				loaded_sb = require(__dirname + '/../properties/palacecil.json');
				
				// SSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '2') {
					json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
				}
				break;
			case '10500800':
				// Bartz
				loaded_sb = require(__dirname + '/../properties/bartz.json');
				
				// SSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '2') {
					json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
				}
				break;
			case '10600300':
				// Locke
				loaded_sb = require(__dirname + '/../properties/locke.json');
				break;
			case '10600400':
				// Celes
				loaded_sb = require(__dirname + '/../properties/celes.json');
				break;
			case '10600800':
				// Shadow
				loaded_sb = require(__dirname + '/../properties/shadow.json');
				break;
			case '10700100':
				// Cloud
				loaded_sb = require(__dirname + '/../properties/cloud.json');
				
				// SSB/BSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '2') {
					if (json.battle.buddy[buddy].dress_record_id == '0') {
						json.battle.buddy[buddy].weapon = loaded_sb.supporter[1].weapon;
					} else {
						json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
					}
				}
				
				break;
			case '10700300':
				// Tifa
				loaded_sb = require(__dirname + '/../properties/tifa.json');
				break;
			case '10700600':
				// Yuffie
				loaded_sb = require(__dirname + '/../properties/yuffie.json');
				
				// SSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '1') {
					json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
					json.battle.buddy[buddy].params[0].atk_type = '2';
				}
				break;
			case '10700800':
				// Vincent
				loaded_sb = require(__dirname + '/../properties/vincent.json');
				break;
			case '10700900':
				// Zack
				loaded_sb = require(__dirname + '/../properties/zack.json');
				
				// SSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '2') {
					json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
				}
				break;
			case '10800100':
				// Squall
				loaded_sb = require(__dirname + '/../properties/squall.json');
				
				// SSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '2') {
					json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
				}
				break;
			case '10800200':
				// Rinoa
				loaded_sb = require(__dirname + '/../properties/rinoa.json');
				
				// SSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '13') {
					json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
					json.battle.buddy[buddy].weapon_effect = loaded_sb.supporter[0].weapon_effect;
				}
				break;
			case '10800500':
				// Selphie
				loaded_sb = require(__dirname + '/../properties/selphie.json');
				
				// SSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '8') {
					json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
					json.battle.buddy[buddy].weapon_effect = loaded_sb.supporter[0].weapon_effect;
				}
				break;
			case '10800700':
				// Seifer
				loaded_sb = require(__dirname + '/../properties/seifer.json');
				break;
			case '11200100':
				// Vaan
				loaded_sb = require(__dirname + '/../properties/vaan.json');
				break;
			case '11200300':
				// Fran
				loaded_sb = require(__dirname + '/../properties/fran.json');
				break;
			case '11300100':
				// Lightning
				loaded_sb = require(__dirname + '/../properties/lightning.json');
				
				// SSB Weapon
				if (json.battle.buddy[buddy].weapon.category_id == '15') {
					json.battle.buddy[buddy].weapon = loaded_sb.supporter[0].weapon;
					json.battle.buddy[buddy].weapon_effect = loaded_sb.supporter[0].weapon_effect;
				}
				break;
		}
		
		if (loaded_sb) {
			// Add assets
			json.assets = jsonConcat(json.assets, loaded_sb.assets);
			
			// Add Soul Strike
			for (var sbindex in loaded_sb.supporter) {
				if (json.battle.buddy[buddy].soul_strikes.length < 4) {
					// Check for existing entry before pushing to avoid duplicates
					if (JSON.stringify(json.battle.buddy[buddy].soul_strikes).indexOf(loaded_sb.supporter[sbindex].soul_strikes[0].ability_id) == -1) {
						json.battle.buddy[buddy].soul_strikes.push(loaded_sb.supporter[sbindex].soul_strikes[0]);
						json.battle.buddy[buddy].soul_strikes[json.battle.buddy[buddy].soul_strikes.length-1].slot = json.battle.buddy[buddy].soul_strikes.length;
						
						// Additional adjustments for BSSB
						if (json.battle.buddy[buddy].soul_strikes[json.battle.buddy[buddy].soul_strikes.length-1].options.status_ailments_id == "532") {
							// For BSB Command Panels
							json.battle.buddy[buddy].spare_panels[0] = loaded_sb.supporter[0].spare_panels[0];
							json.battle.buddy[buddy].spare_panels[1] = loaded_sb.supporter[0].spare_panels[1];
							
							json.battle.buddy[buddy].abilities.push(loaded_sb.supporter[0].abilities[1]);
							json.battle.buddy[buddy].abilities.push(loaded_sb.supporter[0].abilities[2]);
							json.battle.buddy[buddy].abilities.push(loaded_sb.supporter[0].abilities[3]);
						}
						// End adjustments
					}
				}
			}
		}
		
		// Inherit Roaming Warrior SB
		for (var supporter in json.battle.supporter) {
			var supporterId = json.battle.supporter[supporter].id;
			if (playerId == supporterId) {
				if (json.battle.buddy[buddy].soul_strikes.length < 4) {
					if (JSON.stringify(json.battle.buddy[buddy].soul_strikes).indexOf(json.battle.supporter[supporter].soul_strikes[0].ability_id) == -1) {
						json.battle.buddy[buddy].soul_strikes.push(json.battle.supporter[supporter].soul_strikes[0]);
						json.battle.buddy[buddy].soul_strikes[json.battle.buddy[buddy].soul_strikes.length-1].slot = json.battle.buddy[buddy].soul_strikes.length;
						if (json.battle.buddy[buddy].soul_strikes[json.battle.buddy[buddy].soul_strikes.length-1].options.status_ailments_id == "532") {
							// For BSB Command Panels
							json.battle.buddy[buddy].spare_panels[0] = json.battle.supporter[supporter].spare_panels[0];
							json.battle.buddy[buddy].spare_panels[1] = json.battle.supporter[supporter].spare_panels[1];
						}
					}
				}
				
			}
		}
		
		
	}

	return json;
};

function jsonConcat(o1, o2) {
 for (var key in o2) {
  o1[key] = o2[key];
 }
 return o1;
}
