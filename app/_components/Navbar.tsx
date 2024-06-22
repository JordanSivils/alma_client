import Link from 'next/link';
import '../../public/static/styles/css/navbar.css'
import '../../public/static/styles/css/allPages.css'

const Navbar = () => {
  return ( 
    <header className='header flex'>
      <div className='logo'>
        <a href="/">ALMA YOGA</a>
      </div>


      <nav>
        <ul id='primary-navigation' className='primary-navigation flex'>
          <li className='dropdown-hover'>
            <a href="/">HOME</a>
          </li>
          <li className='dropdown-hover'>
            <a href="/">YOGA SCHEDULE</a>
          </li>
          <li className='dropdown-hover'>
            <a href="/">CHAKRAS</a>
          </li>
          <li className='dropdown-hover'>
            <a href="/">MODALITIES</a>
          </li>
          <li className='dropdown-hover'>
            <a href="/">YOGA BLOG</a>
          </li>
        </ul>
      </nav>
    </header>
   );
}
 
export default Navbar;