const paintBtn = document.querySelector("#paintBtn");

let paint = true;

function handlePaintBtn(){
    if(paint === true){
        paintBtn.innerText="Fill";
        paint = false;
    }else{
        paintBtn.innerText="Paint";
        paint = true;
    }
}

paintBtn.addEventListener("click", handlePaintBtn);

console.dir(paintBtn);