
    const element = document.querySelector('.menu');
    const mydrop=document.querySelector('.hide');
    element.addEventListener('click',()=>{
        if(mydrop.className==="hide"){
        mydrop.className="menudrop";
        }
        else{
            mydrop.className="hide";
        }
    })
    
 