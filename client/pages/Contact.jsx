import React from 'react'
import { assets } from '../src/assets/assets'

export default function Contact() {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>CONTACT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>

          <p className='text-gray-500'>No. 456, 3rd Floor,<br />
            Shivaji Nagar, Near MG Road,<br />
            Bangalore, Karnataka - 560001,<br />
            India.
          </p>

          <p className='text-gray-500'>Tel: 094826-98406 <br />| Email: Doclink@gmail.com</p>

          <p className='text-lg text-gray-600 font-semibold'>CAREERS AT DOCLINK</p>

          <p className='text-gray-500'>Learn more about our teams and job openings.</p>

          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}
