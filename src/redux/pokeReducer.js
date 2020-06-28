import axios from 'axios'

const initialState = {
    name: '',
    cp: 0,
    trade: false
}

const ADD_POKEMON = 'ADD_POKEMON'
const DELETE_POKEMON = 'DELETE_POKEMON'
const GET_POKEMON = 'GET_POKEMON'

export function addPokemon(pokemon) {
    return {
        type: ADD_POKEMON,
        payload: pokemon
    }
}
export function deletePokemon(pokemon) {
    return {
        type: DELETE_POKEMON,
        payload: initialState
    }
}
export function getPokemon() {
    const pokemon = axios.get('/api/pokemon')
    return {
        type: GET_POKEMON,
        payload: pokemon
    }
}

export default function (state = initialState, action) {
    switch(action.type) {
        case ADD_POKEMON:
            return {...state, pokemon: action.payload}
        case DELETE_POKEMON:
            return {...state, ...action.payload}
        case GET_POKEMON + '_PENDING':
            return state
        case GET_POKEMON + '_FULFILLED':
            return {...state, pokemon: action.payload.data}
        case GET_POKEMON + '_REJECTED':
            return initialState
        default:
            return initialState
    }
}