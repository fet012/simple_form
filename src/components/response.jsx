import { Link } from 'react-router-dom';
import './styles.css'; 

const ThankYouPage = () => {
  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <h2 className="thank-you-title">Thank You!</h2>
        <p className="thank-you-message">
          Your submission has been received successfully.
        </p>
        <Link to="/" className="return-button">
          Back to Form
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;