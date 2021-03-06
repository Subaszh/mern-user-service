import React, {useReducer, useEffect} from 'react';
import { TopBar, FavoritesPane, SearchResultsPane } from '../../components';
import { UserService } from '../../api'

import './companies.page.css'
import { useHistory } from 'react-router-dom';

const reducer = (currentState, updates) => ({
  ...currentState,
  ...updates
})

export const CompaniesPage = () => {
  const history = useHistory()
  const userId = localStorage.getItem('userId')

  if(!userId) {
    history.push('/login')
  }

  const [companiesState, setState] = useReducer(reducer, {
    favorites: [],
    searchResults: [],
    searchString: "",
    sortOrder: "asc"
  })

  const onSearchChange = async (searchFor, sort) => {
    if (searchFor === companiesState.searchString && sort === companiesState.sortOrder) 
      return;
    setState({searchString: searchFor, sortOrder: sort})
  }

  useEffect(() => {
    if (companiesState.searchString.length === 0) {
      setState({searchResults: [] })
      return
    }

    UserService.searchCompanies(companiesState.searchString, companiesState.sortOrder)
      .then(data => setState({searchResults: data}))
  }, [companiesState.searchString, companiesState.sortOrder])

  const markFavorite = (company) => {
    UserService.markFavorite(company._id).then(() => fetchFavorites())
  }

  const removeFavorite = (company) => {
    UserService.removeFavorite(company._id).then(() => fetchFavorites())
  }

  const fetchFavorites = () => {
    UserService.fetchFavorites().then(data => setState({favorites: data || []}))
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return <>
    <TopBar onSearchChange={onSearchChange} />
    <div style={{
      width : '100%',
      position: 'relative',
      top: '100px',
      margin: '24px'
    }}>
      <FavoritesPane favorites={companiesState.favorites} onRemove={removeFavorite}/>
      <SearchResultsPane results={companiesState.searchResults} favorites={companiesState.favorites} onMarkFavorite={markFavorite}/>
    </div>
  </>
}
