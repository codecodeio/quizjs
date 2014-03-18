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

//Handlebars render function caches compiled templates
function render(tmpl_name, tmpl_data, partial_name) {
    if ( !render.tmpl_cache ) { 
        render.tmpl_cache = {};
    }

    if ( ! render.tmpl_cache[tmpl_name] ) {
        var tmpl_dir = 'templates';
        var tmpl_url = tmpl_dir + '/' + tmpl_name + '.html';

        var tmpl_string;
        $.ajax({
            url: tmpl_url,
            method: 'GET',
            async: false,
            success: function(data) {
                tmpl_string = data;
            }
        });

        if(partial_name){
        	var partial_url = tmpl_dir + '/' + tmpl_name + '-' + partial_name + '.html';
        	var partial_string;
        	$.ajax({
	            url: partial_url,
	            method: 'GET',
	            async: false,
	            success: function(data) {
	                partial_string = data;
	            }
	        });

        	Handlebars.registerPartial(partial_name, partial_string);
        }
        render.tmpl_cache[tmpl_name] = Handlebars.compile(tmpl_string);
    }

    return render.tmpl_cache[tmpl_name](tmpl_data);
}

function start(){
    window.quiz = new Quiz();
    
    $.ajax({
      url: "quiz.json",
      async: "false"
    }).done(function(data) {
      window.quiz.set("allQuestions",data);
    }).always(function(){
        window.quiz.createQuestionPage();
    });
}

function addPage(node){
    node.html("<div id='content'></div>");
}
function getPage(){
    return $("#content");
}
function removePage(){
    var node = $("#content");
    node.fadeOut();
    node.remove();
}
function setPage(){
    var mainNode = $("#main");
    if(mainNode.has("#content").length){
        removePage();
    }
    addPage(mainNode);

    return getPage().hide();
}
function loadPage(node,html){
    node.append(html);
    node.fadeIn();
}

function addHeader(node){
    node.html("<div id='headerContent'></div>");
}
function getHeader(){
    return $("#headerContent");
}
function removeHeader(){
    var node = $("#headerContent");
    node.remove();
}
function setHeader(){
    var node = $("#header");
    if(node.has("#headerContent").length){
        removeHeader();
    }
    addHeader(node);

    return getHeader();
}
function loadHeader(node,html){
    node.append(html);
}
function createHeader(){
    var headerNode = window.setHeader();

    headerNode.on("click",".glyphicon-remove",function(event){
        event.preventDefault();
        
        localStorage.removeItem("name");
        window.createHeader();
        window.createLoginPage();
    });

    var context = {name: localStorage.getItem("name")};
    var rendered_html = render('header', context);

    window.loadHeader(headerNode,rendered_html);
}

function createLoginPage(){
    var pageNode = window.setPage();

    pageNode.on("click","button",function(event){
        event.preventDefault();
        
        var nameInput = $(this).closest("form").find("#inputName");
        var name = nameInput.val().trim();
        
        if(window.isSet(name) && name.length > 0){
            localStorage.setItem("name", name);
            window.createHeader();
            window.start();
        }
        else {
            nameInput.parent().addClass("has-error");
            nameInput.attr("placeholder","Whats's your name???");
        }
    });

    var rendered_html = render('login', null);
    window.loadPage(pageNode,rendered_html);
}

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