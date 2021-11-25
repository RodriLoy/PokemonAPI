import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pokemons from '../containers/Pokemons'
import NotFound from '../containers/NotFound'
import PokemonDetails from '../components/PokemonDetails'

function App() {
    return (
            <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={<Pokemons />} />
                        <Route  path="/pokemon/:id" element={<PokemonDetails />} />
                        <Route element={<NotFound />} />
                    </Routes>
            </BrowserRouter>
    )
}


export default App
