var assert = require('assert');
var cpf = require('./docs/pt-br/cpf');
var cnpj = require('./docs/pt-br/cnpj');
var creditCard = require('./docs/creditCard');

assert(cpf.validate('42214952276'), 'Broken validate, this CPF is valid');
assert(!cpf.validate('42214952289'), 'Broken validate, this CPF is invalid');
assert(cpf.validate(cpf.generate()), 'Broken CPF generator');
assert(cpf.validate(cpf.generateWithMask()), 'Broken CPF generator with mask');

assert(cnpj.validate('70264115000179'), 'Broken validate, this CNPJ is valid');
assert(!cnpj.validate('70264115000165'), 'Broken validate, this CNPJ is invalid');
assert(cnpj.validate(cnpj.generate()), 'Broken CNPJ generator');
assert(cnpj.validate(cnpj.generateWithMask()), 'Broken CNPJ generator with mask');

var types = ['maestro', 'dinersclub', 'laser', 'jcb', 'unionpay', 'discover', 'mastercard', 'amex', 'visa'], a, b;
for(var i =0;i<types.length;i++){
	var type = types[i];
	a = creditCard.generate(type);
	b = creditCard.generateWithMask(type);
	try{
	assert(creditCard.validate(a), 'Broken Credit Card generator for ' + type);
	assert(creditCard.validate(b), 'Broken Credit Card generator with mark for ' + type);
	}catch(e){
		console.log(e.message);
	};
}
