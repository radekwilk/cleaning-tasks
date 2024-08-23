const cleaningImg = document.querySelectorAll(".cleaning-img");
let imgName = "";

// console.log(cleaningImg);

cleaningImg.forEach((element) => {
  element.addEventListener("click", (e) => {
    imgName = `${element.children[0].id}.png`;
    console.log("Image was clicked");
    console.log(e);
  });
});
