"use strict";//enable strict mode (ECMAScript 5)

//App is a singleton using the Module pattern
//The Module Pattern allows for private variables/functions
var app = function(){
	//Private variables and functions
	
	//Parasitic Combination Inheritance (Prototype Pattern and Constructor Stealing). 
	//The most efficient way to implement type-based inheritance.  superType constructor is only called once.
	//Prototypal Inheritance
	function object(o){
		function F(){};//create new object
		F.prototype = o;//set new objects prototype to protoype from argument
		return new F();//return new object that now has prototype from arguments
	};

	//Public interface
	return {
		//Prototypal Inheritance and Constructor Stealing (Parasitic Combination Inheritanc)
		inheritPrototype : function(subType,superType){
			var prototype = object(superType.prototype);//superType object
			prototype.constructor = subType;//superType object constructor is now subType constructor (constructor stealing)
			subType.prototype = prototype;//subType now has superType prototype
		}
	};	
}();

var isSet = function (param) {
    if (param != null && param != undefined) {
        return true;
    }
    else {
        return false;
    }
};
// //app is a singleton using the Module-Augmentation pattern so app is instance of App
// function App(){};
// var app = function(){
// 	//Private variables and functions
	
// 	//Parasitic Combination Inheritance (Prototype Pattern and Constructor Stealing). 
// 	//The most efficient way to implement type-based inheritance.  superType constructor is only called once.
// 	//Prototypal Inheritance
// 	function object(o){
// 		function F(){};//create new object
// 		F.prototype = o;//set new objects prototype to protoype from argument
// 		return new F();//return new object that now has prototype from arguments
// 	};

// 	var publicObject = new App();

// 	//Public interface
// 	publicObject.inheritPrototype = function(subType,superType){
// 		var prototype = object(superType.prototype);//superType object
// 		prototype.constructor = subType;//superType object constructor is now subType constructor (constructor stealing)
// 		subType.prototype = prototype;//subType now has superType prototype
// 	};
	
// 	return publicObject;
// }();