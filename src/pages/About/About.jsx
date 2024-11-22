import React from 'react';
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className='about'>
      <div className='container'>
        <div className='section-title'>
          <h2>About</h2>
        </div>

        <div className='about-content grid'>
          <div className='about-img'>
            <img src={aboutImg} alt="BookHub Illustration" />
          </div>
          <div className='about-text'>
            <h2 className='about-title fs-26 ls-1'>About BookHub</h2>
            <p className='fs-17'>
              BookHub is a platform designed for book lovers, where you can easily search, explore, and discover books from all genres. Whether you're a fan of fiction, non-fiction, mystery, romance, or any other genre, we provide a vast library that caters to all kinds of readers. Our mission is to make book discovery seamless, enjoyable, and personalized for every individual.
            </p>
            <p className='fs-17'>
              Our goal is to help you find your next favorite book. With BookHub, you can search for books by title, author, genre, or even publication year. We offer detailed book information, including summaries, ratings, and more, to help you make the best reading choices. Join us and dive into a world of books that will inspire, educate, and entertain you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
