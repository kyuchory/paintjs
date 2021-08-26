const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName("color");
const range = document.getElementById("range");
const mode = document.getElementById("modeBtn");
const saveBtn = document.getElementById("saveBtn");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;

canvas.width =CANVAS_SIZE;
canvas.height =CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseEnter(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleCanvasClick(){
    if(filling===true){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    ctx.lineWidth= event.target.value;
}

function handleModeClick(){
    if(filling === true){
        mode.innerText="Paint";
        filling=false;
    }else{
        mode.innerText="Fill";
        filling=true;
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS"
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseEnter);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors){// if문 사용이유 ===> 항상 정의가 되어있는지 확인하기 위함.....
    //console.log(Array.from(colors)); //Array.from() --> 객체들을 배열화 해줌.
    Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));
}

if(range){
    range.addEventListener("input", handleRangeChange);
}
if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}