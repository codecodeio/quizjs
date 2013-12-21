//creates HTML elements using bootstrap formatting conventions

"use strict";//enable strict mode (ECMAScript 5)

//App is a singleton using the Module pattern
//The Module Pattern allows for private variables/functions

var boot = function(){
	//Private variables and functions

	//Public interface
	return {
		radio : function(name,value,text){
			var divNode = document.createElement("div");
			divNode.setAttribute("class","radio");
			var labelNode = document.createElement("label");
			
			var radioNode = document.createElement("input");
			radioNode.type = "radio";
			radioNode.id = name;
			radioNode.setAttribute("class",name);
			radioNode.name = name;
			radioNode.value = value;
			var textNode = document.createTextNode(text);

			labelNode.appendChild(radioNode);
			labelNode.appendChild(textNode);
			divNode.appendChild(labelNode);
			
			return divNode;
		},
		form : function(id,type){
			var formNode = document.createElement("form");
			formNode.setAttribute("role","form");
			formNode.setAttribute("id",id);	
			
			if(type != undefined && type != ""){
				formNode.setAttribute("class","form-" + type);
			}

			return formNode;
		},
		submit : function(id,name){
			var buttonNode = document.createElement("button");
			buttonNode.setAttribute("type","submit");
			buttonNode.setAttribute("class","btn btn-default");
			buttonNode.setAttribute("id",id);
			var textNode = document.createTextNode(name);

			buttonNode.appendChild(textNode);

			return buttonNode;
		},
		//type = success|info|warning|danger
		alert : function(type,text){
			var divNode = document.createElement("div");
			divNode.setAttribute("class","alert alert-"+type);
			var textNode = document.createTextNode(text);

			divNode.appendChild(textNode);

			return divNode;
		},
		//type = default|primary|success|info|warning|danger
		button : function(id,text,type){
			var node = document.createElement("button");
			node.setAttribute("class","btn btn-"+type);
            node.setAttribute("id",id);
			var textNode = document.createTextNode(text);

			node.appendChild(textNode);

			return node;
		},
        anchor : function(id,text,type,href){
            var node = document.createElement("a");
            node.setAttribute("class","btn btn-"+type);
            node.setAttribute("id",id);
            node.setAttribute("role","button");
            node.setAttribute("href",href);
            var textNode = document.createTextNode(text);

            node.appendChild(textNode);

            return node;
        },
        col : function(id,size){
            var node = document.createElement("div");
            node.setAttribute("id",id);
            node.setAttribute("class","col-md-"+size);

            return node;
        }
	};	
}();