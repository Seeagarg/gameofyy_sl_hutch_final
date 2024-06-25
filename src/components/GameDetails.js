import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGames } from './store/Slice';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

function GameDetails() {
  const { gameid } = useParams();
  const dispatch = useDispatch();
  const game = useSelector((state) =>
    state.game.data.games.find((game) => game.gameid === gameid)
  );

  useEffect(() => {
    // Fetch games when the component mounts
    dispatch(fetchGames());
  }, [dispatch]);

  if (!game) {
    // return <p>Game not found</p>;
    return(
      <Spinner/>
    )
  }
  
  return ( 
    <div className="bg-black h-screen relative">
      <Link to ='/home' className='absolute top-4 p-2 text-red-600'>
        <IoMdClose size={30} />
      </Link>

      <div className='flex justify-center items-center bg-black h-screen'>
        <iframe 
          className='w-full h-screen p-2'
          title={game.gamename}
          src={game.gameurl}
        ></iframe>
      </div>
    </div>
  );
}

export default GameDetails;
