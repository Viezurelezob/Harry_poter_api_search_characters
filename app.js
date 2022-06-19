const charactersList = document.getElementById('charactersList')
const searchBar = document.getElementById('searchBar')
let hpCharacters = []

// The search function which will get the input text 
searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase()

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        )
    })
    displayCharacters(filteredCharacters)
})


//Fetch the data from the url and display them
// 
const loadCharacters = async () => {
    try {
        const res = await fetch('https://hp-api.herokuapp.com/api/characters')
        hpCharacters = await res.json()
        displayCharacters(hpCharacters)
    } catch (err) {
        console.error(err)
    }
}

//Render the data from the api in the HTML
const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}"></img>
            </li>
        `
        })
        .join('')
    charactersList.innerHTML = htmlString
};

loadCharacters()
