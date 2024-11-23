import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const URL = "https://openlibrary.org/works/";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [ebookAccess, setEbookAccess] = useState(null);
  const [excerpts, setExcerpts] = useState([]);
  const [subjectPlaces, setSubjectPlaces] = useState(null);
  const [subjectTimes, setSubjectTimes] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [description, setDescription] = useState(null);
  const [subjectPeople, setSubjectPeople] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        // Fetch book details from works API
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();
        console.log(data); // View the full response to check available data

        if (data) {
          const { 
            description,
            title,
            covers,
            subject_places,
            subject_times,
            subjects,
            
            ebook_access,
            excerpts,
            subject_people
          } = data;

          const newBook = {
            description: description ? description.value : "No description found",
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times: subject_times ? subject_times.join(", ") : "No subject times found",
            subjects: subjects ? subjects.join(", ") : "No subjects found",
            ebook_access: ebook_access ? "Available" : "Not Available",
            excerpts: excerpts || [],
            subject_people: subject_people || [],
           
          };

          setBook(newBook);
          
          setEbookAccess(newBook.ebook_access);
          setExcerpts(newBook.excerpts);
          setSubjectPlaces(newBook.subject_places);
          setSubjectTimes(newBook.subject_times);
          setSubjects(newBook.subjects);
          setDescription(newBook.description);
          setSubjectPeople(newBook.subject_people);
        } else {
          setBook(null);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'></span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Ebook Access: </span>
              <span>{ebookAccess}</span>
            </div>
            <div className='book-details-item description'>
              <span>{description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{subjectPlaces}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{subjectTimes}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{subjects}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject People: </span>
              <span>{subjectPeople?.join(", ")}</span>
            </div>
            <div className='book-details-item'>
              <div className='book-details-excerpt'>
                {excerpts.length > 0 ? (
                  excerpts.map((excerpt, index) => (
                    <div key={index} className='excerpt'>
                      <span className='fw-6'>Pages: </span>
                      <span>{excerpt.pages}</span>
                      <p><span className='fw-6'>Excerpt: </span>{excerpt.excerpt}</p>
                    </div>
                  ))
                ) : (
                  <span>No excerpts available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
