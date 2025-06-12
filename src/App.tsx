import { useState, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import { motion, AnimatePresence } from "framer-motion";
import './App.css'
import './index.css';
import { Navbar } from './components/Navbar'
import { MediaSlider } from './components/MediaSlider';
import { Card } from './components/Card';
import { getPopularMovies, getPopularTV, getUpcomingMovies, searchMedia } from './tmdb-api/api';
import type { MediaItem } from './types/tmdb-type';

function App() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  

const [searchResults, setSearchResults] = useState<MediaItem[]>([]);


{/*  */}
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearch.trim() === "") {
        setSearchResults([]);
        return;
      }

      const results = await searchMedia(debouncedSearch);
      setSearchResults(results);
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  return (
    <>
      <Navbar />
      <main className="w-full p-18 mt-16">
        <div className="mb-18 py-6">
          <input
            type="text"
            placeholder="Search for movies, TV shows, or people..."
            className="min-w-1/2 px-4 py-2 border float-right mr-8 rounded-md shadow-sm focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <AnimatePresence>
          {searchResults.length > 0 ? (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4"
            >
              {searchResults.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </motion.div>
          ) : (
            <div className="max-w-screen-xl mx-auto">
              <MediaSlider
                sliderTitle="Popular Movies"
                fetchData={getPopularMovies}
              />
              <MediaSlider
                sliderTitle="Popular TV Shows"
                fetchData={getPopularTV}
              />
              <MediaSlider
                sliderTitle="Upcoming Movies"
                fetchData={getUpcomingMovies}
              />
            </div>
          )}
        </AnimatePresence>
      </main>
      <footer className="w-full text-center py-4 mt-8 bg-zinc-900 text-zinc-300 border-t-2 border-zinc-700">
        <p>
          &copy; {new Date().getFullYear()} FlickFinder. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default App
