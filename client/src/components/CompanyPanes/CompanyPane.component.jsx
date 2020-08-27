import React from 'react';
import {
  Button,
  makeStyles,
  List,
  ListItemText,
  ListItemSecondaryAction,
  Card,
  CardHeader,
  CardContent,
  ListItem
} from '@material-ui/core';

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

export const FavoritesPane = ({favorites, onRemove}) => {
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

export const SearchResultsPane = ({results, favorites, onMarkFavorite}) => {
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