var namesPtBr = require('./pt-br/names');
var regions = {
	'pt-br': namesPtBr
}

function generate(gender, region){
	region = region || 'pt-br';
	var lists = regions[region];
	lists = lists || regions[region];
	
	var name = [],
		genderNames = (gender === 'male' || gender === 'm') ? region.maleFirstNames : region.femaleFirstNames;
		fn = Math.floor(Math.random() * 2) + 1,
		ln = Math.floor(Math.random() * 2) + 1,
		i = 0;
	
	for(;i<fn;i++){
		name.push(genderNames[Math.floor(Math.random() * genderNames.length) + 1]);
	}
	
	for(i=0;i<ln;i++){
		name.push(region.lastNames[Math.floor(Math.random() * region.lastNames.length) + 1]);
	}
	
	return name.join(' ');
}

module.exports = {
	generate: generate
};