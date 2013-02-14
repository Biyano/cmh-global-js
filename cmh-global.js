// CMH Global JS - This is just a compilation of javascript/jquery functionality that I reuse frequently from project to project
// Constantly growing and being refined, useful tool kit to have from time to time.
//
// Copyright (c) 2012 Christopher Hacia git@chrishacia.com
// Website: http://www.chrishacia.com/scripts/cmh-global-js
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php



//NOTES:
// Work up some better commenting..
// Convert normal functions to class based

//adds jquery functionality to get the type of inputs in a form we are dealing with.
$.fn.getType = function(){ return this[0].tagName == "INPUT" ? $(this[0]).attr("type").toLowerCase() : this[0].tagName.toLowerCase(); }
//jqery extension. to create ":Contains" declaration similar to :selected, :checked, :not etc..
(function ($) {
  // custom css expression for a case-insensitive contains()
  jQuery.expr[':'].Contains = function(a,i,m){
      return (a.textContent || a.innerText || "").toUpperCase().indexOf(m[3].toUpperCase())>=0;
  };
}(jQuery));
function longMonth(theValue)
{
	var month=new Array();
	month[0]="January";
	month[1]="February";
	month[2]="March";
	month[3]="April";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="August";
	month[8]="September";
	month[9]="October";
	month[10]="November";
	month[11]="December";
	return month[theValue];
}
function shortMonth(theValue)
{
	var month=new Array();
	month[0]="Jan";
	month[1]="Feb";
	month[2]="Mar";
	month[3]="Apr";
	month[4]="May";
	month[5]="Jun";
	month[6]="Jul";
	month[7]="Aug";
	month[8]="Sep";
	month[9]="Oct";
	month[10]="Nov";
	month[11]="Dec";
	return month[theValue];
}
function longDay(theValue)
{
	var weekday=new Array();
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";
	return weekday[theValue];
}
function shortDay(theValue)
{
	var weekday=new Array();
	weekday[0]="Sun";
	weekday[1]="Mon";
	weekday[2]="Tue";
	weekday[3]="Wed";
	weekday[4]="Thu";
	weekday[5]="Fri";
	weekday[6]="Sat";
	return weekday[theValue];
}
function formatAMPM(theValue) {
	var theVal = new Date(theValue);
	var hours = theVal.getHours();
	var minutes = theVal.getMinutes();
	var seconds = theVal.getSeconds();
	var ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	seconds = seconds < 10 ? '0'+seconds : seconds;
	var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
	return strTime;
}
//provide an element id, and have the page scroll down/up to said element
function goContainerByID(elemID)
{
	$('html, body').animate(
	{
		scrollTop: $('#'+elemID).offset().top
	} 500);
}
//attempt to find the position or index rather of an item in a given array
//and then return that index for use elsewhere.
function getPosition(arrayName,arrayItem)
{
  for(var i=0;i<arrayName.length;i++){
   if(arrayName[i]==arrayItem)
  return i;
  }
}
//some tables using the datatable api require the need to reinitialize
//datatables does not allow reinitializing, without first destroying the
//table. However, you can't destroy a table that isn't initialized, so
//we need to find out if the table has already been initialized or not
//then act accordingly based on that.
function isDataTable(nTable)
{
//sample use: isDataTable($('#datatable')[0]);
    var settings = $.fn.dataTableSettings;
    for ( var i=0, iLen=settings.length ; i<iLen ; i++ )
    {
        if ( settings[i].nTable == nTable )
        {
            return true;
        }
    }
    return false;
}
//rather than type out the same if statement below over and over
//to check various things for false positives I use this function
function nullCheck(theValue)
{
	if(theValue == null || theValue == undefined || theValue == ''){return true;}
	return false;
}
//sometimes working with JSON I am passed true/false either as a string
//or in uppercase which doesn't translate well for javascript so this is my way
//of finding true/false in that case.
function getBoolFromString(theValue)
{
	if(nullCheck(theValue) == false)
	{
		if(theValue == "TRUE"){return true;}
	}
	return false;
}
function ieVer()
{
//IE Version detection. Some older versions of IE are not compatible with
//Some of the newer CSS and HTML techniques we are using in newer designs
//And require we make the UI react slightly differently in such cases, rather than code
//restrictively to comply everywhere.
	if (/MSIE (\d+\.\d+);/.test(navigator.userAgent))
	{
	   var ieversion=new Number(RegExp.$1);
	   return ieversion;
	}
	return false;
}
//sometimes you just need to find a selectbox text value and not the option value
//this will find that then select said option
function selectOptionByText(selectorName, txt2match) {
    $(selectorName+' option')
    .filter(function() { return $.trim( $(this).text() ) == txt2match; })
    .attr('selected',true);
}
//helpful prototypes for reverse compatibility
if (!Array.prototype.remove)
{
	Array.prototype.remove = function()
	{
	    var what, a = arguments, L = a.length, ax;
	    while(L && this.length){
	        what= a[--L];
	        while((ax = this.indexOf(what))!= -1){
	            this.splice(ax, 1);
	        }
	    }
	    return this;
	}
}
if(!Array.isArray) {
  Array.isArray = function (vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };
}
Array.range = function(start, end, step) {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;

}
//indexOf not supported by older browsers, this adds the functionality needed to make it work
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
        "use strict";
        if (this == null) {
            throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }
        var n = 0;
        if (arguments.length > 0) {
            n = Number(arguments[1]);
            if (n != n) { // shortcut for verifying if it's NaN
                n = 0;
            } else if (n != 0 && n != Infinity && n != -Infinity) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }
        if (n >= len) {
            return -1;
        }
        var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
        for (; k < len; k++) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    }
}
if (!Object.prototype.hasOwnProperty) {
	Object.prototype.hasOwnProperty = function(prop)
	{
		var proto = obj.__proto__ || obj.constructor.prototype;
		return (prop in this) && (!(prop in proto) || proto[prop] !== this[prop]);
	};
}

