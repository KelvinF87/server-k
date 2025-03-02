const crypto = require('crypto');
const Password = crypto.randomBytes(64).toString('hex');
console.log(Password);