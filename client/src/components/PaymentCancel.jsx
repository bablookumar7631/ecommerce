import React from 'react'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/cart')
  }
  return (
    <div className="flex items-center justify-center h-screen animate__animated animate__bounce">
        <div className="bg-slate-200 p-10 w-5/12 text-center rounded-md">
            <div className='text-red-500'><CancelOutlinedIcon style={{ fontSize: '50px' }}/></div>
            <h2 className='text-2xl font-bold'>Transaction Cancelled</h2>
            <p className='font-extralight p-4'>Transaction Successfully Cancelled</p>
            <Button variant="outlined" color="error" onClick={handleCancel}>Cancel</Button>
        </div>
    </div>
  )
}

export default PaymentCancel
