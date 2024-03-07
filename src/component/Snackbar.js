import React from 'react'

function Snackbar() {
const { enqueueSnackbar } = useSnackbar();
enqueueSnackbar('This is a success message!', { variant });

 

}

export default Snackbar