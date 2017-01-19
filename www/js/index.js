/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function body_init(){
	$.support.cors=true;
};


function check_login(){
    
    var postData = "check";
    
    $.ajax({
        type: 'POST',
        data: postData,
        dataType: 'jsonp',
        jsonp : "callback", 
        jsonpCallback: "checklogin_cb", 
        crossDomain: true,
        url: 'http://centralerotsaert.ddns.net/check_login.php',
        cache: false
    });
    
    return false;
};

function checklogin_cb(rtndata){
    
    var ret = rtndata.retval;
    
	var n = ret.length;
    
	if (n<=1) {
        window.location="login.html";
	}
	if (ret=="true") {
        window.location="index.html";
	}
};

function logout(){
    
    $.ajax({
        url: 'http://centralerotsaert.ddns.net/logout.php',  
        cache: false,  
        crossDomain: true,
        success: function(){
            window.location="login.html";
        }
    });
};

function submit_login(form) {
    
    var postData = $(form).serialize();
    
	$.ajax({
        type: 'POST',
		data: postData,
		crossDomain: true,
		url: 'http://centralerotsaert.ddns.net/login.php',
		success: function(data){
			console.log(data);
			if(data == "true") {
				window.location="login.html";
			} else {
					$("div#errorMsg").css("display", "block");
					$("div#errorMsg").html("There was an error logging on, please try again.");
			}
		},
		error: function(){
					$("div#errorMsg").css("display", "block");
					$("div#errorMsg").html("There was an error logging on, please try again.");
		}
	});
	
	return false;
};