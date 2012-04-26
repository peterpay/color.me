function avatarElement(type)
        {
            this.type=type;
            this.id=0;
            this.xcoordinate=0;
            this.ycoordinate=0;
            this.image="";  
            this.isDynamic=false;
            this.category=0;
            this.subcategory=0;
            this.colorRanges=new Array();
            this.colorSelected="FFFFFF";
            this.isDeleted=false;
            this.isVisible=true;      
        }


        function clear() {
                  var ctx =this.document.getElementById("currentAvatar").getContext("2d");//.getContext("2d");
                  ctx.width=ctx.width;
                  ctx.clearRect(0, 0, 1024, 768);                                  
        }




function createTooltip(event){        
    var popupString="<div class=\"tooltip\" style=\"background-image:url('images/dropImage.png'); position:absolute; background-color:transparent; height:40px; width:30px; z-index:101;\"> <div  style=\"width:20px; height:20px; border-radius:20px; position:relative; left:5px; top:15px; z-index:-1;  background-color:"+ event.target.style.backgroundColor +"\"></div></div>";    
    $(popupString).appendTo('body');
    this.currentColorSelected=event.target.style.backgroundColor;  
    
    if(this.currentElementDrawing.indexOf(".svg")!=-1)
    {    	
    	readSVG(this.currentElementDrawing);    
    }
    
    positionTooltip(event);        
};
function positionTooltip(event){
    var tPosX = event.clientX;
    var tPosY = event.clientY + 15;
    $('div.tooltip').css({top: tPosY, left: tPosX});    
};

