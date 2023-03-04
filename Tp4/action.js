const colorvalue = document.querySelector(".value");
const colorList = document.querySelector(".all-colors");
const colorpickerbtn = document.querySelector("#color-picker");
const pickedcolor = JSON.parse(localStorage.getItem("Picked-color") || "[]");
const clearall = document.querySelector(".clear-all");


const copycolor = elem => {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText = "COPIED";
    setTimeout(() => elem.innetText = elem.dataset.color,1000)
}

const showColor = () => {
    if(!pickedcolor.length) return;
    colorList.innerHTML = pickedcolor.map(color => `
        <li class="color">
            <span class="rect" style="background:${color}; border: 1px solid ${color == "#ffffff" ? "#ccc" : color};"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>
    `).join("");
    document.querySelector(".coor-picked").classList.remove("hide");
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click" , e => copycolor(e.currentTarget.lastElementChild));
    });
}
showColor();
const acticateayedropper = async () =>{
    try{
        const eyeDropper = new EyeDropper();
        const {sRGBHex} = await eyeDropper.open();
        if(!pickedcolor.includes(sRGBHex)){
            pickedcolor.push(sRGBHex);
            localStorage.setItem("Picked-color",JSON.stringify(pickedcolor));
            showColor();
        }
        
    }catch(error){
        console.log(error);
    }
}

const clearingall = () =>{
    pickedcolor.length = 0;
    localStorage.setItem("Picked-color",JSON.stringify(pickedcolor));
    document.querySelector(".coor-picked").classList.add("hide");
}

clearall.addEventListener("click", clearingall);
colorpickerbtn.addEventListener("click", acticateayedropper);

//=============================================================================================================================================================================
//mainfset.json ---> 
//this is json file that specfie the metadata and behavior of a chrome extension it is reauired for all chrome extention and must be placed i the root directory 
//the nain file contains infomation such as the extension name and versoin and permission