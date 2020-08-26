import React from 'react';
import { useHistory } from "react-router-dom";
import { TextField, Button } from '@material-ui/core';

export const CompaniesPage = () => {
  const history = useHistory();
  const userId = localStorage.getItem('userId')

  if (!userId) {
    history.push('/login')
  }
  return <div>Test</div>
}
