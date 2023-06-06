import './index.css'

const FilterJobsDetails = props => {
  const renderEmploymentTypeJobs = () => {
    const {employmentTypesList, changeEmploymentType} = props

    return employmentTypesList.map(employment => {
      const onClickInput = () => {
        changeEmploymentType(employment.employmentTypeId)
      }

      return (
        <li className="employment-card" key={employment.employmentTypeId}>
          <input
            type="checkBox"
            className="check-box-input"
            id={employment.employmentTypeId}
            onChange={onClickInput}
            value={employment.label}
          />
          <label
            className="employment-label"
            htmlFor={employment.employmentTypeId}
          >
            {employment.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => {
    const {salaryRangesList, changeSalaryRange} = props

    return salaryRangesList.map(salary => {
      const onBlurInput = () => {
        changeSalaryRange(salary.salaryRangeId)
      }

      return (
        <li key={salary.salaryRangeId}>
          <input
            type="radio"
            className="check-box-input"
            id={salary.salaryRangeId}
            onClick={onBlurInput}
            value={salary.label}
          />
          <label className="salary-label" htmlFor={salary.salaryRangeId}>
            {salary.label}
          </label>
        </li>
      )
    })
  }

  return (
    <div className="employment-container ">
      <h1 className="employment-heading">Type Of Employment</h1>
      <ul>{renderEmploymentTypeJobs()}</ul>

      <hr />
      <h1 className="employment-heading ">Salary Range</h1>
      <ul>{renderSalaryRange()}</ul>
    </div>
  )
}

export default FilterJobsDetails
