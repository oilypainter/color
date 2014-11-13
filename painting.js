(function(){
var canvas, context, patternCanvas, patternContext, 
pictureCanvas, pictureContext, pencilTool, sizeTool, eraserTool, brushTool, stampTool, tool;
var tool_default=false;
var paintColor= 'rgb(0, 0, 0)';
var paintSize=10, paintOpacity=.5;
var title='image/png';

function init(){
	canvas=document.getElementById('canvas'),
	context=canvas.getContext('2d');
	if (!context)
	{
		alert('did not get canvas context');
		return;
	}
//	canvas.width = window.innerWidth;
//	canvas.height = window.innerHeight-100;	
	defaultHeight=700;
	defaultWidth=700;
	canvas.width=defaultWidth;
	canvas.height=defaultHeight;
	
	// canvasPattern is a seperate canvas that has a pattern on it.
	patternCanvas = document.getElementById("patternCanvas");
	patternContext = patternCanvas.getContext("2d");
	
	pictureCanvas = document.getElementById('pictureCanvas');
	pictureContext = pictureCanvas.getContext('2d');
	
	//testing to see if touch enabled
/*	var touchEnabled = 'createTouch' in document
	if(touchEnabled){
		alert('got to the touchenabled comment');
	}*/
	
	
	// following are from the buttons which are the various tools
	pencilTool=document.getElementById('pencil');
	if(!pencilTool)
	{
		alert('did not get pencilTool');
		return;
	}
	
	//following is the button for the stamp icon
	stampTool=document.getElementById('stamp');
	if(!stampTool)
	{
		alert('did not get the stamp Tool');
	}
	
	eraserTool=document.getElementById('eraser');
	if(!eraserTool)
	{
		alert('got the eraser tool');
	}
	
	brushTool=document.getElementById('brush');
	if(!brushTool)
	{
		alert('got the brush tool');
	}
	
// This is the id for the texture button on the openning window 
	var texture = document.getElementById('texture');
	
//This is the id for the individual textures in the pop-up window.
	var texture0 = document.getElementById('texture0');
	var texture1 = document.getElementById('texture1');
	var texture2 = document.getElementById('texture2');
	
	
	
	
/* This gets the id for the color picker */
var brushColor=document.getElementById('drawingColor');	
	if(!brushColor)
	{
		alert('The brushColor hex name is' );
	}
// This is the id for the file browser 
//var input=document.getElementById('input');



//this calls the div that defines the size and shape and
//hiding of the slider window.
var  instructions = document.getElementById('instructions');
if(!instructions)
	{
		alert('did not get to the instructions element');
	}
//this calls the div that defines the list of image files and hides
//the list when the window is first loaded.
var fileInstructions = document.getElementById('fileInstructions');
if(!fileInstructions)
	{
		alert('did not get to the file instructions element');
	}

//this is the button that shows on the screen with the words Brush Size
//It will eventually call the slider when clicked.
var sizeOfBrush = document.getElementById('sizeOfBrush');
if(!sizeOfBrush)
{
	alert('did not get the button brush size element');
}


//this is the button that shows on the window with the words images
//It will eventually call the list of files when clicked
var imageFile = document.getElementById('imageFile');
if(!imageFile)
{
	alert('did not get to the pressed image button.');
}

// this is the id for the type=range which is the slider 
var  brushSize = document.getElementById('brushSize');
//this is the id for the type=range which is the slider for the
//brush opacity
var brushOpacity = document.getElementById('brushOpacity');
//OK button for the brushSize-brushOpacity popup window
var okButton = document.getElementById('ok');

//this is the id for the new canvas in the images listStyleType
var newDrawing = document.getElementById('newDrawing');
var drawingOne= document.getElementById('drawingOne');
var drawingTwo= document.getElementById('drawingTwo');
var drawingThree= document.getElementById('drawingThree');
var drawingFour= document.getElementById('drawingFour');

//saving the images
//var button = document.getElementById('btn-download');
document.getElementById('download').addEventListener('click', download, false);


  // Activate the default tool.
 /*   if (tools[tool_default]) {
      tool = new tools[tool_default]();
      tool_select.value = tool_default;
    }*/
	
//window.addEventListener('resize', resizeCanvas, false);
// if in tool buttons call these events
// It needs to be click for pencil, rectangle, and line tools
pencilTool.addEventListener('click', drawPencil, false);
eraserTool.addEventListener('click', drawEraser, false);
brushTool.addEventListener('click', drawBrush, false);
stampTool.addEventListener('click', drawStamp, false);

//event listeners for mouse click for the texture button on the openning window
texture.addEventListener('click', listTextures, false);

//event listeners for each of the textures used in the brush
texture0.addEventListener('click', textureImageZero, false);
texture1.addEventListener('click', textureImageOne, false);
texture2.addEventListener('click', textureImageTwo, false);

// the color for the fillStroke is event listener calles the function
//    setBrushColor with change.  Do not use click 
brushColor.addEventListener('change', setBrushColor, false);
//input.addEventListener('change', handleFiles, false);

//listens for when the size of the brush is changed using the range slider
brushSize.addEventListener('change', setBrushSize, false);
//listens for when the brush opacity is changed using the range slider
brushOpacity.addEventListener('change', setBrushOpacity, false);
//listens for when the ok button is clicked
okButton.addEventListener('click', setOkButton, false);

//listens for when the button Brush Size is clicked so it can call a
//function to launch the slider window.
sizeOfBrush.addEventListener('click', setSizeOfBrush, false);

//listens for when the button Image is clicked so it can call a
//function to launch the list of fileSize
imageFile.addEventListener('click', selectImageFile, false);
//listens for the button newDrawing to be clicked then with call the
//function to clear the rectaangle canvas
newDrawing.addEventListener('click', eraseCanvas, false);
drawingOne.addEventListener('click', drawingFilesOne, false);
drawingTwo.addEventListener('click', drawingFilesTwo, false);
drawingThree.addEventListener('click', drawingFilesThree, false);
drawingFour.addEventListener('click', drawingFilesFour, false);
//event listener for saving
/*button.addEventListener('click', function(e){
       var dataURL = canvas.toDataURL('image/png');
	   button.href = dataURL;
	   });*/


// if in canvas call these mouse events
canvas.addEventListener('mousedown', ev_canvas, false);
canvas.addEventListener('mousemove', ev_canvas, false);
canvas.addEventListener('mouseup', ev_canvas, false);
// these events add the touch moves
canvas.addEventListener('touchstart', ev_canvasMouse, false);
canvas.addEventListener('touchend', ev_canvasMouse, false);
canvas.addEventlistener('touchmove', ev_canvasMouse, false);
//canvas.addEventListener('MSPointerDown', ev_canvasMouse, false);
//canvas.addEventListener('MSPointerMove', ev_canvasMouse, false);
//canvas.addEventListener('MSPointerUp', ev_canvasMouse, false);



}

//this is the variable used to say when to launch the slider window.
var showBrushSize=true;
var showImageList=true;
var showTextureList=true;
var redColor;
var blueColor;
var greenColor;
var signColor;
var stampData;
var textureImage = 1;
var drawingFile;




/*function resizeCanvas(){
	var width=canvas.width;
	var height = canvas.height;
	var imageData=context.getImageData(0,0, canvas.width, canvas.height);
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight-100;
	context.putImageData(imageData, 0, 0);
}*/

// this is a button event, assign tool for respective buttons 1=line, 2=rect, etc.
function toolSelect(){
//brush tool selected
	if(tool==1){
	tool= new draw_Pencil();
	
	}
// eraser tool selected
	if(tool==2){
	tool=new draw_Eraser();
	}
	
// brushtool selected
	if(tool==3){
	tool=new draw_Brush();
	}
	
//stamptool selected
	if(tool==4){
	tool=new draw_Stamp();
	}
}

//resizeCanvas();

// if func(ev) == 1 set tool = 1 for line
function drawPencil(){
	tool=1;
	// call toolSelect to begin drawing line
	toolSelect();
}

// if func(ev) == 2 set tool = 2 for eraser
function drawEraser(){
	tool=2;
	// call toolSelect to begin erasing the canvas
	toolSelect();
}

function drawBrush(){
	tool = 3;
	toolSelect();
}

function drawStamp(){
	tool = 4;
	toolSelect();
}


 /* This sets the color for the eventhandler when the picker is called
    with a change command */
function setBrushColor(){
	
	paintColor=this.value;

	//var redColorHex = paintColor.substr(1,2);
	redColor = parseInt(paintColor.substr(1,2), 16);


	var greenColorHex = paintColor.substr(3,2);
	greenColor = parseInt(greenColorHex, 16);

	var blueColorHex = paintColor.substr(5,2);
	blueColor = parseInt(blueColorHex, 16);
	
	changeColorStamp();
		
}

// this function is called when the button on the screen 'brush size' is clicked.
// It then uses the div id=instructions to show the slider in a seperate window.
function setSizeOfBrush(){
	if(showBrushSize){
	instructions.style.display = 'inline';
	}
}


// this sets the size of the brush using the event handler when the range is called
// this also closes the window that was shown above in the function setSizeOfBrush above.
// the line instructions style display=none hides the slider.
function setBrushSize(){
	paintSize = this.value;
//	instructions.style.display = 'none';
	}
	
//	this function is called when the event listener for the brush opacity is clicked.
//It then uses the div id=instructions to show the slider in a seperate window with
// the slider for the brush size
function setBrushOpacity(){
	paintOpacity = this.value;
//	instructions.style.display = 'none';
}

//the function for the ok button on the size and opacity screen set up by setSizeOfBrush
function setOkButton(){
	instructions.style.display = 'none';
	}

	
function selectImageFile(){
	if(showImageList){
	fileInstructions.style.display = 'inline';
	}
}

/*function handleFiles(e){
	var img = new Image;
	img.src=URL.createObjectURL(e.target.files[0]);
	img.onload = function(){
	context.drawImage(img, 0, 0);
	fileInstructions.style.display = 'none';
	//alert('the image is drawn');
	}
}
*/
function eraseCanvas(){
	canvas.width = defaultWidth;
	canvas.height = defaultHeight;
	context.clearRect(0, 0, canvas.width, canvas.height);
	fileInstructions.style.display = 'none';

}


// list of drawing files to being loaded onto canvas
function drawingFilesOne(){
	drawingFile=1;
	drawingFiles();
	}

function drawingFilesTwo(){
	drawingFile=2;
	drawingFiles();
	}
	
function drawingFilesThree(){
	drawingFile=3;
	drawingFiles();
	}
	
	function drawingFilesFour(){
	drawingFile=4;
	drawingFiles();
	}
	
var oneDrawing, twoDrawing, threeDrawing, fourDrawing;
var oneDrawingOutline;
oneDrawing = "images/caPoppyOne.png";
oneDrawingOutline="images/caPoppyOneOutline.png";
twoDrawing="images/mouse.png";
threeDrawing='images/penguinOnIce.png';	
fourDrawing='images/mulberryTree.png';
 // this function loads the selected drawing or image onto the canvas.
function drawingFiles(){
	var imageOne= new Image;
	var imageOneOutline = new Image;
	if (drawingFile==1){
	//imageOne.src = "images/caPoppyOne.png"
	imageOne.src=oneDrawing;
	imageOneOutline.src=oneDrawingOutline;
	}
	if (drawingFile ==2){
	//imageOne.src = "images/mouse.png"
	imageOne.src=twoDrawing;
	}
	if (drawingFile == 3){
	//imageOne.src = "images/penguinOnIce.png"
	imageOne.src=threeDrawing;
	
	}
	if(drawingFile == 4){
	//imageOne.src = "images/mulberryTree.png"
	imageOne.src=fourDrawing;
	}
	//var iWidth = canvas_width*(imageOne.width/imageOne.height)
	imageOne.onload = function(){
	//context.drawImage(imageOne, 0, 0)
	canvas.width = defaultWidth;
	canvas.height = defaultHeight;
	if(imageOne.height > imageOne.width){
		canvas.width = (imageOne.width* (canvas.height/imageOne.height));
		canvas.height = imageOne.height * (canvas.height/imageOne.height);
	}
	if(imageOne.height <= imageOne.width){
		canvas.width = (imageOne.width* (canvas.width/imageOne.width));
		canvas.height = imageOne.height * (canvas.width/imageOne.width);
	}
	//context.clearRect(0, 0, canvas.width, canvas.height);

	context.drawImage(imageOneOutline, 0, 0, canvas.width,canvas.height); 
	pictureContext.drawImage(imageOne, 0, 0, 64, 64);
	
	}
	//alert('got to drawing One files');
	fileInstructions.style.display = 'none';
	
}

//This function starts the pencil drawing on the canvas
function draw_Pencil(BrushColor){
	var tool = this;
	this.started=false;
	var start_x, start_y;
		
	//This is called when the mouse down is pushed down.
	this.mousedown = function(ev){
		context.strokeStyle='rgba(' + redColor + ',' + greenColor + ',' + blueColor +', ' + paintOpacity + ')';
		context.lineWidth = paintSize;
		context.beginPath();
		context.moveTo(ev._x, ev._y);
		tool.started=true;
	};
	this.touchstart = function(ev){
		alert('got to the touch start event');
		context.strokeStyle='rgba(' + redColor + ',' + greenColor + ',' + blueColor +', ' + paintOpacity + ')';
		context.lineWidth = paintSize;
		context.beginPath();
		context.moveTo(ev._x, ev._y);
		tool.started=true;
	};	
	
	//This is called when you move the mouse
	this.mousemove = function(ev){
	if(tool.started){
		context.lineTo(ev._x,ev._y);
		context.stroke();
	}
	};
	
		// This is called when you release the mouse button.
    this.mouseup = function (ev) {
      if (tool.started) {
      context.closePath();
        //tool.mousemove(ev);
        tool.started = false;
      }
	};

/*
	// commands for the touch in the brush effect
	this.touchstart = function(ev){
	alert('got to the touchstart');
		context.strokeStyle=paintColor;
		context.lineWidth = paintSize;
		context.beginPath();
		context.moveTo(ev._x, ev._y);
		tool.started=true;
	};
	
	this.touchmove = function(ev){
	if(tool.started){
		context.lineTo(ev._x,ev._y);
		context.stroke();
	}
	};
	
	this.touchend = function (ev) {
      if (tool.started) {
        tool.touchmove(ev);
        tool.started = false;
      }
    };
*/
}
function draw_Eraser(){
	var tool = this;
	this.started = false;
	//this is called when the mouse down button is pushed.
	this.mousedown = function(ev){
	context.fillStyle = 'rgb(255, 255, 255)';
	context.beginPath();
	//context.moveTo(ev._x, ev._y);
	tool.started = true;
	};
	
	//this is called when you move the mouse
	this.mousemove= function(ev){
	if(tool.started){
	context.arc(ev._x, ev._y, paintSize, 0, 2*Math.PI, false);
	context.closePath();
	context.fill();
	}
	};
	
	
	//this is called when the mouse is released
	this.mouseup = function(ev){
	if(tool.started){
		//tool.mousemove(ev);
		tool.started = false;
	}
	};
}

function listTextures(){
//alert('clicked on the brush texture button');
	if(showTextureList){
		textureInstructions.style.display = 'inline';	
		//alert('got to the texture list button');
	}
	
}

// The following textureImage functions are setting for the various textures
// selected from the popup texture window.

function textureImageZero(){
		textureInstructions.style.display = 'none';
		textureImage=0;
		changeColorStamp();
}
	
function textureImageOne(){
	
		textureInstructions.style.display = 'none';
		textureImage=1;
		changeColorStamp();
}

function textureImageTwo(){
	textureInstructions.style.display = 'none';
	textureImage=2;
	changeColorStamp();
	}

function changeColorStamp(){
	var patternImage = new Image;
	if(textureImage == 0){
		patternImage.src='images/texture.png';
	}
	else if(textureImage == 1){
		patternImage.src='images/texture1.png';
	}
	else if(textureImage == 2){
		patternImage.src='images/texture2.png';
	}
	
	else{patternImage.src='images/texture0.png';}
	
	patternImage.onload=function(){
	patternCanvas.width = patternImage.width;
	patternCanvas.height = patternImage.height;
	patternContext.drawImage(patternImage, 0, 0, patternCanvas.width, patternCanvas.height);
	var stamp=patternContext.getImageData(0, 0,patternCanvas.width,patternCanvas.height);
	var stampData = stamp.data;
	
	for (var i = 0; i < stampData.length; i+=4)
	{
		stampData[i] = redColor;
		stampData[i+1] = greenColor;
		stampData[i+2] =  blueColor;
		//imageData[i+3] = imageData[i+3];
		
	}
	patternContext.clearRect(0, 0, patternCanvas.width, patternCanvas.height);
	patternContext.putImageData(stamp, 0, 0);
	}
	
	textureInstructions.style.display = 'none';
}

//The stamp tool function
function draw_Brush(){
	var tool = this;
	this.started = false;
	tool_default = true;
	changeColorStamp();
	var stamp=patternContext.getImageData(0, 0,64,64);
	
	//this is called when the mouse down button is pushed.
	this.mousedown = function(ev){
	
		tool.started = true;
		var left_x=ev._x, left_y=ev._y;
	};
	
	//this is called when you move the mouse
	this.mousemove= function(ev){
	if(tool.started){
	context.drawImage(patternCanvas,ev._x,ev._y, paintSize, paintSize);
	}
	};
	
	
	//this is caled when the mouse is released
	this.mouseup = function(ev){
	if(tool.started){
		tool.started = false;
	}
	};
}

//the function for the stamp effect on the canvas
function draw_Stamp(){
	var tool = this;
	this.started = false;
	tool_default = true;
	changeColorStamp();
	//var patternImage = new Image;
	
	//mouse down
	this.mousedown = function(ev){
	context.moveTo(ev._x, ev._y);
	tool.started = true;
	
	//context.fillStyle= context.createPattern(patternImage, "repeat");
	context.fillStyle = context.createPattern(patternCanvas,'repeat');
	};
	
	//this is called when you move the mouse
	this.mousemove= function(ev){

	if(tool.started){
	context.beginPath();
	//context.moveTo(ev._x, ev._y);
	context.fillRect(ev._x, ev._y, paintSize, paintSize);
		context.fill();
	}
	};
	
	
	//this is called when the mouse is released
	this.mouseup = function(ev){
	if(tool.started){
		//tool.mousemove(ev);
		tool.started = false;
	}
	};
}
	

// this is the main event loop for the canvas
// if canvas event, get (x,y) and call appropriate funtion from tool[ev.type]
function ev_canvas(ev){

	ev._x = ev.layerX;
    ev._y = ev.layerY;

// user must select a tool before the function executes	
	if (!tool_default){
	//alert('got to tool_default');
	tool= new draw_Pencil();
	tool_default = true;
	}
	else{
	var func = tool[ev.type];
    if (func) {
      func(ev);
    }
	}
// note:later add if !(func) send an alert "you must select a tool"			
}

function ev_canvasMouse(ev){
e.preventDefault();
alert('got to the touch events');
	ev._x= ev.offsetX;
	ev._y = ev.offsetY;
	// user must select a tool before the function executes	
	if (!tool_default){
	//alert('got to tool_default');
	tool= new draw_Pencil();
	tool_default = true;
	}
	else{
	var func = tool[ev.type];
    if (func) {
      func(ev);
    }
	}
}

// Save the drawing surface
function saveDrawingSurface(){
	
		var imageData=context.getImageData(0,0, canvas.width, canvas.height);

}
	
	
// Restore the drawing surface
function restoreDrawingSurface(){
	context.putImageData(imageData,0,0);
	}
	
function download(){
	//event.preventDefault();

	var dt = canvas.toDataURL(title);
	this.href=dt;
	}
	

init();
})();

