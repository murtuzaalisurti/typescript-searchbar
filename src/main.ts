// search bar

type apiDataObject = {
    actor: string,
    alive: boolean,
    alternate_actors: string[],
    alternate_names: string[],
    ancestry: string,
    dateOfBirth: string,
    eyeColour: string,
    gender: string,
    hairColour: string,
    hogwartsStaff: boolean,
    hogwartsStudent: boolean,
    house: string,
    image: string,
    name: string,
    patronus: string,
    species: string,
    wand: {
        wood: string,
        core: string,
        length: number | null
    },
    wizard: boolean,
    yearOfBirth: number
}

const body = document.querySelector("body") as HTMLBodyElement
const searchBar = document.querySelector("input") as HTMLInputElement
const apiDataListContain = document.createElement("div") as HTMLDivElement
const newList = document.createElement('ul') as HTMLUListElement


apiDataListContain.textContent = "Loading"
body.appendChild(apiDataListContain)

searchBar.addEventListener("keyup", (e: Event): void => {
    console.log(searchBar.value)
})


fetch('https://hp-api.herokuapp.com/api/characters').then((res: Response) => {
    return res.json()
}).then((data: apiDataObject[]) => {
    apiDataListContain.textContent = ""
    data.forEach((element) => {
        const listItem = document.createElement('li') as HTMLLIElement
        listItem.textContent = element.name
        newList.appendChild(listItem)
        // console.log(listItem)
        
    });

    apiDataListContain.appendChild(newList)
})