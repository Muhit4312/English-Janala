

const loadLesson = () => {
    const apiLink = "https://openapi.programming-hero.com/api/levels/all"
    fetch(apiLink)
    .then((response) => response.json())
    .then((json) => displayLesson(json.data))
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


const displayLesson = (lessons) => {
    const lebelContainer = document.getElementById("label-container")
    lebelContainer.innerHTML = ""
    for(let lesson of lessons){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
            <Button id= "lesson-btn-${lesson.level_no}" onclick ="loadLevelWords(${lesson.level_no})" class=" btn btn-primary btn-outline lesson-button">
                <i class="fa-solid fa-book-open"></i>
               Lessson -${lesson.level_no}
            </Button>
        `
        lebelContainer.appendChild(btnDiv)
    } 

}

const manageLoadingSpinner = (status) => {
    if(status == true){
       document.getElementById("loading-sppiner").classList.remove("hidden")
       document.getElementById("words-container").classList.add("hidden")

    }
    else{
        document.getElementById("words-container").classList.remove("hidden")
       document.getElementById("loading-sppiner").classList.add("hidden")
    }
}

const loadLevelWords = (id) => {
    manageLoadingSpinner(true);
    const wordLink = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(wordLink)
    .then((res) => res.json())
    .then((data) => {
        activeBtnColor(id)
        displayLevelWords(data.data) 
    })
}

const activeBtnColor = (id) => {
    const clickedBtn = document.getElementById(`lesson-btn-${id}`)
    
    const lessonButton = document.querySelectorAll(".lesson-button")
    lessonButton.forEach(btn => btn.classList.remove("active-color"))
    clickedBtn.classList.add("active-color")
}



const displayLevelWords = (words) => {
    const wordsContainer = document.getElementById("words-container")
    wordsContainer.innerHTML = "";

    if( words.length === 0){
        wordsContainer.innerHTML = `<div class="text-center col-span-full my-10">
            <img class= "mx-auto mt-3" src="/assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-3xl mt-5">নেক্সট Lesson এ যান</h2>
        </div>`;
        manageLoadingSpinner(false)
        return
    }

    words.forEach(word => {
        const levelDiv = document.createElement("div")
        levelDiv.innerHTML = `
            <div class="bg-white py-15 px-10 text-center rounded-sm shadow-sm space-y-4">
                <h2 class="font-bold text-2xl">${word.word ? word.word : " Not Found!"}</h2>
                <p class="font-semibold">Meaning / Pronunciation</p>
                <div class="font-medium text-2xl">${word.meaning ? word.meaning: "Not Found!"} / ${word.pronunciation ? word.pronunciation: "Not Found!"}</div>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetail(${word.id})" class="btn"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        

        wordsContainer.appendChild(levelDiv)
    });
    manageLoadingSpinner(false)
}


const loadWordDetail = async(id) => {
    const detailLink = `https://openapi.programming-hero.com/api/word/${id}`
    const res = await fetch(detailLink)
    const details = await res.json();
    displayWordDetail(details.data)
}

const createArryFunc = (arr) =>{
    const HTMLelements = arr.map(ele => `<span class = "btn"> ${ele} </span>`)
    return HTMLelements.join(" ")
}

const displayWordDetail = (wordDetail) =>{
    const detailsContainer = document.getElementById("details-container")
    detailsContainer.innerHTML = `
                    <div>
                        <h3 class="text-2xl mb-5 font-bold">${wordDetail.word} (<i class="fa-solid fa-microphone-lines"></i>: ${wordDetail.pronunciation} )</h3>
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold">Meaning</h3>
                        <p class="py-4">${wordDetail.meaning}</p>
                    </div>
                    <div>
                        <h3 class="text-2xl  font-bold">Example</h3>
                        <p class="py-4">${wordDetail.sentence}</p>
                    </div>
                    
                    <div>
                        <h3 class="text-2xl mb-5 font-bold">Synonym</h3>
                        <div class= "">
                            ${createArryFunc(wordDetail.synonyms)}
                        </div>
                    </div>
    
    `

    document.getElementById("my_modal_5").showModal()

}




loadLesson()


document.getElementById("btn-search").addEventListener("click", () => {
    const lessonButton = document.querySelectorAll(".lesson-button")
    lessonButton.forEach(btn => btn.classList.remove("active-color"))
    
    const inputSearch = document.getElementById("input-search")
    const inputValue = inputSearch.value.trim().toLowerCase();
    console.log(inputValue)


    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((responseAll) => responseAll.json())
    .then((jsonAll) => {
        const allWords = jsonAll.data
        const filterWord =  allWords.filter(word => word.word.toLowerCase().includes(inputValue))

        displayLevelWords(filterWord)
    })

    
})