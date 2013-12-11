"use strict";//enable strict mode (ECMAScript 5)

//App is a singleton using the Module pattern
//The Module Pattern allows for private variables/functions
var udf;
udf = function () {
    //Private variables and functions

    //Public interface
    return {
        math: {
            precise_round: function (num, decimals, ceilFloor) {
                var result;
                if (!isSet(decimals)) {
                    decimals = 0;
                }

                if(isSet(ceilFloor)){
                    if (isSet(ceilFloor) && ceilFloor == "ceil") {
                        result = Math.ceil(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
                    }
                    else if (ceilFloor == "floor") {
                        result = Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
                    }
                }
                else {
                    result = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
                }

                return result;
            }
        },
        date: {
            dateDiff: function (d1, d2, accurateTo) {
                var diff = (d2 - d1) / 1000 / 60 / 60 / 24;//convert miliseconds to days
                return diff;
            }
        }
    };
}();