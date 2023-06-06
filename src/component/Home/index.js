import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="home-bg">
      <Header />
      <div className="home-text-card">
        <h1 className="home-heading">Find The Job That Fits Your Life </h1>
        <p className="home-para">
          Millions of people are searching for jobs, salary, information,Company
          reviews. find the jod that fits your ability and potential.
        </p>
        <div>
          <Link to="/jobs">
            <button type="button" className="home-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
