import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone} from '@fortawesome/free-solid-svg-icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillEnvelopeFill } from 'react-icons/bs';

function ContactsCard() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isContactsFormValid, setIsContactsFormValid] = useState(false);

  useEffect(() => {
    if (subject === '' || message === '') {
        setIsContactsFormValid(false);
    } else {
        setIsContactsFormValid(true);
    }
    }, [subject, message]);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Додати логіку для надсилання форми
  };

  return (
    <div className="contacts-card">
      <div id="contact" className="contact-area section-padding">
        <div className="container">
          <div className="section-title">
            <h4 className="h2-place">Зв'яжіться з нами</h4>
            <p>
              Ми завжди відкриті до співпраці та готові допомогти вам у будь-яких
              питаннях. Наша команда з радістю допоможе вам досягнути цілей та успіхів у
              навчанні.
            </p>
          </div>
          <div className="row">
            <div className="col-lg-7">
              <div className="contact">
                <form className="form" name="enq" method="post" action="" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="subject"
                        className="form-control"
                        placeholder="Тема"
                        required
                        value={subject}
                        onChange={handleSubjectChange}
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <textarea
                        rows="6"
                        name="message"
                        className="form-control"
                        placeholder=""
                        required
                        value={message}
                        onChange={handleMessageChange}
                      ></textarea>
                    </div>
                    <div className="col-md-12 text-center">
                      <button
                        type="submit"
                        value="Send message"
                        name="submit"
                        id="submitButton"
                        className="btn btn-contact-bg"
                        disabled={!isContactsFormValid}
                      >
                        Надіслати
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5 cont-info">
              <div className="single_address">
                <div className='icon-cont'>
                    <FaMapMarkerAlt className="fa"/>
                </div>
                <p>м. Львів</p>
              </div>
              <div className="single_address">
                <div className='icon-cont'>
                    <FontAwesomeIcon icon={faPhone} className="fa"/>
                </div>
                <p>+380 73 222 17 93</p>
              </div>
              <div className="single_address">
                <div className='icon-cont'>
                    <BsFillEnvelopeFill className="fa"/>
                </div>
                <p>support@studscore.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactsCard;
