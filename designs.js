// this is the updated version of the first code.. 
//It has additional features such as:
/*    saving the grid images .
      review of the saved photos using the next an previous buttons.
      to clear the grid if the image is messy
      finally a message to Udacity, Andela, Google using the inital grid for the first 10 seconds. 
Hope it works*/

let primaryData=[];
 /* array to contain the other saved tables outside the submit function to store the tables
  even if the submit function is called multiple times*/
let x=0;


 // when the document has finished loading
$(document).ready(function(){

$("#sizePicker").submit(function(event){
	//declaration of the variables
const height=new Number($("#inputHeight").val());
const width=new Number($("#inputWeight").val());

makeGrid(height,width);
event.preventDefault()
})})


function makeGrid(height,width) {
	//removing the initial grid if it exsists
	$("tr").remove();
	/*removes all the buttons which appear after the grid is formed to avoid multiple buttons performing
	the same function*/
	$('button').remove();
	
	//loop for drawing the grid using the value submitted
	for (let i = 0; i < height; i++) {
		let row="row"+i;
		//addition of the <tr> attribute
		$("#pixelCanvas").append("<tr class="+row+"></tr>");

			for (let k = 0; k < width; k++) {
				$("."+row+"").append("<td></td>");
}
}

/*initializing the buttons
 the save button is disabled to prevent the user from saving an empty string to the array
 the clear button is disabled since there is no content in the grid
 the review button is disabled since the initial array is empty at this point
 */
let clearButton=$("<button type='button' class='clear' disabled>Clear</button>").insertAfter('#pixelCanvas');
let saveButton=$("<button type='button' class='save' disabled>Save</button>").insertAfter('.clear');
let reviewButton=$("<button type='button' id='review' disabled>Review</button>").insertAfter('.save');
let nextButton=$("<button type='button' class='next'>Next</button>").insertAfter('#review');
let previousButton=$("<button type='button' class='previous'>Previous</button>").insertAfter('.next');
/* these buttons are hidden because they are used after the user hits the review button*/
$('.next').hide();
$('.previous').hide();

const ClearButtonLocation=$('.clear');
ClearButtonLocation.click(function () {
	//this is to confirm whether the user wants to delete the content
	if (confirm("Delete the content")){
		//clears the table
		$("tr").remove();
		//if there is information in the primary data array the user is given an option to review the content
		if (primaryData.length>0){
			$('button').hide();//hides all the buttons except the review button
			$('#review').show();
			$('#review').attr('disabled',false);	
	}else{// if there is no data, all the buttons are cleared forcing the user to create a new table
		$('button').hide();
	}
	}
	

})

$('.save').click(function () {
	/* saves the inner html of the table as a string in the primary data array so that it can be accessed 
	if the user wants to review the content he drew earlier*/
	let savedHtmlString=$('table').html();
	primaryData.push(savedHtmlString);
	//disables the save button to prevent double entry of the same data unless the user modifies the content
	$('.clear').attr('disabled',true);
	$('.save').attr('disabled',true);
	/*enables the review button if there is data in the primary data array 
	this prevents the user from reviewin an empty table or rather nothing at all*/
	if (primaryData.length>0){
		$('#review').attr('disabled',false);	
	}

})

$('#review').click(function() {
	//removes the save button since we are not saving any content
	$('.save').remove();
	//shows the next button only since only the first image has been loaded and there is no previous image
	$('.next').show();
	//removes the review button since it has already served its purpose
	$('#review').remove();
	//removes the current grid yo give room to the saved table
	$('#pixelCanvas').find('tbody').remove();
	$('#pixelCanvas').append(primaryData[0]);//show the first image
})
$('.next').click(function(){
	//shows the previous button since there is a previous string which can be used
	$('.previous').show();
	//shows the clear button if the user feels that they are not interested in the reviews
	$('.clear').attr('disabled',false);
	x=x+1;
	if (x===primaryData.length-1) {
		/*conditional to determine when there is no extra image to be loaded in the array
		 thus the next button is disabled */
		$('.next').attr('disabled',true);
	}else{
		$('.next').attr('disabled',false);
	}
	$('#pixelCanvas').find('tbody').remove();
	
	//adds the stored inner html and adds it as an attribute to the table so that it is presented to the user
	$('#pixelCanvas').append(primaryData[x]);
	$('.previous').attr('disabled',false);
		//returns the  value so that it is used by the previous() funtion
	return x;})

$('.previous').click(function () {
	//to load the previous image in the the array
	x=x-1;
	$('#pixelCanvas').find('tbody').remove();
	$('#pixelCanvas').append(primaryData[x]);
	
	/*conditional to determine when there is no extra image to be loaded in the array
		 thus the next and previous buttons are disabled  */
	if (x===primaryData.length-1) {
			$('.next').attr('disabled',true);
		}else if (x===0) {
			$('.previous').attr('disabled',true);
	}else{
		$('.next').attr('disabled',false);
		$('.previous').attr('disabled',false);
	}
	//returns the x value if it is needed by the next() function
	return x;
})



const color=$("#pixelCanvas").find("td");
//picking the color and adding it to the cell
color.click(function (){	
		
		let cell = $("#colorPicker").val();
		$(this).attr("bgcolor",cell);
		//this gives an oportunity to save the modifications made by the user or to clear the whole table
		$('.clear').attr('disabled',false);
		$('.save').attr('disabled',false);
 })


}