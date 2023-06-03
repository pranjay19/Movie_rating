import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Preferences.css';

const PreferencesComponent = () => {
  const dispatch = useDispatch();
  const { rating, releaseYear, language, movieRecommendations } = useSelector((state) => state);

  const recommendationsRef = useRef(null); // Create a ref for the recommendations container

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Make API call using user preferences (rating, releaseYear, language)
    const apiKey = '4e44d9029b1270a757cddc766a1bcb63';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Process the data and filter movie recommendations by rating and language
        const filteredMovies = data.results.filter((movie) => {
          // Check if the input value is "Finnish"
          if (language.toLowerCase() === 'finnish') {
            return movie.original_language === 'fi' && movie.vote_average > parseFloat(rating);
          }
          return movie.original_language === 'en' && movie.vote_average > parseFloat(rating);
        });

        // Update Redux store with the filtered movie recommendations
        dispatch({ type: 'SET_MOVIE_RECOMMENDATIONS', payload: filteredMovies });

        // Scroll down to the recommendations section
        recommendationsRef.current.scrollIntoView({ behavior: 'smooth' });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="preferences-container">
      <h2>Movie Preferences</h2>
      <form onSubmit={handleSubmit}>
        {/* Form inputs */}
        <div>
          {/* Rating */}
          <label>
            <span>Rating:</span>
            <input
              type="number"
              value={rating}
              onChange={(e) => dispatch({ type: 'SET_RATING', payload: e.target.value })}
              placeholder="Enter minimum rating"
            />
          </label>
        </div>
        <div>
          {/* Release Year */}
          <label>
            <span>Release Year:</span>
            <input
              type="text"
              value={releaseYear}
              onChange={(e) => dispatch({ type: 'SET_RELEASE_YEAR', payload: e.target.value })}
              placeholder="e.g. 2020"
            />
          </label>
        </div>
        <div>
          {/* Language */}
          <label>
            <span>Language:</span>
            <input
              type="text"
              value={language}
              onChange={(e) => dispatch({ type: 'SET_LANGUAGE', payload: e.target.value })}
              placeholder="e.g. English, Finnish"
            />
          </label>
        </div>
        <div>
          {/* Submit button */}
          <button type="submit">Submit</button>
        </div>
      </form>

      {/* Display movie recommendations based on user preferences */}
      <div className="recommendations-container" ref={recommendationsRef}>
        <h3>Movie Recommendations</h3>
        <div className="movie__recommendationsList">
          {movieRecommendations.length > 0 ? (
            movieRecommendations.map((movie) => (
              <div key={movie.id} className="movie__recommendation">
                {/* Render movie details */}
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie__recommendationPoster" />
                <div className="movie__recommendationTitle">{movie.title}</div>
                <div className="movie__recommendationRating">Rating: {movie.vote_average}</div>
                <div className="movie__recommendationLanguage">Language: {movie.original_language}</div>
              </div>
            ))
          ) : (
            <p>No movie recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreferencesComponent;
