
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#2f2f2f] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top section with logo and quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & About DarkRoom */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">DarkRoom</h3>
            <p className="text-lg mb-4">
              DarkRoom is a place for movie enthusiasts to connect, share, and discuss their favorite films.
            </p>
            <ul>
              <li><a href="#" className="text-[#148f6e] hover:text-[#107b5b]">About Us</a></li>
              <li><a href="#" className="text-[#148f6e] hover:text-[#107b5b]">Careers</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#" className="text-[#148f6e] hover:text-[#107b5b]">Contact</a></li>
              <li><a href="#" className="text-[#148f6e] hover:text-[#107b5b]">Terms & Conditions</a></li>
              <li><a href="#" className="text-[#148f6e] hover:text-[#107b5b]">Privacy Policy</a></li>
              <li><a href="#" className="text-[#148f6e] hover:text-[#107b5b]">FAQ</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-[#148f6e] hover:text-[#107b5b]">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#148f6e] hover:text-[#107b5b]">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#148f6e] hover:text-[#107b5b]">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-[#148f6e] hover:text-[#107b5b]">
                  <i className="fab fa-youtube"></i>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Join Our Newsletter</h3>
            <p className="text-lg mb-4">Stay updated with the latest discussions and movie releases.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 w-2/3 text-black rounded-l-md"
              />
              <button className="bg-[#148f6e] text-white px-4 py-3 rounded-r-md hover:bg-[#107b5b]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 pt-8 mt-8 text-center">
          <p className="text-lg">© 2024 DarkRoom. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
