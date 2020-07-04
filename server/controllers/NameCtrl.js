const pms = require('../pms.json')
const getPms = require('../utils/pms')

module.exports = {
    getAll: async (req, res) => {
        try{
            function getImgSrc(fn, custom, normal) {
                let _fn = `pokemon_icon_${fn}${normal ? '' : '_shiny'}.png`;
                let sourcePath = 'https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/';
                // if (location.hash.indexOf('#dev=') === 0) {
                //   return `${location.hash.split('=').pop()}${_fn}`;
                // }
                return custom || `https://images.weserv.nl/?w=200&il&url=${sourcePath}${_fn}`;
            }

            const pokemonList = await getPms(pms)
            const listWithURL = pokemonList.map( pm => {
                pm.url = getImgSrc(pm.fn)
                return pm
            })
            // console.log(pokemonList)
            res.status(200).send(listWithURL)
        }
        catch(err){
            res.status(500).send(err)
        }
    }

}