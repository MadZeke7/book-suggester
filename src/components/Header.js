import styles from '../styles/header.module.css'
import { Link } from 'react-router-dom'

function Header(){
    return(
        <header>
            <div className={styles.leftNav}>
                <img src="https://www.azirish.org/wp-content/uploads/2016/05/bookgroup2.png" width="65" height="65"></img>
                <span>BiblioSite</span>
            </div>
            <div>
                <ul className={styles.rightNav}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Registration</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/books">Books</Link></li>
                </ul>
            </div>
        </header>
    )
}

export default Header;