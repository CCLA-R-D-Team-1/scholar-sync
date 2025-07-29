import React from 'react'
import Image from "next/image";

const AboutPage = () => {
  return (
    <div>
        <section className="bg-[#FAF8F6] px-4 sm:px-6 md:px-8 py-20 md:py-40 lg:py-77">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
                {/* LEFT: Name & Intro Text */}
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1F2937]">
                    Your First Name
                  </h1>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1F2937] mt-2">
                    Your Last Name
                  </h2>
                  <p className="text-base sm:text-lg text-gray-800 mt-4">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br className="hidden sm:block" />
                    It has survived not only five centuries, but also the leap into electronic typesetting.
                  </p>
                </div>
        
                {/* RIGHT: Portrait Images (responsive, clean) */}
                <div className="flex-1 flex justify-center md:justify-end w-full">
                  <div className="relative w-full max-w-[960px] aspect-[12/6.5]">
        
                    {/* Left Image */}
                    <div className="absolute w-[32%] h-full left-0 top-0">
                      <Image
                        src="/images/portrait1.jpg"
                        alt="Portrait 1"
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="rounded-xl object-cover shadow-lg"
                      />
                    </div>
        
                    {/* Center Image (offset down slightly) */}
                    <div className="absolute w-[32%] h-full left-[33%] top-[10%]">
                      <Image
                        src="/images/portrait2.jpg"
                        alt="Portrait 2"
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="rounded-xl object-cover shadow-lg"
                      />
                    </div>
        
                    {/* Right Image */}
                    <div className="absolute w-[32%] h-full left-[66%] top-0">
                      <Image
                        src="/images/portrait3.jpg"
                        alt="Portrait 3"
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="rounded-xl object-cover shadow-lg"
                      />
                    </div>
        
                  </div>
                </div>
        
              </div>
            </section>

            <section className="relative w-full h-[600px] bg-[#fdfaf8] flex items-center justify-center px-6 py-10">
                  
                  {/* Background Image Box with Limited Width */}
                  <div className="relative w-full max-w-7xl h-full rounded-xl overflow-hidden">
                    {/* Transparent Background Image */}
                    <Image
                      src="/images/abb.jpg"
                      alt="Who We Are Background"
                      fill
                      className="object-cover opacity-60 rounded-xl"
                      priority
                    />
            
                    {/* Overlay Text - Left Side */}
                    <div className="absolute inset-0 z-10 flex items-center justify-start px-6 md:px-16">
                      <h1 className="text-6xl md:text-8xl font-extrabold text-[#1F2937] leading-tight">
                        WHO <br /> WE <br /> ARE<span className="text-[#DB9478]">?</span>
                      </h1>
                    </div>
                  </div>
            </section>

            <section className="bg-[#FAF8F6] px-6 py-24">
                  {/* OUR STORY CONTENT */}
                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    {/* LEFT SIDE – TEXT */}
                    <div className="flex-1 text-left">
                      <h2 className="text-4xl font-bold text-[#1F2937] mb-6">Our Story</h2>
                      <p className="text-lg text-gray-700 mb-6">
                        We started with a simple dream: to create something meaningful and lasting. Over time, that dream turned
                        into a passionate journey of hard work, learning, and connection.
                      </p>
                      <p className="text-lg text-gray-700">
                        Today, we stand stronger with a clear purpose and a community that continues to inspire us. This is just the beginning of our story, and we're excited to write it together with you.
                      </p>
                    </div>
            
                    {/* RIGHT SIDE – IMAGE */}
                    <div className="flex-1">
                      <div className="h-[600px] w-full rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src="/images/ourstory.jpg"
                          alt="Our Story"
                          width={800}
                          height={600}
                          className="object-cover w-full h-full opacity-90"
                        />
                      </div>
                    </div>
                  </div>
            
                  {/* COMPANY LOGOS SECTION */}
                  <div className="max-w-6xl mx-auto mt-20">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 items-center justify-center">
                      {/* Logo 1   h-[100px] w-[100px] rounded-2xl overflow-hidden shadow-lg*/}
                      <div className=" flex justify-center ">
                        <Image
                          src="/images/logo1.png"
                          alt="Company 1"
                          width={120}
                          height={60}
                          className="object-contain"
                        />
                      </div>
            
                      {/* Logo 2 */}
                      <div className=" flex justify-center">
                        <Image
                          src="/images/logo2.png"
                          alt="Company 2"
                          width={120}
                          height={60}
                          className="object-contain"
                        />
                      </div>
            
                      {/* Logo 3 */}
                      <div className=" flex justify-center">
                        <Image
                          src="/images/logo3.png"
                          alt="Company 3"
                          width={120}
                          height={60}
                          className="object-contain"
                        />
                      </div>
            
                      {/* Logo 4   flex justify-center*/}
                      <div className=" flex justify-center ">
                        <Image
                          src="/images/logo4.png"
                          alt="Company 4"
                          width={120}
                          height={60}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </section>
    </div>
  )
}

export default AboutPage