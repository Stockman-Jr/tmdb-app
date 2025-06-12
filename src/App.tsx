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
  // State to track raw search input from user
  const [search, setSearch] = useState("");

  // Debounce the search input to avoid too many API calls(500ms delay)
  const [debouncedSearch] = useDebounce(search, 500);
  const [searchResults, setSearchResults] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      // If search input is empty, clear results and return early
      if (debouncedSearch.trim() === "") {
        setSearchResults([]);
        return;
      }
      // Call the search API and store results
      const results = await searchMedia(debouncedSearch);
      setSearchResults(results);
    };

    fetchSearchResults();
  }, [debouncedSearch]);

  return (
    <>
      <Navbar />
      <main className="w-full p-18 mt-16">
         {/* Search input */}
        <div className="mb-18 py-6">
          <input
            type="text"
            placeholder="Search for movies, TV shows, or people..."
            className="min-w-1/2 px-4 py-2 border border-teal-200/50 float-right mr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-200 transition-all duration-300 ease-in-out"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/*Conditional rendering for smoother transitions */}
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
            // Default sliders when no search results
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

      {/* Footer */}
      <footer className="w-full text-center py-4 mt-8 bg-zinc-950/80 text-zinc-300 border-t-2 border-teal-200/20">
        <p>
          &copy; {new Date().getFullYear()} FlickFinder.
        </p>
      </footer>
    </>
  );
}

export default App
