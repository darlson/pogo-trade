import React, {useState, useEffect} from 'react'
import {Autocomplete} from '@material-ui/lab'
import {TextField} from '@material-ui/core'
import axios from 'axios'
import pokeball from '../images/pokeball.png'

const Add = (props) => {
    const [pokemon, setPokemon] = useState([])
    const [selected, setSelected] = useState(null)
    const [cp, setCP] = useState('')
    const [trade, setTrade] = useState(false)
    useEffect( () => {
        axios.get('/api/pokemonList').then( res => {
            setPokemon(res.data)
        }).catch( err => console.log(err))
    }, [] )

    const addPokemon = () => {
        
    //     axios.post('/api/add', {...selected, cp, trade})
    }

    return (
        <div>
            <Autocomplete
                id="combo-box-demo"
                options={pokemon}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                value={selected}
                onChange={(event, newValue) => {
                    setSelected(newValue);
                  }}
                renderInput={(params) => <TextField {...params} 
                label="Add a Pokemon" 
                variant="outlined" 
                  />}
            />
            <img src={selected ? selected.url : pokeball } alt='selected pokemon' />
            {selected && <div>
                <input
                    type='number'
                    placeholder='CP?'
                    name='cp'
                    value={cp}
                    onChange={ e => setCP(e.target.value)}
                />
                <input
                    type='checkbox'
                    placeholder='Tradeable'
                    name='trade'
                    checked={trade}
                    onChange={ e => setTrade(e.target.checked)}
                />
                <button onClick={addPokemon}>Add</button>
            </div>}
            
        </div>
    )
}

export default Add