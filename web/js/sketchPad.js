
class SketchPad{

    constructor(container, size=400){     //init in python. Container is parameter, rep HTML container for this
        this.canvas=document.createElement("canvas");  //this (self), .canvas property of an instance of this object (any instance) ->
        this.canvas.width=size;
        this.canvas.height=size;
        this.canvas.style=`
            background-color: white;
            box-shadow: 0px 0px 10px 2px black;
        `;
        container.appendChild(this.canvas)  //new instance, will append

        //formating
        const lineBreak=document.createElement("br");
        container.appendChild(lineBreak);

        this.undoBtn=document.createElement("button")
        this.undoBtn.innerHTML="Undo";
        container.appendChild(this.undoBtn);

        this.ctx=this.canvas.getContext("2d");  //this.ctx = this.canvas.getContext("2d"); assigns the 2D rendering context of the <canvas> element to the ctx property of the SketchPad instance. -> this .getContext("2d") allows drawing on the object using canvas API
        this.paths=[]                           // renamed as paths from path - this will be array of arrays
        this.isDrawing=false;                   //for default
                                                //The getContext() method is called on the <canvas> element and takes a string parameter specifying the context type. In this case, "2d" is passed to indicate that we want to get the 2D rendering context.

        this.reset()
        this.#redraw();                         //add disable undo button from the start
        this.#addEventListeners();              //private method #, cannot be called outside this class - want to put event listener to see what the mouse is doing
    }                   

    //  constructor is method that is called before any other methods are called for an instantiated Object.
    //  The html <canvas> element itself provides a drawable region on a web page, but it doesn't provide a built-in API for drawing graphics. The rendering context, obtained through getContext("2d"), gives you access to a set of drawing functions and properties that allow you to draw and manipulate graphics on the canvas.
    //  create reset() which is a public method accessing from outside

    reset(){
        this.paths=[];
        this.isDrawing=false;
        this.#redraw();
    } 

    #addEventListeners(){
        this.canvas.onmousedown=(evt)=>{                            //when the mouse is pressed down on the canvas
            const mouse=this.#getMouse(evt)
                this.paths.push([mouse]);           // create array of arrays in arry = new path grouping
                this.isDrawing=true;                                // attributes of class defined on top in constructor
        }
        this.canvas.onmousemove=(evt)=>{
            if(this.isDrawing){    
                const mouse=this.#getMouse(evt)
                const lastPath=this.paths[this.paths.length-1]
                lastPath.push(mouse);          // This is correct, the prev push([mouse]) create an array, in an array, in the main array - so by accessing the mainArray[0], you accessing the array with the array coordinate, so when you push, you push into this array of array, where individual arrays of coordinates are each element. This leads to grouping of paths.
                this.#redraw();               
            }
        }
        document.onmouseup=()=>{
            this.isDrawing=false;
        }

        this.canvas.ontouchstart=(evt)=>{
            const loc=evt.touches[0];       //capture first touch location, trigger onmousedown event on this
            this.canvas.onmousedown(loc);
        }

        this.canvas.ontouchmove=(evt)=>{
            const loc=evt.touches[0];
            this.canvas.onmousemove(loc);
        }
        document.ontouchend=()=>{           //change this.canvas to document for UI/UX - thus when go out of bounds of canvas, it will stop it and make u start new line
            document.onmouseup();
        }
        this.undoBtn.onclick=()=>{
            this.paths.pop();
            this.#redraw();         //.pop removes last array entry (group), then #redraw() redraws everything else here based on the new paths array
        }
    }

    #redraw(){
        this.ctx.clearRect(0,0, 
            this.canvas.width,this.canvas.height); // x,y,width,height: 0,0 means top left corner, this.canvas.width and height - meaning full width and height, ensures whole rect is clear
        draw.paths(this.ctx,this.paths)               //draw.path takes rendering context and path array as argument but need define draw and .path method
        if(this.paths.length>0){
            this.undoBtn.disabled=false;
        }else{
            this.undoBtn.disabled=true;
        }
    }                                       //clearRect clear everything, draw.paths redraw everything in the paths array, to reflect the updated arrays pushed in

    //draw.path will be in draw.js - all the paths renamed - to accomodate multiple paths and modifying to push into array.
    
    #getMouse=(evt)=>{
        const rect = this.canvas.getBoundingClientRect();                
        return [
            Math.round(evt.clientX-rect.left),
            Math.round(evt.clientY-rect.top)
            ];
    }
}

//getboundingClientRect() is built in, return object w properties representing position and size of element - In other words, retrieve size info of canvas element relative to viewport
// evt.clientX-rect.left => x-coordinate of mouse relative to canvas minus rect.left = get mouse coordinates relative to canvas element (not the page). evt.clientX and Y is inbuild
// evt.clientY-rect.top => y-coordinate of mouse relative to canvas  minus rect.top = get mouse coordinates relative to canvas element (not the page)
//storing in mouse array, but this is only the coordinates when mousedown event occurs







