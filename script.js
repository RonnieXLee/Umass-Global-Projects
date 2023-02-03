let img = document.getElementsByTagName("img");
let form = document.querySelector("form");
const button = document.querySelector("button");
form.addEventListener("submit", function(e){
    e.preventDefault();
    const meme = document.createElement("div");
    const textTop= document.createElement("div");
    const textBottom = document.createElement("div");
    const img = document.createElement("img");
    const removeBtn = document.createElement('button');

    img.src = document.getElementById("imageUrl").value;
    textTop.classList.add("textTop");
    textTop.innerHTML = document.getElementById("topText").value;

    removeBtn.innerText = "Delete Meme";
    removeBtn.addEventListener('click', function(e) {
        e.target.parentElement.remove();
    });

    textBottom.classList.add("textBottom");
      textBottom.innerHTML = document.getElementById("bottomText").value;
      

    meme.classList.add("meme");
    meme.append(textTop);
    meme.append(textBottom);
    meme.append(img);
    
    meme.append(removeBtn);
    
    let memeLocation = document.getElementById("location");
    memeLocation.append(meme);

form.reset()
   
    })