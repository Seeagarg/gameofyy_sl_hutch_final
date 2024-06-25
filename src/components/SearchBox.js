
import { useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link } from 'react-router-dom'

const SearchBox = () => {
    const [input, setInput] = useState('')
    const [gamesData, setGamesData] = useState([])
    
    const fetchData = (value) => {
        fetch('https://api.panzcon.com/fetch-games')
            .then((response) => response.json())
            .then((json) => {
                // Filter games based on the search input
                const results = json.games.filter((game) => {
                    return (
                        game.gamename &&
                        game.gamename.toLowerCase().includes(value.toLowerCase())
                    )
                })
                console.log(results)
                // Update state with filtered results
                setGamesData(results)
            })
    }

    const handleChange = (value) => {
        setInput(value)
        fetchData(value)
    }

    return (
        <div className="bg-black h-screen lg:p-1 p-2">
            <Link to="/">
                <IoMdArrowRoundBack size={30} className="text-white" />
            </Link>
            <div className="lg:p-6">
                <h1 className="font-sans text-3xl text-white">Search</h1>
                <input
                    type="text"
                    placeholder="Search here....."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    className="h-[30px] w-1/2 px-4"
                />
                <button className="bg-pink-700 text-white px-4 py-1 mx-4">
                    Search
                </button>
            </div>
            {/* Display the filtered games data */}
            <div className="text-white">
                {gamesData.map((game) => (
                    <div key={game.gameid}>
                        <h2>{game.gamename}</h2>
                        <p>Category: {game.category}</p>
                        {/* Add more game information as needed */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchBox

