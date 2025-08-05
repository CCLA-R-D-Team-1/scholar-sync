// import Image from 'next/image';
// import React from 'react';

// interface CardProps {
//   image: string;
//   title: string;
//   description: string;
//   reverse?: boolean;
// }

// const EventWireframe: React.FC = () => {
//   return (
//     <div className="bg-white text-black font-sans">
//       {/* Hero Section */}
//       <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/your-hero-image.jpg')" }}>
//   <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
//     <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">Discover Amazing Events</h1>
//     <p className="text-sm md:text-base max-w-2xl drop-shadow-md">
//       Join exclusive events, workshops, and conferences designed to expand your network and knowledge
//     </p>
//   </div>
// </div>


//       {/* Filter Section */}
// <div className="flex flex-wrap gap-4 justify-between items-center px-28 py-4 bg-gray-100 text-sm">
//   {/* Left Side Filters */}
//   <div className="flex flex-wrap gap-3">
//     <select className="p-2 border rounded bg-white">
//       <option>All Categories</option>
//       <option>Technology</option>
//       <option>Design</option>
//       <option>Business</option>
//     </select>

//     <select className="p-2 border rounded bg-white">
//       <option>All Levels</option>
//       <option>Beginner</option>
//       <option>Intermediate</option>
//       <option>Advanced</option>
//     </select>

//     <select className="p-2 border rounded bg-white">
//       <option>Most Popular</option>
//       <option>Newest</option>
//       <option>Price: Low to High</option>
//       <option>Price: High to Low</option>
//     </select>
//   </div>

//   {/* Right Side Search & Info */}
//   <div className="flex flex-wrap gap-3 items-center">
//     <span className="text-gray-600">2 courses found</span>

//     <input
//       type="text"
//       placeholder="Search..."
//       className="p-2 border rounded bg-white"
//     />

//     <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded font-semibold">
//       Filter
//     </button>
//   </div>
// </div>


//  {/* Event Card Section */}
// <div
//   className="bg-cover bg-center px-10 py-10 flex flex-row gap-8"
//   style={{
//     // backgroundImage: "url('https://images.pexels.com/photos/20579606/pexels-photo-20579606.jpeg')",
//     backgroundImage: "url('/bgdo.jpeg')",
//   }}
// >

//  {/* Event Card Section */}
// <div className="relative w-full min-h-screen flex items-center justify-start bg-cover bg-center">
//   {/* Glassmorphism Card */}
//   <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 max-w-4xl h-[500px] w-full flex flex-col md:flex-row items-center gap-6 shadow-lg">
    
//     {/* Left Image */}
//     <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
//       <img
//         src="/download (5).jpeg"
//         alt="Green hosts"
//         className="w-full h-full object-cover"
//       />
//     </div>

//     {/* Right Text */}
//     <div className="flex-1 text-left">
//       <h3 className="uppercase text-sm tracking-wide text-gray-200 mb-1">event 1</h3>
//       <h1 className="text-4xl font-bold mb-4 text-white leading-snug">event <br />one</h1>

//       <h2 className="text-xl font-semibold text-white mb-2">Green hosts</h2>
//       <p className="text-sm text-gray-200 leading-relaxed">
//         Hosta is an extremely resilient plant that can survive in a variety of conditions, from full shade to full sun.
//         In some countries, such as Japan and Korea, young hosta leaves are harvested and used for food.
//       </p>

//       {/* Buttons */}
//       <div className="mt-6 flex flex-wrap gap-4">
//         <button className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition">Connect with nature</button>
//         <button className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition">Types of host</button>
//         <button className="px-4 py-2 bg-white text-green-700 font-semibold rounded-full text-sm">Gallery</button>
//       </div>
//     </div>
//   </div>



//   {/* Glassmorphism Card */}
//   <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl ml-10 p-8 max-w-4xl h-[500px] w-full flex flex-col md:flex-row items-center gap-6 shadow-lg">
    
