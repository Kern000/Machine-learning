function createRow(container,studentName,samples){

    const row=document.createElement("div");
    row.classList.add("row");           //add html class
    container.appendChild(row);

    const rowLabel=document.createElement("div");
    rowLabel.innerHTML=studentName;
    rowLabel.classList.add("rowLabel");
    row.appendChild(rowLabel);

    for(let sample of samples){
        const {id,label,student_id}=sample;

        const sampleContainer=document.createElement("div");
        sampleContainer.id="sample_"+id;
        sampleContainer.classList.add('sampleContainer');

        const sampleLabel=document.createElement("div");
        sampleLabel.innerHTML=label;
        sampleContainer.appendChild(sampleLabel);

        const img=document.createElement('img');
        img.src=constants.IMG_DIR+'/'+id+'.png';   //src attribute of img is set to a looped id to access based on samples tt has id as filename
        img.classList.add("thumb");

        if(utils.flaggedUsers.includes(student_id)){
            img.classList.add("blur")
        }

        sampleContainer.appendChild(img);
        row.appendChild(sampleContainer);
    }
}

