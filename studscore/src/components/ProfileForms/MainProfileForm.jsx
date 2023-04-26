import React, { useEffect, useRef, useState } from 'react';

const ProfileForm = () => {
    const [firstName, setFirstName] = useState('Анастасія');

    const [lastName, setLastName] = useState('Кудибовська');

    const [userName, setUserName] = useState('anastasiia_kudybovska');

    const [date_of_birthday, setDateOfBirthday] = useState('2003-10-10');

    const [group, setGroup] = useState('КН-215')

    const [email, setEmail] = useState('nastya@gmail.com');

    const [phoneNumber, setPhoneNumber] = useState('+380 96 273 41 18');

    const [date_of_entry, setDateOfEntry] = useState('2021-09-11')
    const [date_of_graduation, setDateOfGraduation] = useState('2026-06-30')

    const [isProfileFormChanged, setIsProfileFormChanged] = useState(false);
    const [isProfileFormValid, setIsProfileFormValid] = useState(true);

    const [prevFirstName, setPrevFirstName] = useState('Анастасія');
    const [prevLastName, setPrevLastName] = useState('Кудибовська');
    const [prevUserName, setPrevUserName] = useState('anastasiia_kudybovska');
    const [prevEmail, setPrevEmail] = useState('nastya@gmail.com');
    const [prevPhoneNumber, setPrevPhoneNumber] = useState('+380 96 273 41 18');


    const formRef = useRef(null);

    useEffect(() => {
      setIsProfileFormValid(formRef.current.checkValidity());
      setIsProfileFormChanged(
        firstName !== prevFirstName ||
        lastName !== prevLastName ||
        userName !== prevUserName ||
        email !== prevEmail ||
        phoneNumber !== prevPhoneNumber
      );
      
    }, [firstName, lastName, userName, email, phoneNumber]);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
      };
    
      const handleLastNameChange = (event) => {
        setLastName(event.target.value);
      };
    
      const handleUserNameChange = (event) => {
        setUserName(event.target.value);
      };

      const handleDateOfBirthdayChange = (event) => {
        setDateOfBirthday(event.target.value);
      };
    
      const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };
    
      const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission
        setPrevFirstName(firstName);
        setPrevLastName(lastName);
        setPrevUserName(userName);
        setPrevEmail(email);
        setPrevPhoneNumber(phoneNumber);
      };
    
  return (
    <>
        <form onSubmit={handleSubmit} className="file-upload"  ref={formRef} >
      <div className="row mb-5 gx-5">
        <div className="col-xxl-9 mb-5 mb-xxl-0">
          <div className="bg-secondary-soft px-4 py-5">
            <div className="row g-3">
              <h4 className="mt-0 h2-place">Контактна інформація</h4>
              <div className="col-md-6">
                <label className="form-label-cust">Ім'я</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ім'я"
                  aria-label="First name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  pattern="[^0-9]*"
                />
              </div>
              <div className="col-md-6">
                <label id="form-label">Прізвище</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Прізвище"
                  aria-label="Last name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  pattern="[^0-9]*"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Ім'я користувача</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ім'я користувача"
                  aria-label="User name"
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Дата народження</label>
                <input 
                  type="date" 
                  className="form-control" 
                  placeholder="Дата народження" 
                  aria-label="Date of birthday" 
                  value={date_of_birthday}
                  max="2013-12-31" 
                  disabled
                  onChange={handleDateOfBirthdayChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">
                  Електронна пошта
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  value={email}
                  placeholder="support@studscore.com"
                  pattern="(.)+@[A-Za-z0-9]([A-Za-z0-9.\-]*[A-Za-z0-9])?\.[A-Za-z]{1,13}$"
                  onChange={handleEmailChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Група</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Група" 
                  aria-label="Group" 
                  value={group} 
                  disabled 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Номер телефону</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Номер телефону" 
                  aria-label="Phone number" 
                  pattern="[\d\s\+]*" 
                  value={phoneNumber} 
                  onChange={handlePhoneNumberChange} 
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Дата вступу</label>
                <input 
                  type="date"
                  className="form-control"
                  placeholder="Дата вступу"
                  aria-label="Date of entry"
                  value={date_of_entry}
                  // onChange={handleDateOfEntryChange}
                disabled
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Дата закінчення навчання</label>
                <input 
                  type="date"
                  className="form-control"
                  placeholder="Дата закінчення навчання"
                  aria-label="Date of graduation"
                  value={date_of_graduation}
                  // onChange={handleDateOfGraduationChange}
                disabled
                />
              </div>
              <div className="button-update gap-3 d-md-flex justify-content-md-end text-center">
              <button 
                type="button" 
                disabled={!isProfileFormChanged || !isProfileFormValid}
                className={`btn btn-lg ${isProfileFormChanged ? 'btn-disabled' : ''}`} // Використання CSS класів}
              >
                Зберегти
              </button>
              </div>

              </div>
            </div>
        </div> 
        </div>
        </form> 
                
    </>
  );
};

export default ProfileForm;