import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from './store/Slice';
import Header from './Header';
import GameCarousel from './GameCarousel';
import { Link } from 'react-router-dom';
import spinner from '../../src/assets/images/spinner.gif';
import Lottie from 'react-lottie';
import * as animationData from '../assets/images/Animation - 1709102638435.json';
import * as animationDataa from '../assets/images/Animation - 1709103850899.json';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function HomePage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate()



  // useEffect(()=>{
  //   navigate('/subscribe')
  // },[])


  
  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  if (state.game.isLoading) {
    return (
      <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center">
        <img
          className="min-w-full min-h-full object-fill"
          alt="background"
          src={spinner}
        />
      </div>
    );
  }

  // Group games by category
  const gamesByCategory = {};
  state.game.data.games.forEach((game) => {
    if (!gamesByCategory[game.category]) {
      gamesByCategory[game.category] = [];
    }
    gamesByCategory[game.category].push(game);
  });

  // Get categories in serial-wise order
  const categories = state.game.data.category?.map((cat) => cat.cat_name);

  // Get the first 3 categories initially
  const initialCategories = categories?.slice(0, 3);

  // Get all categories if "Show More" is clicked 
  const categoriesToShow = showMore ? categories : initialCategories;

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData.default,
  //   rendererSettings: {
  //     preserveAspectRatio: 'xMidYMid slice'
  //   }
  // };
  const defaultOptionss = {
    loop: true,
    autoplay: true,
    animationData: animationDataa.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
       
      <Header category={state.game.data.category} />
      
      <div className="flex-grow overflow-y-auto bg-black">
      
        <div className="relative lg:h-screen lg:flex flex flex-cols lg:justify-between items-center">
          <img 
            className="absolute h-full w-full lg:object-cover opacity-30"
            src="https://img.freepik.com/free-vector/game-platform-cartoon-underground-cave-fantasy-world-landscape-2d-ui-design-pc-mobile-dark-tunnel-with-stalactites-jumping-arcade-elements-crystal-assets-bonus-items-nature-locations_107791-7823.jpg?size=626&ext=jpg"
            alt="background"
          />
          <h1 className="text-green-300 absolute lg:left-0 left-12 ml-4 lg:text-6xl text-3xl mt-56 lg:mt-0" style={{ fontFamily: "Jacques Francois Shadow", fontWeight: 'bold' }}>GAMEOFYY</h1>
          <h1 className="text-white absolute lg:left-0 left-14 ml-4 lg:text-4xl text-2xl lg:mt-32 mt-72" style={{ fontfamily: "Aclonica", fontWeight: 'semibold' }}>Video Games Online</h1>
           
          <Lottie options={defaultOptionss} height={400} width={480} />

          <div className="absolute lg:right-0 right-16 mr-4 lg:mr-12 hover:scale-105">
            <img src={'https://themedox.com/mykd/wp-content/uploads/2023/10/slider_img01.png'} className='lg:w-[370px] lg:h-[390px] w-[200px] h-[280px]'/>
          </div>
        </div>
         
        <GameCarousel games={state.game.data.games} />

        {/* Display categories */}
        {categoriesToShow?.map((categoryName) => {
          const trimmedCategoryName = categoryName.trim();
        
          return (
            <div key={trimmedCategoryName} className="bg-black lg:p-9 md:p-5 sm:p-4 p-3">
              
              <h1 className="text-2xl lg:p-0 p-2 lg:px-4 lg:py-3 text-amber-400 border-b border-gray-700 bg-zinc-900 rounded-lg font-sans font-bold relative">
                {trimmedCategoryName} Games
              </h1>
              <div className="lg:mx-6 lg:mt-8 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 lg:gap-8">
                {gamesByCategory[trimmedCategoryName]?.map((game) => (
                  <div key={game.gameid} className={`relative ${game.category} group `}>
                    <div className=' mt-6 shadow-lg shadow-white transition-transform duration-300 transform scale-100 group-hover:scale-105'>
                    <img 
                      className="rounded-t object-full rounded-lg lg:h-[280px] lg:w-[300px] md:h-[260px] sm:h-[200px] h-[180px] w-[200px] overflow-hidden mx-auto"
                      src={game.imgurlnew}
                      alt={game.gamename}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <Link to={`/games/${game.gameid}`}>
                        <button className="bg-amber-400 text-white lg:px-3 lg:py-3 px-2 py-2 rounded-lg font-semibold">
                          Play Now
                        </button>
                      </Link>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-amber-300 uppercase rounded-b lg:px-4 lg:py-4 px-1 py-2 text-black text-center font-semibold">
                      {game.gamename.slice(0,15)}
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Show More button */}
        {!showMore && (
          <div className="flex justify-center items-center bg-black">
            <button 
              onClick={() => setShowMore(true)}
              className="bg-amber-400 text-white rounded-lg m-4 p-2"
            >
              Show More Categories
            </button>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;
