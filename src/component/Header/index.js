import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="header-card">
      <Link to="/jobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          alt="website logo"
          className="header-website-logo"
        />
      </Link>
      <ul className="header-text">
        <Link to="/">
          <li className="header-para">Home</li>
        </Link>
        <Link to="/jobs">
          <li className="header-para">Jobs</li>
        </Link>
      </ul>
      <li>
        <button type="button" className="header-btn" onClick={onClickLogoutBtn}>
          Logout
        </button>
      </li>
    </nav>
  )
}

export default withRouter(Header)
