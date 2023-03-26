import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {IoIosCloseCircle} from 'react-icons/io'

import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {displayMenu: true, searchInput: '', showSearchbar: true}

  showMenubar = () => {
    this.setState({displayMenu: true})
  }

  toggleSearchbar = () => {
    this.setState(prevState => ({
      showSearchbar: !prevState.showSearchbar,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  changeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderSearchbar = () => {
    const {searchInput} = this.state
    return (
      <div className="search-bar">
        <input
          type="search"
          value={searchInput}
          placeholder="Search Caption"
          className="search-input"
          onChange={this.changeInput}
        />
        <button
          className="search-button"
          type="button"
          data-testid="searchIcon"
          onClick={this.searchClicked}
        >
          <FaSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderMenubar = () => {
    const {showSearchbar} = this.state
    return (
      <div className="nav-menu-mobile">
        <ul className="nav-menu-list-mobile">
          <li className="nav-menu-item-mobile">
            <Link to="/" className="nav-link-mobile">
              Home
            </Link>
          </li>

          <li
            className="nav-menu-item-mobile search-list-item"
            onClick={this.toggleSearchbar}
          >
            Search
          </li>

          <li className="nav-menu-item-mobile">
            <Link to="/my-profile" className="nav-link-mobile">
              Profile
            </Link>
          </li>

          <li className="nav-menu-item-mobile">
            <button
              onClick={this.onClickLogout}
              type="button"
              className="logout-desktop-btn"
            >
              Logout
            </button>
          </li>

          <li className="nav-menu-item-mobile">
            <button type="button" className="close-menu-button">
              <IoIosCloseCircle className="close-icon" />
            </button>
          </li>
        </ul>

        {showSearchbar ? this.renderSearchbar() : null}
      </div>
    )
  }

  render() {
    const {displayMenu} = this.state
    return (
      <nav className="nav-header">
        <div className="nav-content">
          <div className="nav-bar-mobile-logo-container">
            <div className="mobile-logo-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dzvmpn4nr/image/upload/v1679656831/Standard_Collection_8_yktalp.svg"
                  alt="website logo"
                  className="website-logo"
                />
              </Link>
              <h1 className="mobile-website-name">Insta Share</h1>
            </div>
            <button
              onClick={this.showMenubar}
              type="button"
              className="hamburger-button"
              testid="hamburgerIcon"
            >
              <img
                src="https://res.cloudinary.com/dzvmpn4nr/image/upload/v1679742700/menu_xpx011.svg"
                className="hamburger-icon"
                alt="hamburger icon"
              />
            </button>
          </div>
          {displayMenu ? this.renderMenubar() : null}
          <div className="nav-bar-large-container">
            <div className="logo-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dzvmpn4nr/image/upload/v1679656831/Standard_Collection_8_yktalp.svg"
                  alt="website logo"
                  className="website-logo"
                />
              </Link>
              <h1 className="website-name">Insta Share</h1>
            </div>
            <div className="links-container">
              {this.renderSearchbar()}
              <ul className="nav-menu">
                <li className="nav-menu-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-menu-item">
                  <Link to="/my-profile" className="nav-link">
                    Profile
                  </Link>
                </li>
              </ul>
              <button
                type="button"
                className="logout-desktop-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
