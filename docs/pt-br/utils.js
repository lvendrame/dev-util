'use strict';

function calcMod11 (number){
	number = 11 - (number % 11);
	return (number > 9) ? 0 : number;
}

module.exports = {
	calcMod11 : calcMod11
};