function interpolateColor(minColor,maxColor,maxDepth,depth){
 
    function d2h(d) {return d.toString(16);}
    function h2d(h) {return parseInt(h,16);}
    
    if(depth == 0){
        return minColor;
    }
    if(depth == maxDepth){
        return maxColor;
    }
    
    var color = "#";
    
    for(var i=1; i <= 6; i+=2){
        var minVal = new Number(h2d(minColor.substr(i,2)));
        var maxVal = new Number(h2d(maxColor.substr(i,2)));
        var nVal = minVal + (maxVal-minVal) * (depth/maxDepth);
        var val = d2h(Math.floor(nVal));
        while(val.length < 2){
            val = "0"+val;
        }
        color += val;
    }
    return color;
}



   function redraw()
   {
                  clear();
                  var ctx =this.document.getElementById("currentAvatar").getContext("2d");
                  var l = currentImages.length;
                  for (var i = l-1; i >= 0; i--) 
                  {  
                        var tempx,tempy; 
                        tempx=this.currentImages[i].xcoordinate;
                        tempy=this.currentImages[i].ycoordinate;

                        if(!this.currentImages[i].isDeleted && this.currentImages[i].isVisible)    
                        {              
                            ctx.drawImage(this.document.getElementById(this.currentImages[i].image),tempx,tempy);                  
                        }    
                        else
                        {
                            console.log("deleting image");                  
                        }                      
                  }   
                  if(this.mySel!=-1)
                  {
                       ctx.strokeRect(currentImages[mySel].xcoordinate+8,
                                             currentImages[mySel].ycoordinate+8,
                                             (currentImages[mySel].xcoordinate+currentImages[mySel].w)-currentImages[mySel].xcoordinate-16,
                                             (currentImages[mySel].ycoordinate+currentImages[mySel].h)-currentImages[mySel].ycoordinate-16);
                  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
}

function colorToSlice(color)
{
		return "<li style=\"width:1px; height:25px; background-color:"+color+"\"></li>";
}


function generarGamaColores(colorInicial,colorFinal,tandas)
{
		if(tandas<=0)
		{
			return this.currentColors;
		}
		else
		{
		    color=interpolateColor(colorInicial,colorFinal,3,1);
			this.currentColors.push(colorToSlice(color));
			tandas=tandas-1;			
			generarGamaColores(colorInicial,color,tandas);
			tandas=tandas-1;			
			generarGamaColores(color,colorFinal,tandas);			    		    
		}
}

function hex (c) {
  var s = "0123456789abcdef";
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex (rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB (hex) {
  var color=Array(3);
  color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
  color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
  color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
  return color;
}

function getSteps(startColor,endColor)
{
			var start = convertToRGB ('#'+startColor);    /* The beginning of your gradient */
			var end   = convertToRGB ('#'+endColor);    /* The end of your gradient */			
			
			var offsetArray= [0, 0, 0];
    		var numSteps = 30; 
    		var numGaps = numSteps - 1; 
    		for(var i=0;i<3;i++) 
	    	{
    		      offsetArray[i] = (start[i] - end[i]) / numGaps; 
    		} 
    		for(var i=1;i<numSteps;i++) 
    		{ 
    			tempArray = [ Math.floor(start[0] - (offsetArray[0] * i)), Math.floor(start[1] - (offsetArray[1] * i)),Math.floor(start[2] - (offsetArray[2] * i)) ];
				this.document.getElementById("colorSliderColors").innerHTML=this.document.getElementById("colorSliderColors").innerHTML+colorToSlice(convertToHex (tempArray));    			
	 		} 
}


function readSVG(url)
{
	if (window.XMLHttpRequest) 
	{
			req = new XMLHttpRequest();
			req.overrideMimeType ("image/svg+xml");//"text/xml");
			req.onreadystatechange = processReqChange;
			req.open("GET", url, true);
			req.send(null);
	} 
	else if (window.ActiveXObject) 
	{
		req = new ActiveXObject("Microsoft.XMLHTTP");
		if (req) 
		{
			req.onreadystatechange = processReqChange;
			req.open("GET", url, true);
			req.send();
		}
	}
}



function processReqChange() {

	if (req.readyState == 4 && req.responseXML) 
	{
	   var resp = req.responseXML;			
       if(resp.getElementsByTagName("svg")[0].getElementById(currentRegion)!=null)
       {
	       resp.getElementsByTagName("svg")[0].getElementById(currentRegion).attributes["fill"].value=currentColorSelected;
       }
       		       
		canvg('tempCanvas', resp ,{ ignoreMouse: true, ignoreAnimation: true, scaleWidth: 50,scaleHeight:50 });
		var canvasTemporal=document.getElementById("tempCanvas");
		var canvasFinal=document.getElementById("canvasAvatar");
		var ctx= canvasTemporal.getContext("2d");
		var ctxFinal=canvasFinal.getContext("2d");
		// Despues de cambiar el color guardar cambioPrevio
		var dataURL = canvasTemporal.toDataURL("image/png");
        var tempImage=new Image();
        
        if(currentElementDrawing=="dynamic.svg")
        {
        	ctxFinal.globalCompositeOperation="destination-over";
        }        
        else
        {
        	ctxFinal.globalCompositeOperation="source-over";
        }        

        
		tempImage.onload = function (ev)
		{
		       ctxFinal.drawImage(tempImage,0,0);		
		};
		tempImage.src=dataURL;					
	}
}

function initialize()
{
			
			getSteps("00DE6F","0B21FF");
			getSteps("0B21FF","FF00FF");
			getSteps("FF00FF","FF0000");
			getSteps("FF0000","FF7A21");
			getSteps("FF7A21","FFFF00");
			getSteps("FFFF00","F2DEA3");						
			$('#colorSliderColors li').mouseover(function(event) {
    				createTooltip(event);               
				}).mouseout(function(){
			    $('div.tooltip').css({display: "none"});    
			});		

			$('.dropdown-toggle').dropdown();			
			readSVG("mexico.svg");			
}

function changeElement(id)
{        
		if(id.indexOf(".svg")!=-1)
		{
   		   this.currentElementDrawing=id;
   		}
   		else
   		{
   	            this.currentElementDrawing=id;
   	   			var newStaticImage=new Image();   			
				var canvasTemporal=document.getElementById("tempCanvas");
				var canvasFinal=document.getElementById("canvasAvatar");
				var ctx= canvasTemporal.getContext("2d");
				var ctxFinal=canvasFinal.getContext("2d");				
				var dataURL = canvasTemporal.toDataURL("image/png");
		        var tempImage=new Image();
				tempImage.onload = function (ev)
				{
		       		ctxFinal.drawImage(tempImage,0,0);		
				};
				tempImage.src=id;		
				document.body.appendChild(newStaticImage);
   		}
}

function saveCanvas()
{
				var canvasFinal=document.getElementById("canvasAvatar");
				var dataURL = canvasFinal.toDataURL("image/png");
}



