// my.js 
/*!
 *  my.js 
 */
 
 "use strict";
 
//////////////////
console.log('gdoc = '+ gdoc);

var gdoc = "I am set at the top." 
var fahrenheit = [0, 32, 45, 50, 75, 80, 99, 120];
console.log('gdoc = '+ gdoc);

var celcius = fahrenheit.map(function(elem) {
    return Math.round((elem - 32) * 5 / 9);
}); 

// ES6
// fahrenheit.map(elem => Math.round((elem - 32) * 5 / 9));
var celcius22=  fahrenheit.map(elem => Math.round((elem - 32) * 5 / 9));
changeGlobal();
function changeGlobal()
{
    var gdoc = "function changeGlobal()";
}
console.log(celcius22);
console.log(celcius); //  [-18, 0, 7, 10, 24, 27, 37, 49]
console.log('gdoc = '+ gdoc);
/////////////////////////////////////

 
 //alert('my.js')
 var mycmd = (function() {
    // your module code goes here
    var sum = 0 ;

    return {
            my_test:function() {
            alert(' my_test:function()');
            //return sum;
        },
        add:function() {
            sum = sum + 1;
            return sum;
        },
        reset:function() {
            return sum = 0;    
        }  
    }   
}());
//alert(modularpattern.add());    // alerts: 1
//alert(modularpattern.add());    // alerts: 2
//alert(modularpattern.reset());  // alerts: 0
