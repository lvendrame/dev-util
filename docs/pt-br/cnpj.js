'use strict';

var calcMod11 = require('./utils').calcMod11;

function getChecksum (cnpjNumber){
	cnpjNumber = cnpjNumber.replace(/\D/gi, "");
	var checksumParts = [0,0];
	for(var i=0, fac = 6;i<12;i++){
		var value = parseInt(cnpjNumber[i]);
		checksumParts[1] += value * fac;
		fac--;
		if(fac<2){fac=9;}
		checksumParts[0] += value * fac;
	}

	checksumParts[0] = calcMod11(checksumParts[0]);
	checksumParts[1] += checksumParts[0] * 2;
	checksumParts[1] = calcMod11(checksumParts[1]);
	return checksumParts.join("");
}

function validate (cnpjNumber){
	cnpjNumber += "";
	cnpjNumber = cnpjNumber.replace(/\D/gi, "");
	if(cnpjNumber.length !== 14){
		return false;
	}

	if(/(^1{14}$)/.test(cnpjNumber)||
	   /(^2{14}$)/.test(cnpjNumber)||
	   /(^3{14}$)/.test(cnpjNumber)||
	   /(^4{14}$)/.test(cnpjNumber)||
	   /(^5{14}$)/.test(cnpjNumber)||
	   /(^6{14}$)/.test(cnpjNumber)||
	   /(^7{14}$)/.test(cnpjNumber)||
	   /(^8{14}$)/.test(cnpjNumber)||
	   /(^9{14}$)/.test(cnpjNumber)||
	   /(^0{14}$)/.test(cnpjNumber)){
		return false;
	}

	return cnpjNumber.slice(-2) === getChecksum(cnpjNumber);
}

function generate (){
	var cnpjNumber = "";
	for(var i=0;i<8;i++){
		cnpjNumber += Math.floor(Math.random()*10);
	}
	cnpjNumber += "0001";
	return cnpjNumber + getChecksum(cnpjNumber);
}

function generateWithMask (){
	return this.generate().replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"$1.$2.$3/$4-$5");
}

module.exports = {
	validate : validate,
	generate: generate,
	generateWithMask: generateWithMask
};