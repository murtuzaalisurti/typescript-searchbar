/* 
* search bar implementation - ts
? author: Murtuzaali Surti - github:- murtuzaalisurti
* api: https://hp-api.herokuapp.com/api/characters 
*/

// selectors
const searchBar = document.querySelector("input") as HTMLInputElement
const listContain = document.querySelector(".listContain") as HTMLDivElement
const unorderedList = document.querySelector('ul') as HTMLUListElement
const message = document.querySelector(".message") as HTMLParagraphElement

// api response type
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

message.textContent = "Loading"

// function to display list items
function displayItems(data: apiDataObject[]): void {
    unorderedList.innerHTML = ""

    data.forEach((element: apiDataObject) => {
        const listItem = document.createElement('li') as HTMLLIElement
        listItem.textContent = element.name
        unorderedList.appendChild(listItem)
    });
}

// filter items based on search query
function filterItems(data: apiDataObject[]) {
    return data.filter((element: apiDataObject) => {
        return (element.name.toLowerCase().includes(searchBar.value.toLowerCase()))
    })
}

// wrapper function implementation
async function makeRequest<TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> {
    return fetch(url, config).then(res => res.json()).then(data => data as TResponse).catch(err => err instanceof Error ? (`${err.message}\n ${err.stack}`) : err)
}

// get and modify data according to the search query
async function getData(): Promise<void> {

    try {
        // const res: Response = await fetch('https://hp-api.herokuapp.com/api/characters')
        // const data: apiDataObject[] = await res.json()

        /*
        * OR 
        */

        // generic function
        const data = await makeRequest<apiDataObject[]>('https://hp-api.herokuapp.com/api/characters')
        
        message.textContent = ""

        displayItems(data)

        searchBar.addEventListener("keyup", (e: Event): void => {
            const filtered = filterItems(data)
            displayItems(filtered)
        })

    } catch (error) {
        console.log(error)
    }
}

getData()
