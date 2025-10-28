const createArryFunc = (arr) =>{
    const HTMLelements = arr.map(ele => `<span class = "btn"> ${ele} </span>`)
    console.log(HTMLelements.join(" "))
}

const SynonymArr = ["hello", "Hi", "Hey" ]


createArryFunc(SynonymArr)