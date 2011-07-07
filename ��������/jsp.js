/** 
 * @fileoverview Scripts used by the jsp pages.
 *
 */


/**
 * An onload script to perform the request by submitting the request form.
 * @return {void}
 */
function dorequest()
{
	// Request dropdown list from server
	document.request.submit();
}

/**
 * jquery file names
 */
var _jquery_file = "jquery-1.6.1.js";
var _jquery_ui_core_file = "jquery.ui.core.min.js";
var _jquery_ui_widget_file = "jquery.ui.widget.min.js";
var _jquery_ui_mouse_file = "jquery.ui.mouse.min.js";
var _jquery_ui_draggable_file = "jquery.ui.draggable.min.js";
/**
 * input elements with type "text"
 */
var inputElements = null;
var loadJquery = -1;
var retryTimes = 0;
var srcObject = null;


document.onkeypress = function(event){
	//attachEvent();
	event = event || window.event;
	srcObject = event.srcElement || event.target;
	//enter's keycode is 13
	//focus input elements with type "text"
	if(event.keyCode != 13 || srcObject.type != "text"){
		// in ie9 ctrl + enter's keyCode will be 10
		if(event.keyCode == 10){
			preventDefaultEvent(event);
			reDefinedEnterEvent(srcObject);
		}
		return;
	}
	//fit ie9
	if(event.ctrlKey || event.ctrlLeft || event.ctrlRight){
		preventDefaultEvent(event);
		reDefinedEnterEvent(srcObject);
		return;
	}
	//prevent default submit event
	preventDefaultEvent(event);
	shieldEnterEvent();
	
};

/**
 * prevent default event, like enter's submit, etc.
 * @param event
 * @return
 */
function preventDefaultEvent(event){
	if(event.preventDefault){
		event.preventDefault();
	} else {
		event.returnValue = false;
		event.cancelBubble = true;
	}
}

/**
 * redefine enter event
 * 1¡¢while in commandLine form, submit commandLineForm
 * 2¡¢while there is a "defaultButton", fire "doToolbar('', 'EDIT', '', '')" method
 * 3¡¢while in common input form, fire "commitOverrides" method
 * 
 * in commandLine form, input node's id is "commandValue" and form's id is "commandLineForm"
 * 
 * @param srcObject
 * @return
 */
function reDefinedEnterEvent(srcObject){
	var cmdLineForm = document.getElementById("commandLineForm");
	var defaultButton = document.getElementById("defaultButton");
	if(cmdLineForm != null && srcObject.id == "commandValue"){
		cmdLineForm.submit();
	} else if(defaultButton != null && defaultButton.getAttribute("defaultfunction") == "EDIT"){
		doToolbar('', 'EDIT', '', '');
	}else {
		commitOverrides();
	}
	return false;
}

/**
 * shield default enter's submit event to input's tab event
 * @return
 */
function shieldEnterEvent(){
	try{
		//testing jquery
		$.browser;
		clearInterval(loadJquery);
	} catch(e){
		retryTimes++;
		//retry 5 times
		if(retryTimes >= 5){
			clearInterval(loadJquery);
			return;
		}
		if(loadJquery == -1){
			loadScript(_jquery_file,"oJquery");
			loadJquery = setInterval("shieldEnterEvent()", 500);
			return;
		}
	}
	var nextElement = getNextInput(srcObject);
	if(nextElement != null){
		nextElement.focus();
	}
}

/**
 * fetch visible input element with "text" type
 * @param el
 * @return
 */
function getNextInput(el){
	if(inputElements == null){
	  	inputElements = $("input[type = 'text']:visible");
	}
	var idx = 0;
	for(var i = 0; i < inputElements.size(); i++){
	  	if(inputElements[i] == el){
	  	  	idx = i;
	  	  	break;
	  	}
	}
	if(++idx == inputElements.size()){
	  	return null;
	}
	return inputElements[idx];
}

/**
 * Load javascript file
 */
function loadScript(fileName,objectName){
	var _idOScript = objectName;
	if(document.getElementById(_idOScript) != null){
		return;
	}
	var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "../scripts/jquery/" + fileName;
    oScript.id = _idOScript;
    oHead.appendChild(oScript);
}

function getPassword(){
	var keyboard = document.getElementById("KdbKbdControl1");	
	if(keyboard == null){
		loadKdbKbdControl1();
		keyboard = document.getElementById("KdbKbdControl1");	
	}
	try{
		keyboard.iComPort=3;     
		keyboard.iBaudRate=1200;  	
		keyboard.iTimeOut=15;    	
		keyboard.iEncryptType=0; 	
		keyboard.iDesPinLength=6; 	
		keyboard.iPadTimes=1; 
		keyboard.ReadwebPin();  
		document.getElementById("fieldName:FAMILY.NAME").value = keyboard.cPwdData;

	} catch(e){
		document.getElementById("fieldName:FAMILY.NAME").value = "error";
	}
}

function readCard(){
	var hccMacDev = document.getElementById("HccMagDev");
	if(hccMacDev == null){
		loadHccMagDev();
		hccMacDev = document.getElementById("HccMagDev");
	}
	hccMacDev.ComPort=4;
	hccMacDev.baud=9600;
	hccMacDev.parity="N";
	hccMacDev.databits=8;
	hccMacDev.stopbits=1;	
	hccMacDev.TrackNo=2;
	hccMacDev.Timeout=100;
	hccMacDev.OpenCommPort();
	ret=hccMacDev.ReadTrack();
	if(ret==1)
		document.getElementById("fieldName:INTRODUCER").value = hccMacDev.Tk_Data2;
	else
		document.getElementById("fieldName:INTRODUCER").value = "error";
}

function loadKdbKbdControl1(){
	var head=document.getElementsByTagName('HEAD').item(0);
	var newElement = document.createElement("OBJECT");	
	newElement.classid = "clsid:00A5A260-956A-49E4-82FF-58CE009742C5";
	newElement.height = "1";
	newElement.id = "KdbKbdControl1";
	newElement.width = "1";
	newElement.codebase = "Gtwebdll.dll#version=1,0,0,1";
	head.appendChild(newElement);
}

function loadHccMagDev(){
	var head=document.getElementsByTagName('HEAD').item(0);
	var newElement = document.createElement("OBJECT");	
	newElement.classid = "CLSID:2E40B48C-6DAC-435A-82B4-672AF9604EBB";
	newElement.height = "1";
	newElement.id = "HccMagDev";
	newElement.width = "1";
	newElement.codebase = "HccMagDev.ocx#version=1,0,0,1";
	head.appendChild(newElement);
}

var _eventAttached = false;
function attachEvent(){
	if(_eventAttached){
		return;
	}
	_eventAttached = true;
	var eventDefineContainer = document.getElementById("disabled_MYFIELD");
	if(eventDefineContainer != null && eventDefineContainer.innerHTML.length > 0){
		alert("heihei");
		var eventObjs = eventDefineContainer.innerHTML.split(",");
		for(i = 0; i < eventObjs.length; i++){
			var eventObj = eventObjs[i].split(":");
			var targetInput = document.getElementById("fieldName:" + eventObj[0]);
			if(targetInput == null){
				continue;
			}
			if("PWD" == eventObj[1]){
				targetInput.onfocus = getPassword;
				continue;
			}
			if("CREAD" == eventObj[1]){
				targetInput.onfocus = readCard;
				continue;
			}
		}
	}
	
}

f = new function(){
	setTimeout("attachEvent()", 500);
};
