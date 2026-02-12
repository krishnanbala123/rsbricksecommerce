"use client";

import Link from "next/link";
import "./footer.css";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT – BRAND */}
        <div className="footer-col brand">
          <div className="brand-row center">
            <img src="/bricks-logo.png" alt="RS Bricks" />
           
          </div>

          <p className="brand-desc">
            R.S Bricks delivers high-quality, precisely crafted bricks that
            contractors rely on, as well as long-lasting, durable products
            homeowners trust.
          </p>

          <div className="social-icons center">
            <a href="https://www.facebook.com/share/15wxsgeWN5/"><FaFacebookF /></a>
            <a href="https://www.youtube.com/@NellaiRSBricks"><FaYoutube /></a>
            <a href="https://www.instagram.com/___black___boy___bala?igsh=MTM4aHNkcmtwbHZnYQ=="><FaInstagram /></a>
          </div>
        </div>

        {/* CENTER – LINKS */}
        <div className="footer-col">
          <h3>Explore Us</h3>
          <ul>
            <li>
            <Link href="https://www.rsbricks.in/index.html" target="blank">Home</Link>
            </li>
            <li>
            <Link href="/shop">Shop</Link>
            </li>
            <li>
            <Link href="https://www.rsbricks.in/contact.html" target="blank">Contact</Link>
            </li>
          </ul>
        </div>

        {/* RIGHT – CONTACT */}
        <div className="footer-col contact">
          <h3>Contact Us</h3>
          <div className="contact-list">
          <div className="contact-item">
            <FaPhoneAlt />
            <span><a href="tel:+919345278858" className="link-hover-white">+91 9345278858</a></span>
          </div>

          <div className="contact-item">
            <FaEnvelope />
            <span><a href="mailto:nellairsbricks@gmail.com" className="link-hover-white text-15">nellairsbricks@gmail.com</a></span>
          </div>

          <div className="contact-item">
            <FaMapMarkerAlt />
            <span><a href="https://maps.app.goo.gl/mrb4wi8DeeAuxPrMA" target="_blank" className="link-hover-white">
                      Nanguneri-Tirunelveli
                    </a></span>
          </div>
        </div>
       </div>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        © <a href="https://www.rsbricks.in/index.html" target="_blank"> R.S Bricks </a> {year}. All Rights Reserved.
      </div>
    </footer>
  );
}
