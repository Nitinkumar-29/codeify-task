import React from "react";
import {
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { IoLocation, IoMail } from "react-icons/io5";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center space-y-12 bg-slate-950 lg:h-[90vh]">
        <div className="flex flex-col space-y-4 items-start w-[95%] md:w-[80%] my-10">
          <span className="w-full md:w-1/3 text-lg md:text-xl font-semibold text-white">
            Signup our newsletter to get update information, news insight or
            promotions.
          </span>
          <div className="flex flex-col md:flex-row space-y-6 items-center md:items-start md:space-y-0 justify-between w-full ">
            <div className="flex space-x-2 w-full md:w-1/2">
              <input
                type="email"
                placeholder="Email"
                className="border-[1px] px-4 py-2 bg-transparent border-zinc-400 outline-none rounded-sm w-2/3"
              />
              <button className="flex items-center space-x-1 rounded-sm bg-white text-black px-4 py-2">
                <IoMail />
                <span>Sign Up</span>
              </button>
            </div>
            {/* social icons */}
            <div className="flex space-x-3 text-white">
              <RiTwitterXFill size={30} className="text-zinc-800" />
              <FaFacebook size={30} className="text-blue-600" />
              <FaInstagram size={30} />
              <FaLinkedin size={30} className="text-sky-600" />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row text-white gap-8 w-[95%] md:w-[80%]">
          <div className="flex flex-col items-center md:items-start space-y-2 w-full md:w-1/3">
            <span className="text-2xl font-semibold">LOGO</span>
            <span>We Work for Excellence</span>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full md:w-2/3 space-y-6 md:space-y-0 space-x-6">
            <div className="flex flex-col space-y-4 w-[95%] md:w-fit">
              <span className="text-xl font-semibold">Products</span>
              <div className="flex flex-col space-y-4">
                <span>Soloar Lightning System</span>
                <span>AOI Monitoring System</span>
                <span>IOT Gateway</span>
              </div>
            </div>
            <div className="flex flex-col space-y-4 w-[95%] md:w-fit">
              <span className="text-xl font-semibold">Links</span>
              <div className="flex flex-col space-y-4">
                <span>Home</span>
                <span>Products</span>
                <span>Support</span>
                <span>Contact</span>
              </div>
            </div>
            <div className="flex flex-col space-y-4 w-[95%] md:w-fit">
              <span className="text-xl font-semibold">Get In Touch</span>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-2 items-start">
                  <FaPhone className="mt-2" />
                  <span>+91-8588878612, +919588878611</span>
                </div>
                <div className="flex space-x-2 items-start">
                  <IoMail className="mt-2" />
                  <span>sales@acgetkej.com</span>
                </div>
                <div className="flex space-x-2 items-start">
                  <IoLocation className="mt-2" />
                  <span className="w-64">
                    Faridabad Office: C/o- &Work, Plot No. 5B, Sector 15-A,
                    First Floor, Crown Plaza Mall, Faridabad, - 121007
                  </span>
                </div>
                <div className="flex space-x-2 items-start">
                  <FaClock className="mt-2" />
                  <span>9:00 AM - 5:30 PM (Mon- Sat)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-start space-x-6 text-white  w-full md:w-[80%] text-sm md:text-xl flex-wrap mt-4 border-t-2 border-white p-2">
          <span>Copyright reserved 2024</span>
          <span>Terms & Conditions</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
