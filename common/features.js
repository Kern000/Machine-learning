const features={};

features.getPathCount=(paths)=>{
    return paths.length;
}

features.getPointCount=(paths)=>{
    const points=paths.flat();
    return points.length;
}

// The flat() method is an array method introduced in ECMAScript 2019 (ES10). It is used to flatten a nested array structure into a single-level array.
// paths.flat() will still count all the points, including the overlapping ones. 

// if want only unique:
// features.getPointCount = (paths) => {
//     const pointsSet = new Set(paths.flat());
//     return pointsSet.size;
//   };

if(typeof module!=='undefined'){
    module.exports=features;
}