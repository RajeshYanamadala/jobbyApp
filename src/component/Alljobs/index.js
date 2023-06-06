import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import FilterJobsDetails from '../FilterJobsDetails'
import JobRoute from '../JobsRoute'
import AboutAllJobs from '../AboutAlljobs'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatueContent = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Alljobs extends Component {
  state = {
    jobsDataList: [],
    apiStatus: apiStatueContent.initial,
    employmentType: '',
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount = () => {
    this.getAllJobsData()
  }

  getAllJobsData = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {employmentType, salaryRange, searchInput} = this.state

    this.setState({apiStatus: apiStatueContent.in_progress})

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}& minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updateData = data.jobs.map(eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        employmentType: eachData.employment_type,
        jobDescription: eachData.job_description,
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        title: eachData.title,
        id: eachData.id,
      }))

      this.setState(
        {
          jobsDataList: updateData,
          apiStatus: apiStatueContent.success,
        },
        this.updateFailureStatus,
      )
    }
  }

  updateFailureStatus = () => {
    const {jobsDataList} = this.state
    if (jobsDataList.length === 0) {
      this.setState({apiStatus: apiStatueContent.failure})
    }
  }

  changeEmploymentType = employmentType => {
    this.setState({employmentType}, this.getAllJobsData)
  }

  changeSalaryRange = salaryRange => {
    this.setState({salaryRange}, this.getAllJobsData)
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  enterSearchInput = () => {
    this.getAllJobsData()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
        alt="no jobs"
      />
      <h1>No jobs found</h1>
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

  renderGetDataSuccessView = () => {
    const {jobsDataList} = this.state

    return (
      <>
        <ul className="unorder-list-container">
          {jobsDataList.map(eachData => (
            <AboutAllJobs key={eachData.id} allJobsDetails={eachData} />
          ))}
        </ul>
      </>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatueContent.success:
        return this.renderGetDataSuccessView()
      case apiStatueContent.failure:
        return this.renderFailureView()
      case apiStatueContent.in_progress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-main-container">
        <JobRoute
          changeSearchInput={this.changeSearchInput}
          enterSearchInput={this.enterSearchInput}
          searchInput={searchInput}
        />
        <div className="jobs-container">
          <ul className="unorder-list-container">
            <FilterJobsDetails
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeEmploymentType={this.changeEmploymentType}
              changeSalaryRange={this.changeSalaryRange}
              changeSearchInput={this.changeSearchInput}
              enterSearchInput={this.enterSearchInput}
              searchInput={searchInput}
            />
          </ul>
          <div className="all-jobs-data-card">{this.renderApiStatus()}</div>
        </div>
      </div>
    )
  }
}

export default Alljobs
