"use strict";//enable strict mode (ECMAScript 5)

function MasterBean(){};
MasterBean.prototype.set = function(name,value){
	this[name] = value;

	return this;
};
MasterBean.prototype.get = function(name){
	return this[name];
};