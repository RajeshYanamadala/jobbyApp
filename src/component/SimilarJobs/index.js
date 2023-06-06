import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    location,
    companyLogoUrl,
    employmentType,
    rating,
    jobDescription,
    title,
    id,
  } = similarJobDetails

  return (
    <li className="similar-job-container" key={id}>
      <div className="similar-img-text-card">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-img"
          key="company_logo_url"
        />
        <div>
          <h2 className="similar-job-heading">{title}</h2>
          <p className="similar-job-paragraph">{rating}</p>
        </div>
      </div>
      <p className="similar-job-descrit">{jobDescription}</p>
      <div className="similar-text-card">
        <p className="similar-job-text">{location}</p>
        <p className="similar-job-text">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