//iterates over a form and builds proper JSON output
//useful if you want to manipulate form data before/after submit
(function($) {
$.fn.serializeFormJSON = function() {

   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};
})(jQuery);

//find something in an array
function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(haystack[i] == needle) return true;
    }
    return false;
}
//clear a form
$.fn.clearForm = function() {
  return this.each(function() {
    var type = this.type, tag = this.tagName.toLowerCase();
    if (tag == 'form')
      return $(':input',this).clearForm();
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = '';
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};
///////////////////////converts charaters into hex example @ becomes %40
function fixedEncodeURIComponent(str){return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A');}
///////////////////////converts charaters from hex example %40 becomes @
function decode(txt){return decodeURIComponent(txt.replace(/\+/g,  " "));}
//String Replace standart string replace functionality (like php implementation)
function str_replace(haystack, needle, replacement) {var temp = haystack.split(needle);return temp.join(replacement);}
//needle may be a regular expression
function str_replace_reg(haystack, needle, replacement) {var r = new RegExp(needle, 'g');return haystack.replace(r, replacement);}
//String trim PHP equvilants
function trim(str, chars){return ltrim(rtrim(str, chars), chars);}
function ltrim(str, chars){chars = chars || "\\s";return str.replace(new RegExp("^[" + chars + "]+", "g"), "");}
function rtrim(str, chars){chars = chars || "\\s";return str.replace(new RegExp("[" + chars + "]+$", "g"), "");}
function secondsToTime(secs){var hours = Math.floor(secs / (60 * 60));var divisor_for_minutes = secs % (60 * 60);var minutes = Math.floor(divisor_for_minutes / 60);var divisor_for_seconds = divisor_for_minutes % 60;var seconds = Math.ceil(divisor_for_seconds);var obj = {"h"hours,"m"minutes,"s"seconds};return obj;}
//COOOKIES!!
function cookieGet(name){name = name + "=";var cookies = document.cookie.split(';');for (var i = 0; i < cookies.length; i++){var c = cookies[i];while (c.charAt(0) == ' ') {c = c.substring(1, c.length);}if (c.indexOf(name) === 0) {return c.substring(name.length, c.length);}}return null;}
function cookieSet(name, value, path, days)
{
	var expires;
	if(days)
	{
		var date = new Date();
		date.setTime(date.getTime() + (3600000*24*days));
		expires = "; expires=" + date.toGMTString();}
	else
	{
		expires = "";
	}
	var path = "; path=" + path;
	document.cookie = name + "=" + value + expires + path;
}
function cookieDelete(name){cookieSet(name, "", -1);}
//bytes to size kb, mb, gb, tb..
function bytesToSize(bytes, precision){var kilobyte = 1024;var megabyte = kilobyte * 1024;var gigabyte = megabyte * 1024;var terabyte = gigabyte * 1024;if((bytes >= 0)&&(bytes < kilobyte)){return bytes + ' B';}else if((bytes >= kilobyte)&&(bytes < megabyte)){return (bytes / kilobyte).toFixed(precision) + ' KB';}else if((bytes >= megabyte)&&(bytes < gigabyte)){return (bytes / megabyte).toFixed(precision) + ' MB';}else if((bytes >= gigabyte)&&(bytes < terabyte)){return (bytes / gigabyte).toFixed(precision) + ' GB';}else if(bytes >= terabyte) {return (bytes / terabyte).toFixed(precision) + ' TB';}else{return bytes + ' B';}}
//sha1 encryption algorithm
function sha1(msg){function rotate_left(n,s){var t4 = ( n<<s ) | (n>>>(32-s));return t4;};function lsb_hex(val) {var str="";var i;var vh;var vl;for( i=0; i<=6; i+=2 ) {vh = (val>>>(i*4+4))&0x0f;vl = (val>>>(i*4))&0x0f;str += vh.toString(16) + vl.toString(16);}return str;};function cvt_hex(val){var str="";var i;var v;for( i=7; i>=0; i-- ) {v = (val>>>(i*4))&0x0f;str += v.toString(16);}return str;};function Utf8Encode(string) {string = string.replace(/\r\n/g,"\n");var utftext = "";for (var n = 0; n < string.length; n++) {var c = string.charCodeAt(n);if (c < 128) {utftext += String.fromCharCode(c);}else if((c > 127) && (c < 2048)) {utftext += String.fromCharCode((c >> 6) | 192);utftext += String.fromCharCode((c & 63) | 128);}else {utftext += String.fromCharCode((c >> 12) | 224);utftext += String.fromCharCode(((c >> 6) & 63) | 128);utftext += String.fromCharCode((c & 63) | 128);}}return utftext;};var blockstart;var i, j;var W = new Array(80);var H0 = 0x67452301;var H1 = 0xEFCDAB89;var H2 = 0x98BADCFE;var H3 = 0x10325476;var H4 = 0xC3D2E1F0;var A, B, C, D, E;var temp;msg = Utf8Encode(msg);var msg_len = msg.length;var word_array = new Array();for( i=0; i<msg_len-3; i+=4 ) {j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 | msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);word_array.push( j );}switch( msg_len % 4 ) {case 0:i = 0x080000000;break;case 1:i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;break;case 2:i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;break;case 3:i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8	| 0x80;break;}word_array.push( i );while( (word_array.length % 16) != 14 ) word_array.push( 0 );word_array.push( msg_len>>>29 );word_array.push( (msg_len<<3)&0x0ffffffff );for ( blockstart=0; blockstart<word_array.length; blockstart+=16 ){for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);A = H0;B = H1;C = H2;D = H3;E = H4;for( i= 0; i<=19; i++ ){temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;E = D;D = C;C = rotate_left(B,30);B = A;A = temp;}for( i=20; i<=39; i++ ){temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;E = D;D = C;C = rotate_left(B,30);B = A;A = temp;}for( i=40; i<=59; i++ ) {temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;E = D;D = C;C = rotate_left(B,30);B = A;A = temp;}for( i=60; i<=79; i++ ) {temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;E = D;D = C;C = rotate_left(B,30);B = A;A = temp;}H0 = (H0 + A) & 0x0ffffffff;H1 = (H1 + B) & 0x0ffffffff;H2 = (H2 + C) & 0x0ffffffff;H3 = (H3 + D) & 0x0ffffffff;H4 = (H4 + E) & 0x0ffffffff;}var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);return temp.toLowerCase();}
//get current year (good for copyright display)
function curryear(){ var d = new Date(); var n = d.getFullYear(); return n; }
//uppercase first letter of string
function ucfLetter(string)
{
	//Uppercase first letter in given string.
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//takes a URL and gets the parameters similar to PHP $_GET
//returns array of the parameters found to work with via js.
function url_get_params()
{
	// get the current URL
	var url = window.location.toString();
	//get the parameters
	url.match(/\?(.+)$/);
	var params = RegExp.$1;
	// split up the query string and store in an
	// associative array
	var params = params.split("&");
	var queryStringList = {};

	var x = 0;
	for(var i=0;i<params.length;i++)
	{
		var tmp = params[i].split("=");
		queryStringList[tmp[0]] = unescape(tmp[1]);
		x++;
	}

	if(x > 0)
	{
		queryStringList['howmany'] = x;
		return queryStringList;
	}
	return false;
}