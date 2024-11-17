
// import React from 'react';
// import { FaFacebook, FaTwitter, FaInstagram, FaApple, FaGooglePlay } from 'react-icons/fa';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// const Footer = () => {
//     return (
//         <footer style={footerStyle}>
//             <div style={footerContainerStyle}>
//                 {/* Column 1: Social Media */}
//                 <div style={columnStyle}>
//                     <h3 style={columnHeaderStyle}>Follow Us</h3>
//                     <a href="https://www.facebook.com/" style={iconLinkStyle}>
//                         <FaFacebook style={iconStyle} /> Facebook
//                     </a>
//                     <a href="https://x.com/i/flow/login" style={iconLinkStyle}>
//                         <FaTwitter style={iconStyle} /> Twitter
//                     </a>
//                     <a href="https://www.instagram.com/accounts/login/?next=https%3A%2F%2Faccountscenter.instagram.com%2F%3Fentry_point%3Dapp_settings%26__coig_login%3D1" style={iconLinkStyle}>
//                         <FaInstagram style={iconStyle} /> Instagram
//                     </a>
//                 </div>

//                 {/* Column 2: About */}
//                 <div style={columnStyle}>
//                     <h3 style={columnHeaderStyle}>About Us</h3>
//                     <Link to="/about" style={linkStyle}>About Us</Link>
//                     <p style={linkStyle}>Careers</p>
//                     <p style={linkStyle}>Blog</p>
//                 </div>

//                 {/* Column 3: Legal */}
//                 <div style={columnStyle}>
//                     <h3 style={columnHeaderStyle}>Legal</h3>
//                     <p style={linkStyle}>Terms of Service</p>
//                     <p style={linkStyle}>Privacy Policy</p>
//                     <p style={linkStyle}>Cookie Policy</p>
//                 </div>

//                 {/* Column 4: App Downloads */}
//                 <div style={columnStyle}>
//                     <h3 style={columnHeaderStyle}>Get Our App</h3>
//                     <a href="https://play.google.com/store/search?q=pubg&c=apps&hl=en" style={iconLinkStyle}>
//                         <FaApple style={iconStyle} /> App Store
//                     </a>
//                     <a href="https://play.google.com/store/search?q=call+of+duty&c=apps&hl=en" style={iconLinkStyle}>
//                         <FaGooglePlay style={iconStyle} /> Play Store
//                     </a>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// const footerStyle = {
//     backgroundColor: '#333',
//     color: '#fff',
//     padding: '40px 20px',
//     textAlign: 'center',
// };

// const footerContainerStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     maxWidth: '1200px',
//     margin: '0 auto',
// };

// const columnStyle = {
//     flex: '1',
//     minWidth: '200px',
//     marginBottom: '20px',
// };

// const columnHeaderStyle = {
//     fontSize: '18px',
//     marginBottom: '10px',
//     color: '#fff',
// };

// const iconLinkStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     textDecoration: 'none',
//     color: '#fff',
//     marginBottom: '10px',
//     fontSize: '16px',
// };

// const linkStyle = {
//     fontSize: '14px',
//     color: '#ccc',
//     marginBottom: '10px',
//     textDecoration: 'none',
// };

// const iconStyle = {
//     marginRight: '8px',
//     fontSize: '20px',
// };

// // Responsive Styles for Mobile
// const mediaQuery = window.matchMedia('(max-width: 768px)');
// if (mediaQuery.matches) {
//     footerContainerStyle.flexDirection = 'column';
//     footerContainerStyle.alignItems = 'center';
// }

// export default Footer;



// Bakari's
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