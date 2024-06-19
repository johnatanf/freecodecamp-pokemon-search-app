async function retrieveData(searchString) {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchString}`)
        if(!response.ok) {
            throw new Error("Data not available.")
        }
        const data = await response.json()
        return data
    } catch(error) {
        return { error: error.message }
    }
}

function clearFields() {
    const fields = [
        'search-input',
        'search-button',
        'pokemon-name',
        'pokemon-id',
        'weight',
        'height',
        'types',
        'hp',
        'attack',
        'defense',
        'special-attack',
        'special-defense',
        'speed'
    ]

    for(let field of fields) {
        let currentEl = document.getElementById(field)
        currentEl.innerHTML = ""
    }
}