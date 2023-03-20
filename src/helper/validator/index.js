"use strict";

var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
exports.emailValidate = function(email) {
	if (!email)
		return false;
		
	if(email.length>254)
		return false;

	var valid = tester.test(email);
	if(!valid)
		return false;

	// Further checking of some things regex can't handle
	var parts = email.split("@");
	if(parts[0].length>64)
		return false;

	var domainParts = parts[1].split(".");
	if(domainParts.some(function(part) { return part.length>63; }))
		return false;

	return true;
}

var phoneNumberTester = /^(\(?\+?[0-9]*\)?)?\d+$/

exports.phoneNumberValidate = function (phoneNumber) {
	if(phoneNumber.length > 15)
	return false;
	if (phoneNumber.length == 0)
	return false;
	var valid = phoneNumberTester.test(phoneNumber);
	if(!valid)
		return false;
	return true
}

exports.passwordValidate = function(password) {
	if (password.length < 6)
		return false;
	return true;
}

var numberTester = /^\d+$/

exports.numberValidate = function (number) {
	var valid = numberTester.test(number);
	if(!valid)
		return false;
	return true
}