//     {/* Left Image */}
//     <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
//       <img
//         src="/your-hero-image.jpg"
//         alt="Green hosts"
//         className="w-full h-full object-cover"
//       />
//     </div>

//     {/* Right Text */}
//     <div className="flex-1 text-left">
//       <h3 className="uppercase text-sm tracking-wide text-gray-200 mb-1">About Life and Plants</h3>
//       <h1 className="text-4xl font-bold mb-4 text-white leading-snug">Enjoy <br />Nature</h1>

//       <h2 className="text-xl font-semibold text-white mb-2">Green hosts</h2>
//       <p className="text-sm text-gray-200 leading-relaxed">
//         Hosta is an extremely resilient plant that can survive in a variety of conditions, from full shade to full sun.
//         In some countries, such as Japan and Korea, young hosta leaves are harvested and used for food.
//       </p>

//       {/* Buttons */}
//       <div className="mt-6 flex flex-wrap gap-4">
//         <button className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition">Connect with nature</button>
//         <button className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition">Types of host</button>
//         <button className="px-4 py-2 bg-white text-green-700 font-semibold rounded-full text-sm">Gallery</button>
//       </div>
//     </div>
//   </div>
  
// </div>

      
    

    


    
  

//   {/* Event Details + Organizer 
//   <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col md:flex-row gap-6">

//     {/* Event Details 
//     <div className="md:w-2/3">
//       <h3 className="text-xl font-semibold mb-2">Event Details</h3>
//       <p className="text-sm text-gray-700">
//         We are hosting a dinner party just for our best clients. We are excited to see you there.
//         <br /><br />
//         The event will be held out under a beautiful stary night in a private home at Hamilton.
//       </p>
//     </div>

//     {/* Organizer 
//     <div className="md:w-1/3 bg-[#e5e7f0] p-4 rounded-lg">
//       <h3 className="text-lg font-bold mb-2">Event Organizer</h3>
//       <p className="text-sm font-medium text-gray-800">American Bar</p>
//       <p className="text-sm text-gray-600">📞 (415) 424-3434</p>
//       <p className="text-sm text-gray-600">✉️ ess_roundsetter@yahoo.com</p>
//     </div>

//   </div>*/}

// </div> 



//       {/* Advertisement Section */}
//       <div className="bg-gray-300 text-center py-16">
//         <h2 className="text-xl font-bold">ADVERTISEMENT</h2>
//       </div>
//     </div>
//   );
// };

// export default EventWireframe;

































"use client"

import Image from 'next/image';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import AdvertisementSlider from '@/components/addslider';


interface CardProps {
  image: string;
  title: string;
  description: string;
  reverse?: boolean;
}

