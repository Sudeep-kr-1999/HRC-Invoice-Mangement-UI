import React from 'react'
import Button from '@mui/material/Button';
function ButtonComponent({name,workingFunction}) {
  return (
      <Button sx={{width:"15rem",color:"white",":hover":{backgroundColor:"#14aff1"}}} onClick={workingFunction}>
        {name}
      </Button>
  )
}

export default ButtonComponent;

// button color 
// #14aff1