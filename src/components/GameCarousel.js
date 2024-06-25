
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const GameCarousel = ({ games }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Slice the games array to display only the first 5 items
  const limitedGames = games.slice(0, 20);

  return (
    <div className='p-4 bg-black'>
      {isLargeScreen ? (
        <Carousel
          autoPlay={true}
          transitionTime={1000}
          infiniteLoop={true}
          showThumbs={false}
          centerMode={true} // Enable center mode
          centerSlidePercentage={33.33} // Show 3 items at a time
        >
          {limitedGames.map((game) => (
            <div key={game.gameid} className="rounded-lg overflow-hidden mx-1">
              <img 
                className="lg:h-[300px] md:h-[400px] sm:h-[300px] h-[200px] lg:max-w-full"
                src={game.imgurlnew}
                alt={game.gamename}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <Carousel
          autoPlay={true}
          transitionTime={2000}
          infiniteLoop={true}
          showThumbs={false} // Show thumbs (dots)
          showStatus={false} // Hide status indicators
          centerMode={false} // Disable center mode
          emulateTouch={true} // Enable touch emulation
        >
          {limitedGames.map((game) => (
            <div key={game.gameid} className='mx-2'>
              <img 
                className="lg:h-[500px] md:h-[400px] sm:h-[300px] h-[240px] w-full lg:max-w-full"
                src={game.imgurlnew}
                alt={game.gamename}
              />
            </div>
          ))}
        </Carousel>
      )}
      <h1 className=' flex justify-center items-center lg:text-4xl text-green-400'>________________________________________________</h1>
    </div>
  );
};

export default GameCarousel;

