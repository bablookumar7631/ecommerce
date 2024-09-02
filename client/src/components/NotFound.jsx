import React from 'react'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center space-y-1 mt-14'>
        <SentimentVeryDissatisfiedIcon sx={{fontSize:'300px', color:'#717E8E'}}/>
        <h1 className='text-7xl font-semibold text-slate-400'>404</h1>
        <p className='text-5xl text-slate-400'>Page not found!</p>
    </div>
  )
}

export default NotFound
