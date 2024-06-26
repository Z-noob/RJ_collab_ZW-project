const typeIcons = {
  normal: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Pok%C3%A9mon_Normal_Type_Icon.svg',
  fighting: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Pok%C3%A9mon_Fighting_Type_Icon.svg',
  flying: 'https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/flying.svg',
  poison: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Pok%C3%A9mon_Poison_Type_Icon.svg',
  ground: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg',
  rock: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Pok%C3%A9mon_Rock_Type_Icon.svg',
  bug: 'https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/bug.svg',
  ghost: 'https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/ghost.svg',
  steel: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Pok%C3%A9mon_Steel_Type_Icon.svg',
  fire: 'https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/fire.svg',
  water: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Pok%C3%A9mon_Water_Type_Icon.svg',
  grass: 'https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/grass.svg',
  electric: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Pok%C3%A9mon_Electric_Type_Icon.svg',
  psychic: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Pok%C3%A9mon_Psychic_Type_Icon.svg',
  ice: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Pok%C3%A9mon_Ice_Type_Icon.svg',
  dragon: 'https://raw.githubusercontent.com/partywhale/pokemon-type-icons/fcbe6978c61c359680bc07636c3f9bdc0f346b43/icons/dragon.svg',
  dark: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Pok%C3%A9mon_Dark_Type_Icon.svg',
  fairy: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pok%C3%A9mon_Fairy_Type_Icon.svg',
};

export const getTypes = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/`);
    if (!response.ok) throw new Error (`Failed to get types`);
    const data = await response.json();
    const results = data.results
    const types = []
    for (let i = 0; i < results.length; i++){
      if(typeIcons[results[i].name]){
        const obj = {
          name : results[i].name,
          icon : typeIcons[results[i].name]
        }
        types.push(obj);
      }
    }
    return types;
  } catch(error){
    console.warn(error);
    return null;
  };
};
getTypes();


export const gen4Poke  = async(ElemPlacehold) => {
  try{
    const response = await fetch(`https://pokeapi.co/api/v2/type/${ElemPlacehold}/`);
    if (!response.ok) throw new Error (`Failed to get Pokemon sprites`);
    const data = await response.json();
    const pokes = data.pokemon
    const randomIndex = Math.floor(Math.random()*(pokes.length-4))
    const random4Array = pokes.slice(randomIndex, randomIndex + 4)
    
    const names = []
    const pokeUrl = []
    for (let i = 0; i < random4Array.length; i++) {
      names.push(random4Array[i].pokemon.name)
      pokeUrl.push(random4Array[i].pokemon.url)
    }
    
    let pokeLinkIds = []
    for(let i = 0; i < pokeUrl.length; i++){
      const link = pokeUrl[i].slice(34, pokeUrl[i].length -1)
      pokeLinkIds.push(link)
    }

    const pokeData = {
      names: names,
      pokeUrl: pokeLinkIds
    }

    return pokeData

  } catch (error) {
    console.warn(error);
    return null;
  }
}

=======
// getTypes();

export const getTypeInfo = async (str) => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${str}/`);
    if (!response.ok) throw new Error (`Failed to get types`);
    const data = await response.json();
    const damageData = data.damage_relations;
    let damageObj = {};
    let [doubleDamFrom, doubleDamTo, halfDamFrom, halfDamTo] = [[], [], [], []];
    for(let i = 0; i < damageData.double_damage_from.length; i++) {
      doubleDamFrom.push(damageData.double_damage_from[i].name)
    }
    for(let i = 0; i < damageData.double_damage_to.length; i++) {
      doubleDamTo.push(damageData.double_damage_to[i].name)
    }
    for(let i = 0; i < damageData.half_damage_from.length; i++) {
      halfDamFrom.push(damageData.half_damage_from[i].name)
    }
    for(let i = 0; i < damageData.half_damage_to.length; i++) {
      halfDamTo.push(damageData.half_damage_to[i].name)
    }
    damageObj = { doubleDamFrom, doubleDamTo, halfDamFrom, halfDamTo }
    return damageObj;

  } catch(error) {
    console.warn(error);
    return null
  }
}
getTypeInfo("fire");
