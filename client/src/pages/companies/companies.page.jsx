import React, {useReducer, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  makeStyles,
  Typography,
  fade,
  List,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  CardHeader,
  CardContent,
  ListItem
} from '@material-ui/core';

import './companies.page.css'
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  title: {
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    minWidth: '250px',
    position: 'absolute',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    left: '50%',
    transform: "translateX(-50%)",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchInput: {
    color: theme.palette.common.white
  },
  logoutButton: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
    position: 'absolute',
    right: theme.spacing(2)
  }
}))

export const TopBar = (props) => {
  const history = useHistory()
  const classes = useStyles()
  let debounceTimeout;

  const onSignOut = () => {
    localStorage.removeItem('userId')
    history.push('/login')
  }

  const debounceOnChange = (val) => {
    if (debounceTimeout) 
      clearTimeout(debounceTimeout)

    

    debounceTimeout = setTimeout(() => {
      props.onChange(val.value)
      debounceTimeout = null
    }, 500)
  }

  return <AppBar className='companies-nav-bar'>
    <Toolbar>
      <Typography className={
          classes.title
        }
        variant="h6"
        noWrap>
        Companies
      </Typography>
      <div className={
        classes.search
      }>
        <InputBase placeholder="Search…"
          className={classes.searchInput}
          onChange={
            (e) => debounceOnChange(e.target)
          }/>
      </div>
      <Button className={
          classes.logoutButton
        }
        variant="outlined"
        onClick={onSignOut}>
        Sign Out
      </Button>
    </Toolbar>
  </AppBar>
}

const useFavoritesStyles = makeStyles((theme) => ({
  base: {
    margin: theme.spacing(2),
    display: "inline-block",
    minHeight: "600px",
  },
  left: {
    width: "400px",
  }, 
  right: {
    width: "calc(100% - 500px)"
  }
}))

const FavoritesPane = ({favorites, onRemove}) => {
  const classes = useFavoritesStyles()
  return <Card className={`${classes.base} ${classes.left}`}>
          <CardHeader component='h6' title="Favorites" />
          <CardContent>
            <List>
              {
                favorites.map(fav => 
                  <ListItem key={fav._id}>
                    <ListItemText
                      primary={fav.name}
                    />
                    <ListItemSecondaryAction>
                    <Button edge="end" variant="outlined" onClick={() => onRemove(fav)}>Remove</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              }
            </List>
          </CardContent>
        </Card>  
}

const SearchResultsPane = ({results, favorites, onMarkFavorite}) => {
  const classes = useFavoritesStyles()
  const favoriteCompanyIds = favorites.map(f => f._id)

  return <Card className={`${classes.base} ${classes.right}`}>
          <CardHeader component='h6' title="Search Results" />
          <CardContent>
            <List >
              {
                results.map(fav => 
                <ListItem key={fav._id}>
                  <ListItemText
                    primary={fav.name}
                  />
                  {favoriteCompanyIds.indexOf(fav._id) === -1 && <ListItemSecondaryAction>
                    <Button edge="end" variant="outlined" color="primary" onClick={() => onMarkFavorite(fav)}>Mark As Favourite</Button>
                  </ListItemSecondaryAction>}
                </ListItem>)
              }
            </List>
          </CardContent>
        </Card>  
}

const reducer = (currentState, updates) => ({
  ...currentState,
  ...updates
})

export const CompaniesPage = () => {
  const userId = localStorage.getItem('userId')
  const [companiesState, setState] = useReducer(reducer, {
    favorites: [],
    searchResults: [],
    searchString: ""
  })

  const onSearchChange = async (searchFor) => {
    if (searchFor === companiesState.searchString) 
      return;
    setState({searchString: searchFor})
  }

  useEffect(() => {
    if (companiesState.searchString.length === 0) 
      return;
    
    const searchCompanies = async () => {
      try {
        const {data} = await Axios.get(`http://localhost:3000/companies/search?query=${
          companiesState.searchString
        }`)
        setState({searchResults: data})
      } catch (e) {
        alert(e)
      }
    }
    searchCompanies()
  }, [companiesState.searchString])

  const markFavorite = async(company) => {
    try {
      const {data} = await Axios.put(`http://localhost:3000/users/${userId}/mark-favorite/${company._id}`)
      fetchFavorites()
    } catch (e) {
      alert(e)
    }
  }

  const removeFavorite = async(company) => {
    try {
      const {data} = await Axios.put(`http://localhost:3000/users/${userId}/unmark-favorite/${company._id}`)
      fetchFavorites()
    } catch (e) {
      alert(e)
    }
  }

  const fetchFavorites = async() => {
    try {
      const {data} = await Axios.get(`http://localhost:3000/users/${userId}/favorites`)
      setState({
        favorites: data.data
      })
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return <>
    <TopBar onChange={onSearchChange}/>
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
