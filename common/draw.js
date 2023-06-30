const draw={};

//draw is utility object, will have a function called path
//define the draw.path function

draw.path=(ctx,path,color="black")=>{
    ctx.strokeStyle=color;
    ctx.lineWidth=3;
    ctx.beginPath();
    ctx.moveTo(...path[0]) //move to first point in the path - x.y in the array -> ... spread into 2 components to allow them to pass as arguments into moveTo()
    for(let i=1; i<path.length;i++){
        ctx.lineTo(...path[i]); //adds a line segment from current pos to next point in path array
    }
    ctx.lineCap = "round"; //make the stroke edge rounds
    ctx.lineJoin = "round";
    ctx.stroke();  //draws the line defined by path defined earlier
}

// this create on the ctx which is the 2d render, to use linewidth 3 to draw with color black
// this will add color to the array that is mapped in path array [] in object
// beginPath is build-in method in HTML
// The beginPath() method is called before defining each new path to ensure that the previous path is not connected to the new one.
// By calling beginPath(), you start with a clean slate and can define a new path without any remnants from previous paths.

// moveTo(x, y): Moves the starting point of a new sub-path to the specified coordinates (x, y) without drawing a line.
// lineTo(x, y): Adds a straight line from the current position to the specified coordinates (x, y).

// define below, drawing multiple paths

draw.paths = (ctx,paths,color="black")=>{

    for(const path of paths){
        draw.path(ctx,path,color);
    }
}

if(typeof module!=='undefined'){       //because browser dunno what 'module' is
module.exports=draw;
}

// typeof module !== 'undefined' is a check to determine if the current environment is Node.js. In Node.js, the module object is available
// However, in a browser environment, the module object is not available by default. This check ensures that the code within the if block is only executed in a Node.js environment. In the browser, the code within the if block will be ignored, and the draw object or function won't be exported.
// This approach allows the module to work properly in both Node.js and browser environments, preventing any potential errors or compatibility issues



