"use strict";//enable strict mode (ECMAScript 5)

//App is a singleton using the Module pattern
//The Module Pattern allows for private variables/functions

var DomUtil = function(){
	//Private variables and functions

	//Public interface
	return {
		removeNode : function(id){
			var childNode = document.getElementById(id);
			var parentNode = childNode.parentNode;
			parentNode.removeChild(childNode);
		},
		selected : function(node){
			var selected;

			for(var i=0; i<node.length; i++){
				if(node[i].checked){
					selected = node[i].value;
					break;
				}
			}
			return selected;
		}
	};	
}();