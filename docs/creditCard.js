'use strict';

var defaultFormat = /(\d{1,4})/g;
var defaultInputFormat =  /(?:^|\s)(\d{4})$/;
var cards = {
	'maestro': {
		pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,		
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [12, 13, 14, 15, 16, 17, 18, 19],
		defaultLength: 16,
		cvcLength: [3],
		luhn: true,
		prefixList:["5018", "5020", "5038", "6304", "6759", "6761", "6762", "6763"]
	},
	'dinersclub': {
		pattern: /^(36|38|30[0-5])/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [14],
		defaultLength: 14,
		cvcLength: [3],
		luhn: true,
		prefixList:["300", "301", "302", "303", "36", "38"]
	},
	'laser': {
		pattern: /^(6706|6771|6709)/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16, 17, 18, 19],
		defaultLength: 16,
		cvcLength: [3],
		luhn: true,
		prefixList:["6706", "6771", "6709"]
	},
	'jcb': {
		pattern: /^35/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16],
		defaultLength: 16,
		cvcLength: [3],
		luhn: true,
		prefixList:["35"]
	},
	'unionpay': {
		pattern: /^62/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16, 17, 18, 19],
		defaultLength: 16,
		cvcLength: [3],
		luhn: false,
		prefixList:["62"]
	},
	'discover': {
		pattern: /^(6011|65|64[4-9]|622)/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16],
		defaultLength: 16,
		cvcLength: [3],
		luhn: true,
		prefixList:["6011"]
	},
	'mastercard': {
		pattern: /^5[1-5]/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [16],
		defaultLength: 16,
		cvcLength: [3],
		luhn: true,
		prefixList:["51", "52", "53", "54", "55"]
	},
	'amex': {
		pattern: /^3[47]/,
		format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
		inputFormat: /^(\d{4}|\d{4}\s\d{6})$/,
		length: [15],
		defaultLength: 15,
		cvcLength: [3, 4],
		luhn: true,
		prefixList:["34", "37"]
	},
	'visa': {
		pattern: /^4/,
		format: defaultFormat,
		inputFormat: defaultInputFormat,
		length: [13, 14, 15, 16],
		defaultLength: 16,
		cvcLength: [3],
		luhn: true,
		prefixList:["4539", "4556", "4916", "4532", "4929", "40240071", "4485", "4716", "4"]
	}
};

cards['types'] = (function(cards){
		var types = [];
		for(var type in cards){
			if(cards.hasOwnProperty(type) && type !== 'types'){
				types.push(type);
			}
		}
		return types;
	}(cards));

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

	return (indexOf.call(card.length, num.length) !== -1) && (!card.luhn || luhnCheck(num));
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

function completedNumber(prefix, length) {
	var ccnumber = prefix + "",
		lenl1 = length - 1,
		lenl2 = length - 2,
		sum = 0,
		pos = 0,
		reverseCC,
		odd;

	while (ccnumber.length < lenl1) {
		ccnumber += parseInt(Math.random() * 10);
	}

	reverseCC = ccnumber.split('').reverse().join('');
	while (pos < lenl1 ) {
		odd = parseInt(reverseCC[pos]) * 2;
		if (odd > 9) {
			odd -= 9;
		}
		
		sum += odd;
		if (pos != lenl2) {
			sum += parseInt(reverseCC[pos+1]);
		}
		pos += 2;
	}
	
	return ccnumber + ((Math.floor(sum/10) + 1) * 10 - sum) % 10;
}
	
function creditCardNumber(card) {
	var ccnumber = card.prefixList[parseInt(Math.random() * card.prefixList.length)];
	return completedNumber(ccnumber, card.defaultLength);
}

function validate(cardNumber){	
	return cardValidate(cardNumber);
}

function generate(type){
	type = type || 'visa';
	var card = cards[type];
	card = card || cards['visa'];
	return creditCardNumber(card);
}

function generateWithMask(type){
	return generate(type).replace(/^(\d{4})(\d{4})(\d{4})(\d*)/g,"$1 $2 $3 $4");
}

module.exports = {
	validate : validate,
	generate: generate,
	generateWithMask: generateWithMask
};