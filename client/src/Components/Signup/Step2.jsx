import './Step2.css';

export const Step2 = () => {
  const step = 2; // Current step (Step 1 of 3)
  const totalSteps = 3; // Total number of steps

  // Calculate progress percentage for the bar
  const progressPercentage = (step / totalSteps) * 100;

return (
    <div className='container'>
      {/* Progress Bar */}
    <div className='progress-bar-wrapper'>
        <hr className='progress-bar-background' />
        <hr
        className='progress-bar-fill'
        style={{ width: `${progressPercentage}%` }}
        />
    </div>

      {/* Header */}
    <div className='Head'>
        <h4>Step {step} of {totalSteps}</h4>
        <h5>Create a password</h5>
    </div>

      {/* Form */}
    <form className="password-form">
        <label htmlFor="password" className="form-label">
        <p className='password-title'>Password</p>
        </label>
        <input
        type="password"
        id="password"
        name="password"
        placeholder="example@password.com"
        className="password-input"
        required
        />
        
        <div className='indications'>
        <h5>Your password must contain:</h5>
        <ul>
        <li>1 letter</li>
        <li>1 number or special character (e.g., # ? ! &)</li>
        <li>10 characters</li>
        </ul>
    </div>
        <button type="submit" className="submit-button">
        Next
        </button>
    </form>

      {/* Password Requirements */}
    
    </div>
);
};
