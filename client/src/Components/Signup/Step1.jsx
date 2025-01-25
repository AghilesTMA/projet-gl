import './Step1.css';

const Step1 = () => {
  const step = 1; // Current step (Step 1 of 3)
  const totalSteps = 3; // Total number of steps

  // Calculate progress percentage for the bar
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className='container'>
    <div className='progress-bar-wrapper'>
      <hr className='progress-bar-background' />
      <hr
      className='progress-bar-fill'
      style={{ width: `${progressPercentage}%` }}
      />
  </div>
        <h1 className="heading">
        Connecting you to the best <br />
        <span className="highlight">properties in Algeria</span> for <br />
        buying, renting, and selling.
        </h1>

        <form className="email-form">
        <label htmlFor="email" className="form-label">
        <p className='email-title'>Email Address</p>
        </label>
        <input
        type="email"
        id="email"
        name="email"
        placeholder="example@email.com"
        className="email-input"
        required
        />
        <button type="submit" className="submit-button">
        Next
        </button>
    </form>
    </div>
  )
}
export default Step1