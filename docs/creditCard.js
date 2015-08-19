'use strict';

var defaultFormat = /(\d{1,4})/g;
var defaultInputFormat =  /(?:^|\s)(\d{4})$/;
var cards = {
	'maestro': {,
		pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,		
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [12, 13, 14, 15, 16, 17, 18, 19],
		cvcLength: [3],
		luhn: true
	},
	'dinersclub': {,
		pattern: /^(36|38|30[0-5])/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [14],
		cvcLength: [3],
		luhn: true
	},
	'laser': {
		pattern: /^(6706|6771|6709)/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16, 17, 18, 19],
		cvcLength: [3],
		luhn: true
	},
	'jcb': {
		pattern: /^35/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16],
		cvcLength: [3],
		luhn: true
	},
	'unionpay': {
		pattern: /^62/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16, 17, 18, 19],
		cvcLength: [3],
		luhn: false
	},
	'discover': {
		pattern: /^(6011|65|64[4-9]|622)/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16],
		cvcLength: [3],
		luhn: true
	},
	'mastercard': {
		pattern: /^5[1-5]/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16],
		cvcLength: [3],
		luhn: true
	},
	'amex': {
		pattern: /^3[47]/,
		format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
		inputFormat: /^(\d{4}|\d{4}\s\d{6})$/,
		length: [15],
		cvcLength: [3, 4],
		luhn: true
	},
	'visa': {
		pattern: /^4/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [13, 14, 15, 16],
		cvcLength: [3],
		luhn: true
	},
	'types': ['maestro', 'dinersclub', 'laser', 'jcb', 'unionpay', 'discover', 'mastercard', 'amex', 'visa']
};

function getCardFromNumber(num){
	var card;
	for(var key in cards){
		if(cards.hasOwnProperty(key)){
			card = cards[key];
			if (card.pattern.test(num)) {
				return card;
			}
		}
	}
}

function getCardFromType(type) {
	return cards[type];
}

//https://github.com/laurihy/angular-payments/blob/master/src/cards.js

var indexOf = Array.prototype.indexOf || function(item) { 
	for (var i = 0, l = this.length; i < l; i++) {
		if (i in this && this[i] === item) return i; 
	} 
	return -1; 
};

function luhnCheck(num) {
	var digits = (num + '').split('').reverse(), 
		odd = true, 
		sum = 0, 
		i = 0, 
		len = digits.length,
		digit;

	for (;i < len; i++) {		
		digit = parseInt(digits[i], 10);

		if ((odd = !odd)) {
			digit *= 2;
		}

		if (digit > 9) {
			digit -= 9;
		}

		sum += digit;
	}

	return sum % 10 === 0;
}

function cvcValidate(cvc, type){
	var ref, card = getCardFromType(type);

	if (!/^\d+$/.test(cvc)) {
		return false;
	}

	if (type && card) {
		return indexOf.call(card.cvcLength, cvc.length) !== -1;
	} else {
		return cvc.length >= 3 && cvc.length <= 4;
	}
}

function cardValidate(num){
	var card, ref, typeModel;
	
	num = (num + '').replace(/\s+|-/g, '');

	if (!/^\d+$/.test(num)) {
		return false;
	}

	card = getCardFromNumber(num);

	if(!card) {
		return false;
	}

	return (indexOf.call(card.length, num.length) !== -1) && (!card.luhn || _luhnCheck(num));
}

function expiryValidate(month, year){
	var currentTime, expiry, prefix;

	if (!(month && year)) {
		return false;
	}

	if (!/^\d+$/.test(month)) {
		return false;
	}

	if (!/^\d+$/.test(year)) {
		return false;
	}

	if (!(parseInt(month, 10) <= 12)) {
		return false;
	}

	if (year.length === 2) {
		prefix = (new Date).getFullYear();
		prefix = prefix.toString().slice(0, 2);
		year = prefix + year;
	}

	expiry = new Date(year, month);
	currentTime = new Date;
	expiry.setMonth(expiry.getMonth() - 1);
	expiry.setMonth(expiry.getMonth() + 1, 1);

	return expiry > currentTime;
}

aaa.factory('_Validate', ['Cards', 'Common', '$parse', function(Cards, Common, $parse){



  return function(type, val, ctrl, scope, attr){
    if(!_validators[type]){

      types = Object.keys(_validators);

      errstr  = 'Unknown type for validation: "'+type+'". ';
      errstr += 'Should be one of: "'+types.join('", "')+'"';

      throw errstr;
    }
    return _validators[type](val, ctrl, scope, attr);
  }
}]);












function validate(cpfNumber){
	cpfNumber += "";
	cpfNumber = cpfNumber.replace(/\D/gi, "");
	if(cpfNumber.length !== 11){
		return false;
	}

	if(/(^1{11}$)/.test(cpfNumber)||
	   /(^2{11}$)/.test(cpfNumber)||
	   /(^3{11}$)/.test(cpfNumber)||
	   /(^4{11}$)/.test(cpfNumber)||
	   /(^5{11}$)/.test(cpfNumber)||
	   /(^6{11}$)/.test(cpfNumber)||
	   /(^7{11}$)/.test(cpfNumber)||
	   /(^8{11}$)/.test(cpfNumber)||
	   /(^9{11}$)/.test(cpfNumber)||
	   /(^0{11}$)/.test(cpfNumber)){
		return false;
	}
	
	return cpfNumber.slice(-2) === getChecksum(cpfNumber);
}

function generate(type){
	var cpfNumber = "";
	for(var i=0;i<9;i++){
		cpfNumber += Math.floor(Math.random()*10);
	}
	return cpfNumber + getChecksum(cpfNumber);
}

function generateWithMask(){
	return generate().replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"$1.$2.$3-$4");
}

module.exports = {
	validate : validate,
	generate: generate,
	generateWithMask: generateWithMask
};