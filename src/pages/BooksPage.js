import styles from '../styles/BooksPage.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function BooksPage(){
	const url = "http://localhost:3000/books/";

	const [BooksArray, setBooks] = useState([]);

	const [book_no, setBookno] = useState("");
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [year, setYear] = useState(0);
	const [genre, setGenre] = useState("");
	const [imgLink, setimgLink] = useState("");

	useEffect(()=>{
		getBooks()
	}, [BooksArray]);

    function  getBooks(){
		axios.get(url).then( resData => 
        {
           setBooks(resData.data);
        });
    }

	function addBook(){
		const doc = document.getElementById("modal");
		if(doc.style.display!="block"){
			showForm();
			return;
		}
		
		let bookObj = {};
        bookObj.book_title = title; 
        bookObj.book_author = author; 
        bookObj.genre = genre; 
        bookObj.year = year; 
        bookObj.publisher = ""; 
        bookObj.book_image = imgLink;  

		axios.post(url, bookObj).then(resData => {
			let tempArray = [...BooksArray];
			tempArray.push(resData.data);
			setBooks(tempArray);
		});
	}

	function updateBook(){
		let bookObj = {};
        bookObj.book_no = book_no; 
        bookObj.book_title = title; 
        bookObj.book_author = author; 
        bookObj.genre = genre; 
        bookObj.year = year; 
        bookObj.publisher = ""; 
        bookObj.book_image = imgLink;  

        axios.put(url + book_no,  bookObj).then(() => {
          getBooks();
        });
	}

	function deleteBook(e){
		const book_no = e.target.parentElement.children[0].textContent;
		axios.delete(url + book_no).then(resData => {
			getBooks();
		});
	}

	function selectBook(e){
		showForm();
		const book_no = e.target.parentElement.children[0].textContent;
		
		const bookObj = BooksArray.find((item) => (item.book_no == book_no));

		setBookno(bookObj.book_no);
		setTitle(bookObj.book_title);
		setAuthor(bookObj.book_author);
		setYear(bookObj.year);
		setGenre(bookObj.genre);
		setimgLink(bookObj.book_image);
	}

	function showForm(){
		const doc = document.getElementById("modal");
		doc.style.display = "block";
	}

  return (    
    <> 
		<h3 className={styles.h3}>Our Collection</h3>
		<div className={styles.inputAddBook} id="modal">
			<input placeholder="Title" value={title} type="string" onChange={e => setTitle(e.target.value)}/>
			<input placeholder="Author" value={author} type="string" onChange={e => setAuthor(e.target.value)}/>
			<input placeholder="Year" value={year} type="number" onChange={e => setYear(e.target.value)}/>
			<input placeholder="Genre" value={genre} type="string" onChange={e => setGenre(e.target.value)}/>
			<input placeholder="Image Link" value={imgLink} type="string" onChange={e => setimgLink(e.target.value)}/>
		</div>
		<div>
			<button onClick={addBook}>Add Book</button>
			<button onClick={updateBook}>Update Book</button>
		</div>
		<div className={styles.products}>
			{BooksArray.map((item,index) =>
				<div key={index} className={styles.productCard}>
					<p style={{display:'none'}}>{item.book_no}</p>
					<img src={item.book_image} height="200px"/>
					<h5 className={styles.h5}>{item.book_title}</h5>
					<p>Author: {item.book_author}</p>
					<p>Year: {item.year}</p>
					<button onClick={selectBook}>Select</button>
					<button onClick={deleteBook}>Delete</button>
				</div>
				)}
		</div>
	</>   
  );
}

export default BooksPage;