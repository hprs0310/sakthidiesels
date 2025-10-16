$(document).ready(function(){
	 
 
    var counter = 1;
 
    $(".foo").change(function () {
 
	//if(counter>22){
//            alert("Maximum Items selected... Please contact for more information... thanks");
//            return false;
//	}   
 
	var newTextBoxDiv = $(document.createElement('div'))
	     .attr("id", 'TextBoxDiv' + counter);
 var device_name = new Array();
 var device_name = $('select.foo').val().split(",");
	newTextBoxDiv.after().html('<div  id=del'+counter+' class="row_1" style="width:100%;"><table><tr><td width="200" class="device_name" ><label>'+device_name[0]+'</label><input type="hidden" id="device_'+ counter +'" name="device_'+ counter +'" value="'+ device_name[0] +'" readonly="readonly" ></td> <td width="135" class="wattage" ><input  type="text" id="wattage_'+ counter +'" name="wattage_'+ counter +'" value="'+ device_name[1] +'"  class="textfield"></td><td width="135" class="qty"><input  type="text" id="qty_'+ counter +'" name="qty_'+ counter +'" onChange="calculate_kw(this.id)" class="textfield" ></td><td  width="135" class="kw"><input  type="text" id="kw_'+ counter +'" name="kw_'+ counter +'" readonly="readonly" class="textfield" ></td><td><a  class="delete" onclick="fn_delete('+counter+')"><img src="http://www.sunbeampower.com/front_assets/images/list-cross.png"/></a></td></tr></table></div><div style="clear:left"></div>');
	newTextBoxDiv.appendTo("#TextBoxesGroup");
	counter++;
     });
 
     $("#removeButton").click(function () {
	if(counter==1){
          //alert("No more textbox to remove");
		 
          return false;
       }   
 
	counter--;
 
        $("#TextBoxDiv" + counter).remove();
        	setTotal(); 
     });
 
     $("#getButtonValue").click(function () {
 
	var msg = '';
	for(i=1; i<counter; i++){
   	  msg += "\n Textbox #" + i + " : " + $('#textbox' + i).val();
	}
    	  alert(msg);
     });
	
  });

function roundNumber(num, dec) {
	var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	return result;
}

function calculate_kw (f_name) {
var field = f_name.split("_");
var field_no  = field[1];
//alert(field_no);
var wattage = 'wattage_'+field_no;
var qty = 'qty_'+field_no;
var kw = 'kw_'+field_no;
//alert(qty);
var wattage_value = Number(document.getElementById(wattage).value);
//alert(wattage_value);
var qty_value = Number(document.getElementById(qty).value);
//alert(qty_value);
var kw_value = (wattage_value*qty_value)/1000;
	document.getElementById(kw).value = roundNumber(kw_value,2);
//	alert('total set');
	setTotal();
//	alert('total set after');
}

function setTotal(){
	var i;
	var kwid;
	var kw = 0;
	var totalkw=0;
	for(i=1;i<=22;i++){
		kwid = 'kw_'+i;
		//alert(document.getElementById(kwid).value);
		if(Number(document.getElementById(kwid).value)>0)
		{
		kw = Number(document.getElementById(kwid).value);
		totalkw +=kw;
		document.getElementById('tot_a').value = roundNumber(totalkw,2);
			ab();
		kw=0;
		}else {
			i=22;
		}
	}
	//alert('total kw'+totalkw);
	document.getElementById('tot_a').value = roundNumber(totalkw,2);
	ab();
}
function hp(k){
	/*var hpid = 'hp_'+k;
	var hpqty = "hpqty_"+k;
	var hpkwid =  "hpkw_"+k;
	document.getElementById(hpqty).value = 'Qty';
	document.getElementById(hpkwid).value = '';*/
	hpqty(k);
}

function hpqty(k){

	var hpid = 'hp_'+k;
	var hpqty = "hpqty_"+k;
	var hpkwid =  "hpkw_"+k;
	var hp = Number(document.getElementById(hpid).value);
	var qty = Number(document.getElementById(hpqty).value);	
	var tkw =  (hp*qty*0.75);
	document.getElementById(hpkwid).value = tkw;
	setHpTotal();
}
function owqty(){
	var hp = Number(document.getElementById('ow').value);
	var qty = Number(document.getElementById('oqty').value);	
	var tkw =  (hp*qty)/1000;;
	document.getElementById('owtotal').value = roundNumber(tkw,2);
	ab();
}

function setHpTotal(){
	var i;
	var kw = 0;
	var totalkw=0;
	for(i=1;i<=2;i++){
		kwid = 'hpkw_'+i;
		kw = Number(document.getElementById(kwid).value);
		totalkw +=kw
	}
	document.getElementById('hpkw').value = roundNumber(totalkw,2);
	ab()
}

var myRange = new Array(5,7.5,10,15,20,25,30,35,40,45,50,62.5,70,82.5,100,125,140,160,180,200,250,320,380,400,500,600,625);
//var kvagenset;
function ab(){
	var Atotalkw = Number(document.getElementById('tot_a').value);
	//var Ctotalkw = Number(document.getElementById('owtotal').value);
	var abVal = 0;
	if (Atotalkw > 0 )
	{
		abVal = abVal + Atotalkw ;
	}
	
	//if (Ctotalkw > 0 )
	//{
		//abVal = abVal + Ctotalkw ;
	//}
	//var abVal = Atotalkw+Btotalkw+Ctotalkw;
	var tkvaVal =  parseFloat(Number(abVal/0.8));
	document.getElementById('kwab').value = roundNumber(abVal,2);
	document.getElementById('tkva').value =roundNumber(tkvaVal,2);
	
	var cnt = myRange.length;
	if(tkvaVal > 0)	{
//		kvagenset = "";
		for(var j=0;j<cnt;j++){
			if(tkvaVal <= myRange[j]){
//				kvagenset = myRange[j];
				document.getElementById('pass1').value =myRange[j]+"Kva";
				//var pass = myRange[j];
				document.getElementById('twalt').innerHTML = "Your total Kilo watt is <font color='#0D5A9A'>"+roundNumber(abVal,2)+" Kw</font> and you need <font color='#0D5A9A'>"+myRange[j]+" Kva</font> genset";
				return;
			}
		}
		document.getElementById('twalt').innerHTML = "> 625 please contact us.";
	}
}

function change()
{
	document.cal.addbutton.disabled=false;
	var other_device = document.cal.device_type.value;
	if(other_device = "Other Devices")
	{
	document.cal.wattage_1.readOnly=false;
	//document.getElementsByName('wattage').readyOnly=true;
	}
}
function change_remove_button()
{
	document.cal.removeButton.disabled=false;
}

function fn_delete(delete_id) {
		
	$("#del"+delete_id).remove();
	setTotal(); 
	}
// JavaScript Document