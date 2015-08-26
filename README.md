# dev-util
Utilities for developers and testers.

## Installation

Run the command:

```
npm install dev-util
```

## Example:

### Generate fake CPF :

```
var cpfUtil = require('dev-util/docs/pt-br/cpf');
var fakeCpf = cpfUtil.generate();
```
With mask:

```
var cpfUtil = require('dev-util/docs/pt-br/cpf');
var fakeCpf = cpfUtil.generateWithMask();
```

And validate:

```
var cpfUtil = require('dev-util/docs/pt-br/cpf');
var isValid = cpfUtil.validate('902.867.793-31');
```

### Generate fake CNPJ :

```
var cnpjUtil = require('dev-util/docs/pt-br/cnpj');
var fakeCnpj = cnpjUtil.generate();
```
With mask:

```
var cnpjUtil = require('dev-util/docs/pt-br/cnpj');
var fakeCnpj = cnpjUtil.generateWithMask();
```

And validate:

```
var cnpjUtil = require('dev-util/docs/pt-br/cnpj');
var isValid = cnpjUtil.validate('902.867.793-31');
```

### Generate fake Credit Card:

```
var creditCardUtil = require('dev-util/docs/creditCard');
var fakeVisa = creditCardUtil.generate('visa');
var fakeMaster = creditCardUtil.generate('mastercard');
var fakeAmex = creditCardUtil.generate('amex');
```
With mask:

```
var creditCardUtil = require('dev-util/docs/creditCard');
var fakeVisa = creditCardUtil.generateWithMask('visa');
var fakeMaster = creditCardUtil.generateWithMask('mastercard');
var fakeAmex = creditCardUtil.generateWithMask('amex');
```

And validate:

```
var creditCardUtil = require('dev-util/docs/creditCard');
var isValid = creditCardUtil.validate('4242 4242 4242 4242');
```
Cards types: maestro, dinersclub, laser, jcb, unionpay, discover, mastercard, amex, visa
