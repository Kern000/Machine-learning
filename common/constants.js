
const constants={};

//define file path locations

constants.DATA_DIR="../data";  //DATA_DIR property is added to the constants object and assigned the value "../data"
constants.RAW_DIR=constants.DATA_DIR+"/raw";    //add RAW_DIR property and path as value
constants.DATASET_DIR=constants.DATA_DIR+"/dataset";
constants.JSON_DIR=constants.DATASET_DIR+"/json";
constants.IMG_DIR=constants.DATASET_DIR+"/img";
constants.SAMPLES=constants.DATASET_DIR+"/samples.json";
constants.FEATURES=constants.DATASET_DIR+"/features.json";
constants.JS_OBJECTS="../common/js_objects";
constants.SAMPLES_JS=constants.JS_OBJECTS+"/samples.js";
constants.FEATURES_JS=constants.JS_OBJECTS+"/features.js";


//massage the clash between node js and browser js

if(typeof module!=='undefined'){
    module.exports=constants;
}


//cont 1.34.18
