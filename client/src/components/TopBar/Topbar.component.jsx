import React, {useReducer} from 'react';
import {useHistory} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  InputBase,
  Button,
  makeStyles,
  Typography,
  fade,
  Select,
  MenuItem
} from '@material-ui/core';


const useTopBarStyles = makeStyles((theme) => ({
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
  select: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
    position: 'absolute',
    right: '200px'
  },
  logoutButton: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
    position: 'absolute',
    right: theme.spacing(2)
  }
}))

const reducer = (currentState, updates) => ({
  ...currentState,
  ...updates
})

export const TopBar = (props) => {
  const history = useHistory()
  const classes = useTopBarStyles()
  const [state, setState] = useReducer(reducer,  {
    sortOrder: 'asc', search: ''
  })
  let debounceTimeout;

  const onSignOut = () => {
    localStorage.removeItem('userId')
    history.push('/login')
  }

  const debounceOnChange = (val) => {
    if (debounceTimeout) 
      clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      setState({search: val.value})
      props.onSearchChange(val.value, state.sortOrder)
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
      <Select
          variant='outlined'
          value={state.sortOrder}
          onChange={(e) => {
            props.onSearchChange(state.search, e.target.value)
            setState({sortOrder: e.target.value})
          }}
          className={classes.select}
        >
          <MenuItem value="asc">Asc</MenuItem>
          <MenuItem value="desc">Desc</MenuItem>
        </Select>
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