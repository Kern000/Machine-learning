const draw=require('../common/draw.js');
const constants=require('../common/constants.js');
const utils=require('../common/utils.js')

const {createCanvas}=require('canvas');
const canvas=createCanvas(400,400);
const ctx=canvas.getContext('2d');

const fs=require('fs');

const fileNames=fs.readdirSync(constants.RAW_DIR); //read data direct from the 'Raw' file directoory
const samples=[]
let id=1;

fileNames.forEach(fn=>{
    const content=fs.readFileSync(      //readFileSync is synchronous
        constants.RAW_DIR+"/"+fn        //read file based on concatenated file path 'fn'
    );
        const {session,student,drawings}=JSON.parse(content); //take ea file and convert the string into JSON object - destructuring based on key - drawings will have all the objects and arrays under drawings in each file
        for(let label in drawings){     //label is nested in drawings
            samples.push({
                id,
                label,
                student_name:student,
                student_id:session
            })

        const paths=drawings[label];
        fs.writeFileSync(
            constants.JSON_DIR+"/"+id+".json",      //filepath defined and uniquely named
            JSON.stringify(paths)         //loop through and create JSON files of each drawing based on label for each student (basically the base unit that is the drawing for a label for a particular student without all the student information that was pushed into sample that was saved into a file later)
        )

        generateImageFile(
            constants.IMG_DIR+"/"+id+".png",
            paths
        )

        utils.printProgress(id, fileNames.length*8);        //count based on id for 1st param, then no.of files in folder * 8 because 8 pictures each
        
        id++;
        }
    });

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples)) //writing each file to the specific directory after massaging the data

fs.writeFileSync(constants.SAMPLES_JS, "const samples="+JSON.stringify(samples)+";") //concatenate
// this will write into object a const sample= JSONdata, and ; at the end in the file
// This non-standard structure is to avoid CORS here, and to prevent buggy live server

function generateImageFile(outFile,paths){       //call the filepath

    ctx.clearRect(0,0,
        canvas.width,canvas.height
    )                                   //because using same canvas, have to clear it before draw paths
    
    draw.paths(ctx,paths);
    const buffer=canvas.toBuffer("image/png");   //in build - convert canvas object into buffer containing image data. Buffer is region of memory used to hold temp data, which in next line, is output to file location with fs

    fs.writeFileSync(outFile,buffer);
}









