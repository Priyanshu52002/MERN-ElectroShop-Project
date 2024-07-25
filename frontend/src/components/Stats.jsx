import React, { useEffect, useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/solid'; // Import icons
import axios from 'axios';
const Stats = () => {
  const [stats, setStats] = useState({
    availableBalance: 0,
    pendingBalance: 0,
    totalCharges: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/stripe/api/stats`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setStats(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (value) => {
    return `₹${value.toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  return (
    <div className='flex items-center justify-center min-h-10 p-10 '>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl'>
        <div className='flex items-center p-6 bg-white rounded-lg shadow-lg'>
          <div className='flex items-center justify-center bg-green-200 h-16 w-16 rounded'>
            <ArrowUpIcon className='w-6 h-6 text-green-700' />
          </div>
          <div className='flex-grow flex flex-col ml-4'>
            <span className='text-xl font-bold'>{loading ? 'Loading...' : formatCurrency(stats.availableBalance)}</span>
            <span className='text-gray-500'>Available Balance</span>
            <span className='text-green-500 text-sm font-semibold ml-2'>+21%</span>
          </div>
        </div>

        <div className='flex items-center p-6 bg-white rounded-lg shadow-lg'>
          <div className='flex items-center justify-center bg-yellow-200 h-16 w-16 rounded'>
            <ArrowDownIcon className='w-6 h-6 text-yellow-700' />
          </div>
          <div className='flex-grow flex flex-col ml-4'>
            <span className='text-xl font-bold'>{loading ? 'Loading...' : formatCurrency(stats.pendingBalance)}</span>
            <span className='text-gray-500'>Pending Balance</span>
            <span className='text-yellow-500 text-sm font-semibold ml-2'>+10%</span>
          </div>
        </div>

        <div className='flex items-center p-6 bg-white rounded-lg shadow-lg'>
          <div className='flex items-center justify-center bg-blue-200 h-16 w-16 rounded'>
            <ArrowUpIcon className='w-6 h-6 text-blue-700' />
          </div>
          <div className='flex-grow flex flex-col ml-4'>
            <span className='text-xl font-bold'>{loading ? 'Loading...' : stats.totalCharges}</span>
            <span className='text-gray-500'>Total Purchases</span>
            <span className='text-blue-500 text-sm font-semibold ml-2'>+21% more than last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
