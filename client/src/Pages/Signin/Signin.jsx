import './Signin.css'
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const Signin = () => {
    return (
        <div className='container'>
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
            <label htmlFor="password" className="form-label">
        <p className='email-title'>Password</p>
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
        Sign In
        </button>
    </form>
    <div className="divider">
        <hr />
        <span>or</span>
        <hr />
    </div>

      {/* Social Buttons */}
    <div className="social-buttons">
        <button className="social-button google-button">
        <FaGoogle size={24} /> Continue with Google
        </button>
        <button className="social-button facebook-button">
        <FaFacebook size={24} /> Continue with Facebook
        </button>
    </div>

      {/* Footer Link */}
    <p className="footer-text">
        Dont have an account yet{" "}
        <a href="#" className="footer-link">
        Sign up here.
        </a>
    </p>
        </div>
    );
    };
    export default Signin;
