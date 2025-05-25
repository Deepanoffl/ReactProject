import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="flex flex-col md:flex-row md:items-stretch flex-wrap justify-center items-center gap-8 max-w-7xl mx-auto px-6 py-10 ">
        <div className="w-64">
          <h4 className="text-xl font-semibold mb-4 text-white text-center">
            About Us
          </h4>
          <p className=" leading-relaxed text-center">
            We are dedicated to providing the best products at affordable
            prices. Our mission is to deliver quality and customer satisfaction.
          </p>
        </div>
        <div className="w-40">
          <h4 className="text-xl font-semibold mb-4 text-white text-center">
            Quick Links
          </h4>
          <ul className="space-y-2 ">
            <li className="text-center">
              <a href="#" className="hover:text-white transition ">
                Home
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-white transition">
                Shop
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-white transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div className="w-48">
          <h4 className="text-xl font-semibold mb-4 text-white text-center">
            Customer Support
          </h4>
          <ul className="space-y-2 ">
            <li className="text-center">
              <a href="#" className="hover:text-white transition">
                Shipping & Delivery
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-white transition">
                Returns & Exchanges
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
            <li className="text-center">
              <a href="#" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>
        <div className="w-64">
          <h4 className="text-xl font-semibold mb-4 text-white text-center">
            Contact Us
          </h4>
          <address className="text-sm not-italic space-y-2">
            <p className="text-center">Email: deepanoffl18@example.com</p>
            <p className="text-center">Phone: +91 7010091803</p>
            <p className="text-center">
              Address: 66, Soundara Pandian street, Kovilpatti
            </p>
          </address>
        </div>
        <div className="w-40">
          <h4 className="text-xl font-semibold mb-4 text-white text-center">
            Follow Us
          </h4>
          <div className="flex space-x-4 text-2xl justify-center">
            <a href="#" className="hover:text-white transition">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        <p>
          &copy; 2025 <b>Amazon.</b> All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
