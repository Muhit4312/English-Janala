const loadData = () => {
    const apiLink = "https://openapi.programming-hero.com/api/levels/all"
    fetch(apiLink)
    .then((response) => response.json())
    .then((json) => displayLesson(json.data))
}

loadData()


const displayLesson = (lessons) => {
    const lebelContainer = document.getElementById("label-container")
    lebelContainer.innerHTML = ""
    for(let lesson of lessons){
        const btnDiv = document.createElement("div")
        btnDiv.innerHTML = `
            <Button class=" btn btn-primary btn-outline ">
                <i class="fa-solid fa-book-open"></i>
               Lessson -${lesson.id}
            </Button>
        `
        lebelContainer.appendChild(btnDiv)
    } 

}