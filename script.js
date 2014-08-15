
// rrcan show and off
function userRoleEvent(selectedIndex){
    if(selectedIndex == 1){ //authorized user

        var ele = document.getElementById("rrcanSUP");
        if(ele.hasAttribute("title") == false){
            var info="RRC Account Number(RRCAN) is a payment source created by either PIs or the lab managers to allowed dispensing of funds to purchase various of services offered by RRC facilities. Check with your PI or lab manager if you don't know what RRCAN to use.";

            ele.setAttribute("title", info);
        }
        document.getElementById("divRRCAN").style.display = "block"; 
    }else if(selectedIndex == 2){ //primary account holder
        document.getElementById("divRRCAN").style.display = "none"; 
    }
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
                return;
            }else{
                check.innerHTML = "";
            }
        //AJax
    }else if(this.id.match(/name$/)){
        //name file can't be empty, we don't check middle name here
        if(value == ""){
            check.innerHTML = "Name cannot be empty!";
        }else{
            check.innerHTML = "";
        }
    }else if(this.id == "phone"){
        //phone number
        var re = /^\d{10}$/;
        if(re.test(value) == false){
            check.innerHTML = "Invalid phone number!";
        }else{
            check.innerHTML = "";
        }
    }else if(this.id == "password"){
        //password length should be greater or equal to 8
        if(value.length < 8){
            check.innerHTML = "Password too short!";
        }else{
            check.innerHTML = "";
        }
    }else if(this.id == "passwordcmf"){
        //passwords should be the same
        var pwd = document.getElementById("password");
        if(pwd.value != value || value.length < 8){
            check.innerHTML = "Password does not match!";
        }else{
            check.innerHTML = "";
        }
    }else if(this.id == "userRole"){
        //must select a value 
        if(value == ""){
            check.innerHTML = "User role invalid!";
        }else{
            check.innerHTML = "";
        }
    }else if(this.id == "rrcan"){
        //first check length
        if(value.length < 5){
            check.innerHTML = "RRCAN invalid";
            return;
        }
        check.innerHTML = "";
        //AJax
    }else{
        //do nothing
    }   
}

function information(){
    var check = document.getElementById(this.id+"Check");
    var value = this.value;
    if(this.id == "email"){
        var info = "Register with edu email address to get appropriate pricing rates!";
        this.setAttribute("title", info);
    }else if(this.id == "password"){
        check.innerHTML = "Password length should at least be 8."
    }else if(this.id == "rrcan"){
        var info="RRC Account Number(RRCAN) is a payment source created by either PIs or the lab managers to allowed dispensing of funds to purchase various of services offered by RRC facilities. Check with your PI or lab manager if you don't know what RRCAN to use.";
        //var ele = document.getElementsByTagName("sup"));
        //ele[0].setAttribute("title", info);
    }
}

// as soon as the page is loaded...
window.onload = function(){
    //all inputs
    var inputs = document.getElementsByTagName("input");
    for(var i = 0; i < inputs.length; i++){
        inputs[i].onfocus = information;
        //inputs[i].onkeyup= validation;
        inputs[i].onblur = validation;
    }
    //all selects, for now we only have one
    var selects = document.getElementsByTagName("select");
    selects[0].onblur = validation;
}


