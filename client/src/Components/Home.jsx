import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import banner from '/Banner_Img.jpg'
import Login from './Login';

function Home() {
 

  return (
    <div className="min-h-screen bg-transparent relative">
      <h1 className='hidden md:block absolute left-5 top-[40%] text-5xl text-white font-mono text-wrap '>Welcome to PostSphere...</h1>
      <h1 className='md:hidden text-center text-lg font-mono text-wrap absolute text-white top-[15%] p-3 '>Welcome to PostSphere...</h1>

      <div className="md:grid md:grid-cols-[70%_auto] ">
       <img src={banner} className='w-full min-h-screen '/>
       <Login />
      </div>
     
    </div>
  );
}

export default Home;
