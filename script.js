const imageInput = document.getElementById("user-image")
const imagePreview = document.querySelector(".preview")
const colorBox = document.querySelector(".color-box");
const copyButton = document.querySelector(".copy-button");

if(!window.EyeDropper){
    alert("your browser does not support eyedropper")
}
const eyedropper = new EyeDropper();
const pickerButton = document.querySelector(".open-picker")
const result = document.querySelector(".result")
imageInput.addEventListener("change", (event)=>{
    imagePreview.classList.add("active")
    const file = event.target.files[0];
    if(!file){
        return
    }
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        if (imagePreview.tagName === "IMG") {
            imagePreview.src = reader.result;
        } else {
            console.error("Element with class 'preview' is not an image.");
        }
    });
    reader.readAsDataURL(file);
})
pickerButton.addEventListener("click",()=>{
    result.classList.add("show")
    eyedropper.open().then(res => {
        const pickedColor = res.sRGBHex;
        result.style.backgroundColor = pickedColor;
        result.innerHTML = `Picked color: <br> ${res.sRGBHex} </br>`;
    }).catch(err => {
        console.log("Color selection is cancelled")
    })
})