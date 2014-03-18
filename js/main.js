"use strict";//enable strict mode (ECMAScript 5)

$(document).ready(
	function(){
		window.createHeader();

		if (localStorage.getItem("name") == null){
		    window.createLoginPage();
		}
		else{
			window.start();
 		}
	}
);