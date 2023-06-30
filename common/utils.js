const utils={};

utils.flaggedUsers=
    [1663882102141,1663900040545,1664485938220];

utils.formatPercent=(n)=>{
    return(n*100).toFixed(2)+"%";
}

utils.printProgress=(count,max)=>{

    process.stdout.clearLine();     //clear current line in console, so progress bar appear consistently updating dynamically without creating new lines. process.stdout is writable stream to send output to console terminal
    process.stdout.cursorTo(0);     //Move cursor to beginning of line
    const percent=utils.formatPercent(  //formatPercent to be defined
        count/max
    );
    process.stdout.write(count+"/"+max+" ("+percent+")" //write progress info to console
    )
}

utils.groupBy=(objArray,key)=>{
    const groups={};
    for(let obj of objArray){        
        const val=obj[key]          //get value of specified key from ea object

        if(groups[val]==null){      //if group of val of specified key doesnt exist, create empty array
            groups[val]=[];
        }
        groups[val].push(obj);      //push current obj into the group w specified value as the key - basically grouping - collecting all objects with the same value for the specified key into same group array
    }
    return groups
}


if(typeof module!=='undefined'){
    module.exports=utils;
}
