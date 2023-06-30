const constants=require('../common/constants.js');
const features=require('../common/features.js');

const fs=require('fs');

console.log("Extracting Features...")

const samples=JSON.parse(
    fs.readFileSync(constants.SAMPLES)
);

for(const sample of samples){
    const paths=JSON.parse(
        fs.readFileSync(
            constants.JSON_DIR+"/"+sample.id+".json"
        )
    );

    sample.point=[
        features.getPathCount(paths),
        features.getPointCount(paths)
    ];
}

const featureNames=["Path Count","Point Count"];

fs.writeFileSync(constants.FEATURES,
    JSON.stringify({
        featureNames,
        samples:samples.map(s=>{
            return{
            point:s.point,      //for each 's' meaning object in samples, get value of point property // previously it returns the entire object with fields we do not need
            label:s.label       //for each 's' meaning object in samples, get value of label property
            }
        })
    })
)
//featureNames and samples will be the keys, and their assigned values the object value

fs.writeFileSync(constants.FEATURES_JS,
   `const features=
   ${JSON.stringify({featureNames,samples})}
   ;`);

console.log("Done!")






