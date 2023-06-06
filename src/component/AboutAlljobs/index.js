import {Link} from 'react-router-dom'
import {GrLocation} from 'react-icons/gr'

import './index.css'

const AboutAllJobs = props => {
  const {allJobsDetails} = props
  const {
    title,
    companyLogoUrl,
    packagePerAnnum,
    employmentType,
    jobDescription,
    location,
    rating,
    id,
  } = allJobsDetails

  return (
    <li className="jobs-list-card">
      <Link to={`/jobs/${id}`} className="link">
        <div className="img-heading-card">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-img"
          />
          <div className="heading-rating-card">
            <h1 className="company-heading">{title}</h1>
            <p className="company-paragraph">{rating}</p>
          </div>
        </div>
        <div className="text-content-card">
          <div className="location-employ-type">
            <GrLocation className="react-icon" />
            <p className="paragraph-text">{location}</p>

            <p className="paragraph-text">{employmentType}</p>
          </div>
          <p className="paragraph-text">{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description-para">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default AboutAllJobs