const EventWireframe: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white text-black font-sans">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-cover bg-center" style={{ backgroundImage: "url('/your-hero-image.jpg')" }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4" data-aos="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">Discover Amazing Events</h1>
          <p className="text-sm md:text-base max-w-2xl drop-shadow-md">
            Join exclusive events, workshops, and conferences designed to expand your network and knowledge
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 justify-between items-center px-28 py-4 bg-gray-100 text-sm" data-aos="fade-up">
        {/* Left Side Filters */}
        <div className="flex flex-wrap gap-3">
          <select className="p-2 border rounded bg-white">
            <option>All Categories</option>
            <option>Technology</option>
            <option>Design</option>
            <option>Business</option>
          </select>

          <select className="p-2 border rounded bg-white">
            <option>All Levels</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <select className="p-2 border rounded bg-white">
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Right Side Search & Info */}
        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-gray-600">2 courses found</span>

          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded bg-white"
          />

          <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded font-semibold">
            Filter
          </button>
        </div>
      </div>

      {/* Event Card Section */}
      <div
        className="bg-cover bg-center px-10 py-10 flex flex-row gap-8"
        style={{
          backgroundImage: "url('/bgdo.jpeg')",
        }}
      >

        {/* Glassmorphism Card */}
        <div className="relative w-full min-h-screen flex items-center justify-start bg-cover bg-center">
          <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl p-8 max-w-4xl h-[500px] w-full flex flex-col md:flex-row items-center gap-6 shadow-lg" data-aos="fade-right">
            {/* Left Image */}
            <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
              <img
                src="/download (5).jpeg"
                alt="Green hosts"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Text */}
            <div className="flex-1 text-left">
              <h3 className="uppercase text-sm tracking-wide text-gray-200 mb-1">event 1</h3>
              <h1 className="text-4xl font-bold mb-4 text-white leading-snug">event <br />one</h1>

              <h2 className="text-xl font-semibold text-white mb-2">Green hosts</h2>
              <p className="text-sm text-gray-200 leading-relaxed">
                Hosta is an extremely resilient plant that can survive in a variety of conditions, from full shade to full sun.
                In some countries, such as Japan and Korea, young hosta leaves are harvested and used for food.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition">Connect with nature</button>
                <button className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition">Types of host</button>
                <button className="px-4 py-2 bg-white text-green-700 font-semibold rounded-full text-sm">Gallery</button>
              </div>
            </div>
          </div>

          {/* Glassmorphism Card */}
          <div className="bg-white/10 backdrop-blur-md text-white rounded-2xl ml-10 p-8 max-w-4xl h-[500px] w-full flex flex-col md:flex-row items-center gap-6 shadow-lg" data-aos="fade-left">
            {/* Left Image */}
            <div className="w-full md:w-1/3 rounded-lg overflow-hidden">
              <img
                src="/your-hero-image.jpg"
                alt="Green hosts"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Text */}
            <div className="flex-1 text-left">
              <h3 className="uppercase text-sm tracking-wide text-gray-200 mb-1">About Life and Plants</h3>
              <h1 className="text-4xl font-bold mb-4 text-white leading-snug">Enjoy <br />Nature</h1>

              <h2 className="text-xl font-semibold text-white mb-2">Green hosts</h2>
              <p className="text-sm text-gray-200 leading-relaxed">
                Hosta is an extremely resilient plant that can survive in a variety of conditions, from full shade to full sun.
                In some countries, such as Japan and Korea, young hosta leaves are harvested and used for food.
              </p>

              {/* Buttons */}
              <div className="mt-6 flex flex-wrap gap-4">
                <button className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition">Connect with nature</button>
                <button className="px-4 py-2 bg-white/20 rounded-full text-white text-sm hover:bg-white/30 transition">Types of host</button>
                <button className="px-4 py-2 bg-white text-green-700 font-semibold rounded-full text-sm">Gallery</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advertisement Section
      <div className="bg-gray-300 text-center py-16" data-aos="fade-up">
        <h2 className="text-xl font-bold">ADVERTISEMENT</h2>
      </div> */}

      <AdvertisementSlider />

          {/* Advertisement Section */}
<div className="bg-gray-100 text-center py-16 px-4" data-aos="fade-up">
  <h2 className="text-2xl font-bold mb-10">ADVERTISEMENT</h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Ad 1 */}
    <a
      href="https://example.com/product1"
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <img
        src="https://images.pexels.com/photos/22748192/pexels-photo-22748192.jpeg"
        alt="Ad Banner 1"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">Summer Sale!</h3>
        <p className="text-sm text-gray-600">Up to 50% off selected items</p>
      </div>
    </a>

    {/* Ad 2 */}
    <a
      href="https://example.com/product2"
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <img
        src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
        alt="Ad Banner 2"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">New Arrivals</h3>
        <p className="text-sm text-gray-600">Explore the latest fashion trends</p>
      </div>
    </a>

    {/* Ad 3 */}
    <a
      href="https://example.com/product3"
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105"
      data-aos="fade-up"
      data-aos-delay="300"
    >
      <img
        src="https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg"
        alt="Ad Banner 3"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">Digital Deals</h3>
        <p className="text-sm text-gray-600">Get the best offers on electronics</p>
      </div>
    </a>
  </div>
</div>



    </div>
  );
};

export default EventWireframe;
