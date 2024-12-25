import React, { useEffect, useState } from 'react';
import NavBar from '../../Components/client/NavBar';

const images = [
  "https://img.freepik.com/free-vector/cartoon-indian-restaurant-background_52683-69329.jpg?t=st=1731220334~exp=1731223934~hmac=e3ad6fdbe1eff152cd318c099dba6f1f968d161d96da1ee31a8576e0426d52cc&w=996",
  "https://img.freepik.com/free-vector/flat-design-indian-restaurant-landing-page_23-2149439593.jpg?t=st=1731220367~exp=1731223967~hmac=b1bd42f894c549137bc0629a3f731f022de8477d1681ee1838db2d087b10447d&w=740",
  "https://img.freepik.com/free-psd/special-ramadan-kareem-food-iftar-menu-facebook-cover-banner-template_106176-1930.jpg?t=st=1731220393~exp=1731223993~hmac=5c0967ea91d9d63a41707a2ac171c158c14d7285ada59b831afa0e9e7ecce7d0&w=900"
];

export default function HomeUser() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NavBar />
      <div className="relative w-full h-[92.5vh] overflow-hidden">
        <div className='flex items-center justify-between m-4'><h1 className='text-4xl font-semibold'>Popular</h1></div>
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
        
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full cursor-pointer transition-all duration-300 ${
                currentIndex === index ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
