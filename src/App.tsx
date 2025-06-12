import './App.css'
import './index.css';
import { Navbar } from './components/Navbar'
import { MediaSlider } from './components/MediaSlider';
import { getPopularMovies, getPopularTV, getUpcomingMovies, searchMedia } from './tmdb-api/api';

function App() {

  return (
    <>
    <Navbar />
    <main className='w-full pt-18 mt-16'>
      <h1>Header</h1>
      <div>
        <MediaSlider sliderTitle="Popular Movies" fetchData={getPopularMovies} />
        <MediaSlider sliderTitle="Popular TV Shows" fetchData={getPopularTV} />
        <MediaSlider sliderTitle="Upcoming Movies" fetchData={getUpcomingMovies} />
      </div>
    </main>

    </>
  )
}

export default App
