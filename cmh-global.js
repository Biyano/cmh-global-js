// CMH Global JS - This is just a compilation of javascript/jquery functionality that I reuse frequently from project to project
// Constantly growing and being refined, useful tool kit to have from time to time.
//
// Copyright (c) 2012 Christopher Hacia git@chrishacia.com
// Website: http://www.chrishacia.com/scripts/cmh-global-js
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php



//NOTES:
// Work up some better commenting..

//adds jquery functionality to get the type of inputs in a form we are dealing with.
$.fn.getType = function(){ return this[0].tagName == "INPUT" ? $(this[0]).attr("type").toLowerCase() : this[0].tagName.toLowerCase(); }

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
	}, 500);
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
