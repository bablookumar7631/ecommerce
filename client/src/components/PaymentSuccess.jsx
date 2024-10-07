import React,{useState, useEffect} from 'react'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const storedAmount = localStorage.getItem('paymentAmount');
    if (storedAmount) {
      setAmount(parseFloat(storedAmount));
    }
  },[]);

  const handleContinueShopping = () => {
    // Optionally, clear the stored amount from local storage
    localStorage.removeItem('paymentAmount');
    navigate('/')
  }
  return (
    <div className="flex items-center justify-center h-screen animate__animated animate__zoomIn">
        <div className="bg-slate-200 p-10 w-5/12 text-center rounded-md">
            <div className='text-green-500'><TaskAltIcon style={{ fontSize: '50px' }}/></div>
            <h2 className='text-2xl font-bold'>Payment Success !</h2>
            <p className='font-extralight p-4'>Your payment of ₹{amount.toFixed(2)} was successfully completed</p>
            <button className='bg-green-400 text-white px-5 py-2 rounded-md' onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
    </div>

  )
}

export default PaymentSuccess;
