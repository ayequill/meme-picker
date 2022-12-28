import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");

emotionRadios.addEventListener("change", highlightCheckedOption);
getImageBtn.addEventListener("click", renderCat);
memeModalCloseBtn.addEventListener("click", closeModal);

function highlightCheckedOption(e) {
  const radiosArray = document.getElementsByClassName("radio");
  for (let radio of radiosArray) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}
function closeModal() {
  memeModal.style.display = "none";
}

function renderCat() {
  const catObj = getSingleCatObject();
  memeModalInner.innerHTML = `<img 
                                class="cat-img" 
                                src="./images/${catObj.image}"
                                alt="${catObj.alt}"
                              >`;

  memeModal.style.display = "flex";
}
function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomNum = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNum];
  }
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedEmotion = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const isGif = gifsOnlyOption.checked;
    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGif && cat.isGif) {
        return cat.emotionTags.includes(selectedEmotion);
      }
      if (!isGif) {
        return cat.emotionTags.includes(selectedEmotion);
      }
    });

    // ! same code as above but i prefer that one because its more strict
    //   const matchingCatsArray = catsData.filter(function(cat){
    //     if (isGif){
    //     return cat.emotionTags.includes(selectedEmotion) && cat.isGif
    //     }
    //     else{
    //     return cat.emotionTags.includes(selectedEmotion)
    //   }
    // })
    return matchingCatsArray;
  }
}

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags)
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
  }
  return emotionsArray;
}

function renderEmotionsRadios() {
  const emotions = getEmotionsArray(catsData);
  let radioItems = ``;

  for (let emotion of emotions) {
    radioItems += `	<div class="radio">
                        <label for="${emotion}">${emotion}</label>
                         <input 
                         type="radio" 
                         name="emotions" 
                         value="${emotion}"id="${emotion}">
                         </div>`;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
