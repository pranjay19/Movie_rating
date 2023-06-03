import { createStore } from 'redux';

// Initial state
const initialState = {
  rating: '',
  releaseYear: '',
  language: '',
  movieRecommendations: [],
};

// Reducer
const preferencesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_RATING':
      return { ...state, rating: action.payload };
    case 'SET_RELEASE_YEAR':
      return { ...state, releaseYear: action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_MOVIE_RECOMMENDATIONS':
      return { ...state, movieRecommendations: action.payload };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(preferencesReducer);

export default store;
