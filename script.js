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

function createTypesHTML(arr) {
    let finalHTML = ""
    
    for(item of arr) {
        finalHTML = finalHTML.concat(`<li class="type">${item}</li>`)
    }

    return finalHTML
}

function createImgElement(url) {
    const imgContainer = document.getElementById('img-container')
    const imgElement = document.createElement('img')
    
    imgElement.id = "sprite"
    imgElement.src = url
    imgElement.alt = "pokemon picture"

    imgContainer.appendChild(imgElement)
}

async function populateFields(searchString) {
    const data = await retrieveData(searchString)
    clearFields()

    if(!data.error) {
        let pokemonPictureUrl = data.sprites.front_default
        let pokemonName = data.name
        let pokemonId = data.id
        let weight = data.weight
        let height = data.height
        let types = data.types.map(item => item.type.name)
        let hp
        let attack
        let defense
        let specialAttack
        let specialDefense
        let speed

        const pokemonNameField = document.getElementById('pokemon-name')
        const pokemonIdField = document.getElementById('pokemon-id')
        const weightField = document.getElementById('weight')
        const heightField = document.getElementById('height')
        const typesField = document.getElementById('types')
        const hpField = document.getElementById('hp')
        const attackField = document.getElementById('attack')
        const defenseField = document.getElementById('defense')
        const specialAttackField = document.getElementById('special-attack')
        const specialDefenseField = document.getElementById('special-defense')
        const speedField = document.getElementById('speed')

        for(item of data.stats) {
            switch(item.stat.name) {
                case 'attack':
                    attack = item.base_stat
                    break
                case 'hp':
                    hp = item.base_stat
                    break
                case 'defense':
                    defense = item.base_stat
                    break
                case 'special-attack':
                    specialAttack = item.base_stat
                    break
                case 'special-defense':
                    specialDefense = item.base_stat
                    break
                case 'speed':
                    speed = item.base_stat
                    break
                default:
            }
        }

        pokemonNameField.innerHTML = pokemonName
        pokemonIdField.innerHTML = pokemonId
        weightField.innerHTML = weight
        heightField.innerHTML = height
        typesField.innerHTML = createTypesHTML(types)
        hpField.innerHTML = hp
        attackField.innerHTML = attack
        defenseField.innerHTML = defense
        specialAttackField.innerHTML = specialAttack
        specialDefenseField.innerHTML = specialDefense
        speedField.innerHTML = speed

        createImgElement(pokemonPictureUrl)
        
    } else {
        alert("Pokémon not found")
    }
}