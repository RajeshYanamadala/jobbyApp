import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import './index.css'

const apiStatusContest = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetailsList: {},
    companyLifeData: [],
    jobSkills: [],
    similarJobsList: [],
    apiStatus: apiStatusContest.initial,
  }

  componentDidMount() {
    this.getJobDetailsData()
  }

  getUpdateData = data => ({
    location: data.location,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    jobDescription: data.job_description,
    title: data.title,
    id: data.id,
    name: data.name,
    description: data.description,
    imageUrl: data.image_url,
  })

  getJobDetailsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusContest.in_progress})

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateData = this.getUpdateData(data.job_details)
      const updateLifeAtCompanyData = this.getUpdateData(
        data.job_details.life_at_company,
      )
      const updateJobSkills = data.job_details.skills
      const updateSimilarJobs = data.similar_jobs.map(eachJob =>
        this.getUpdateData(eachJob),
      )

      this.setState({
        jobDetailsList: updateData,
        companyLifeData: updateLifeAtCompanyData,
        jobSkills: updateJobSkills,
        apiStatus: apiStatusContest.success,
        similarJobsList: updateSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusContest.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetailsList, similarJobsList} = this.state
    const {
      title,
      location,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      rating,
      jobDescription,
    } = jobDetailsList

    return (
      <>
        <div className="job-details-list-card">
          <li>
            <div className="job-img-title-rating-card">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-details-image"
                value="company_logo_url"
              />
              <div className="title-rating-card">
                <h1 className="job-details-title">{title}</h1>
                <p className="job-details-rating">{rating}</p>
              </div>
            </div>
            <div className="location-employment-package-card">
              <div className="location-employment-card">
                <p className="job-details-location">{location}</p>
                <p className="job-details-type">{employmentType}</p>
              </div>
              <p className="job-details-package">{packagePerAnnum}</p>
            </div>
            <hr />
            <div className="descript-visit-link-card">
              <h2 className="job-details-heading">Description</h2>
              <a
                href={companyWebsiteUrl}
                className="visit-anchor-element"
                key="company_website_url"
              >
                Visit
              </a>
            </div>
            <p className="job-details-paragraph">{jobDescription}</p>
          </li>
          <h2 className="skill-heading">Skills</h2>
          <ul className="skill-unorder-list-container">
            {this.renderJobSkills()}
          </ul>
          <h2 className="life-of-heading">Life at Company</h2>
          <ul>{this.renderLifeOFCompany()}</ul>
        </div>
        <h3>Similar jobs</h3>
        <ul className="similar-job-unorder-list-card">
          {similarJobsList.map(eachJob => (
            <SimilarJobs similarJobDetails={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </>
    )
  }

  renderJobSkills = () => {
    const {jobSkills} = this.state

    return jobSkills.map(skill => (
      <li className="list-skill-card" key={skill.id}>
        <img src={skill.image_url} alt={skill.name} className="skill-img" />
        <p className="skill-name">{skill.name}</p>
      </li>
    ))
  }

  renderLifeOFCompany = () => {
    const {companyLifeData} = this.state
    const {description, imageUrl} = companyLifeData

    return (
      <li className="life-of-details-list-card">
        <p className="life-of-company-paragraph">{description}</p>
        <img src={imageUrl} alt=" life at company" />
      </li>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <div>
        <button type="button">Retry</button>
      </div>
    </div>
  )

  renderLoaderView = () => (
    <div>
      <Loader
        type="ThreeDots"
        width="50"
        height="50"
        color="#ffffff"
        data-testid="loader"
      />
    </div>
  )

  renderJobDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusContest.success:
        return this.renderJobDetails()
      case apiStatusContest.failure:
        return this.renderFailureView()
      case apiStatusContest.in_progress:
        return this.renderLoaderView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <ul className="job-details-container">{this.renderJobDetailsView()}</ul>
      </>
    )
  }
}

export default JobDetails
