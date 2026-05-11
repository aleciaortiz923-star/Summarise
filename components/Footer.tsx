import React from 'react';

const Footer = () => {
  return (
    <footer className="footer__container">
      <div className="footer__links">
        <div className="footer__column">
          <h4 className="footer__title">Actions</h4>
          <ul className="footer__list">
            <li><a href="#">Summarist Magazine</a></li>
            <li><a href="#">Cancel Subscription</a></li>
            <li><a href="#">Help</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__title">Useful Links</h4>
          <ul className="footer__list">
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Summarist Business</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">Authors & Publishers</a></li>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__title">Company</h4>
          <ul className="footer__list">
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Partners</a></li>
            <li><a href="#">Code of Conduct</a></li>
          </ul>
        </div>
        <div className="footer__column">
          <h4 className="footer__title">Other</h4>
          <ul className="footer__list">
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Legal Notice</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policies</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__copyright">
        <p>Copyright © 2023 Summarist.</p>
      </div>
    </footer>
  );
};

export default Footer;
