var valid={email: false, firstname: false, lastname: false, password: false, passwordcmf: false, phone: false, university: false, department: false, userRole: false, rrcan: false};

var roleMsg = "Please first select a role then move your mouse here to see detailed information.";

var roleMsgAU = "If you are a Student, Research Assistant or Teaching Assistant, please register as a AU. Before you register, please first ask your project manager for the correct RRCAN that you can use. You will need this RRCAN to finish your registration.";

var roleMsgPAH = "If you are a Principal investigator, Business manager or Project manager/coordinator who is managing account numbers and invoices for a principal investigator, please register as a PAH. Otherwise please register as a Authorized User";

var rrcanInfo="RRC Account Number(RRCAN) is a payment source created by either PIs or the lab managers to allowed dispensing of funds to purchase various of services offered by RRC facilities. Check with your PI or lab manager if you don't know what RRCAN to use.";


// phone number format
function phoneFormat(phone){
	var phone = phone.replace(/[^0-9]/g, '');
	phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1)-$2-$3");
	return phone;
}

// rrcan show and off
function userRoleEvent(){
    var roleSUP = document.getElementById("roleSUP");
    if(this.selectedIndex == 1){ //authorized user
        var ele = document.getElementById("rrcanSUP");
        ele.setAttribute("title", rrcanInfo);
        roleSUP.setAttribute("title", roleMsgAU);
        document.getElementById("divRRCAN").style.display = "block"; 
    }else if(this.selectedIndex == 2){ //primary account holder
        roleSUP.setAttribute("title", roleMsgPAH);
        document.getElementById("divRRCAN").style.display = "none"; 
    }
}

function updateValid(field, va){
	valid[field] = va;
}

// form validation
function validation(){
    var check = document.getElementById(this.id+"Check");
    var value = this.value;
    //check if email format is valid
    if(this.id == "email"){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        
            if(re.test(value) == false){
                check.innerHTML = "Email address invalid!";
                updateValid(this.id, false);
                return;
            }else{
                check.innerHTML = "";
                updateValid(this.id, true);  
            }
        //AJax
    }else if(this.id == "firstname"){
        //name file can't be empty, we don't check middle name here
        if(value == ""){
            check.innerHTML = "First name cannot be empty!";
            updateValid(this.id, false);
        }else{
            check.innerHTML = "";
            updateValid(this.id, true);
            
        }
    }else if(this.id == "lastname"){
            //name file can't be empty, we don't check middle name here
            if(value == ""){
                check.innerHTML = "Last name cannot be empty!";
                updateValid(this.id, false);
                
            }else{
                check.innerHTML = "";
                updateValid(this.id, true);
                
            }
    }else if(this.id == "phone"){
        //phone number
        var re = /^\d{10}$/;
        if(re.test(value) == false){
            check.innerHTML = "Invalid phone number!";
            updateValid(this.id, false);
        }else{
            check.innerHTML = "";
            this.value = phoneFormat(value);
            updateValid(this.id, true);
        }
    }else if(this.id == "university"){
            //University/Company
            if(value == ""){
                check.innerHTML = "University/Company cannot be empty!";
                updateValid(this.id, false);
            }else{
                check.innerHTML = "";
                updateValid(this.id, true);
            }
    }else if(this.id == "department"){
            //Department
            if(value == ""){
                check.innerHTML = "Department cannot be empty!";
                updateValid(this.id, false);
            }else{
                check.innerHTML = "";
                updateValid(this.id, true);
            }
    }else if(this.id == "password"){
        //password length should be greater or equal to 8
        if(value.length < 8){
            check.innerHTML = "Password too short!";
            updateValid(this.id, false);
        }else{
            check.innerHTML = "";
            updateValid(this.id, true);
        }
    }else if(this.id == "passwordcmf"){
        //passwords should be the same
        var pwd = document.getElementById("password");
        if(pwd.value != value || value.length < 8){
            check.innerHTML = "Password does not match!";
            updateValid(this.id, false);
        }else{
            check.innerHTML = "";
            updateValid(this.id, true);
        }
    }else if(this.id == "userRole"){
        //must select a value 
        if(value == ""){
            check.innerHTML = "User role invalid!";
            updateValid(this.id, false);
        }else{
            check.innerHTML = "";
            updateValid(this.id, true);
            if(this.selectedIndex == 2){
                updateValid("rrcan", true);
            }
        }
    }else if(this.id == "rrcan"){
        //first check length
        if(value.length < 5){
            check.innerHTML = "RRCAN invalid";
            updateValid(this.id, false);
            return;
        }
        check.innerHTML = "";
        updateValid(this.id, true);
        //AJax
    }else{
        //do nothing
    }   
}

//some field messages
function information(){
    var check = document.getElementById(this.id+"Check");
    var value = this.value;
    if(this.id == "email"){
        var info = "Register with edu email address to get appropriate pricing rates!";
        this.setAttribute("title", info);
    }else if(this.id == "password"){
        check.innerHTML = "Password length should at least be 8."
    }else{
    }
}

//submit event
function submitForm(){
	for(var k in valid){
		if(valid[k] == false){
            var ele = document.getElementById(k);
            ele.validate();
            return false;
        }
    }
    var check = document.getElementById("cb");
    if(check.checked == true){
        alert("done");
        return true;
        //submit
    }else{
        alert("Cannot submit, please read the terms and conditions.");
    }
    return false;
}

// as soon as the page is loaded...
window.onload = function(){
    //all inputs
    var inputs = document.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        inputs[i].onfocus = information;
        //inputs[i].onkeyup= validation;
        inputs[i].onblur = validation;
        inputs[i].validate = validation;
    }
    //all selects, for now we only have one
    var selects = document.getElementById("userRole");
    selects.onblur = validation;
    selects.onchange = userRoleEvent;
    selects.validate = validation;
    
    var roleSUP = document.getElementById("roleSUP");
    roleSUP.setAttribute("title", roleMsg);
}

