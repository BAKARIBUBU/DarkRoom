import React from 'react';
import img1 from '../images/clublogo.png';
import homepage from '../images/homepage.jpg';
const HomePage = () => {
  return (
    <div className='bg-cover h-screen' style={{backgroundImage:`url(${homepage})`}}>
    {/* <div className='loggo'> <img src={img1}alt="" /></div> */}
    <div>
    <div className=" text-center bg-black/60 font-bold rounded-lg w-65 mx-10 my-11">
      <h1 className=" text-5xl text-center text-[#fff] font-bold leading-none md:leading-loose">Cinema Symphony</h1>
      <div className="p-0 text-white font-sans text-xl">
        <p>
          <span className=' text-2xl leading-none md:leading-loose'>Dive Deeper Into Cinema: A Monthly Movie Discussion Club for Adults</span>
          <br />
          Movies aren’t just entertainment—they’re a lens into the human experience.<br />
          Ever noticed how a blockbuster action film or an indie drama can evoke the same deep emotions, themes, and insights as classic literature?<br />Join us for lively, thought-provoking conversations where the love of film meets the rigor of analysis.<br />You won’t just watch movies. You’ll experience them.
        </p>
        <a href="/login" className="text-white bg-lime-400 hover:bg-lime-600 focus:ring-4 focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-lime-600 dark:hover:bg-lime-700 focus:outline-none dark:focus:ring-lime-800 my-11">REGISTER HERE</a>
      </div>
    </div>
    </div>
    </div>
  );
};

export default HomePage;