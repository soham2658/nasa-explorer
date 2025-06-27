import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">Made by Soham Bhatkhande</p>
        <p className="mb-0">
          Powered by NASA APIs | <a href="https://newsapi.org" className="text-info text-decoration-none" target="_blank" rel="noreferrer">NewsAPI</a>
        </p>
        <small className="text-muted">© {new Date().getFullYear()} Space Today. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;
