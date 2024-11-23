import React from 'react';
import Navbar, { handleNavbar } from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className='holder'>
    <header className='header' >
        <Navbar />
        <div className='header-content flex flex-c text-center text-white'>
            <h2 className='header-title text-capitalize'>Find Your Book of Choice</h2><br />
            <p className='header-text fs-18 fw-3'>
                Discover a world of books tailored to your interests. Whether you're looking for the latest bestsellers, classic literature, or niche genres, we’ve got something for every reader. 
                Start your search now to find the perfect book for you—whether it's for personal enjoyment, academic research, or anything in between.
            </p>
            <SearchForm />
        </div>
    </header>
</div>

  )
}

export default Header