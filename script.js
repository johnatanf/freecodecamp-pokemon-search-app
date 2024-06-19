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