import React, { useEffect, useRef, useState } from 'react';
import AxiosClient from '../AxiosClient';
import CustomAlert from '../CustomAlert';
import LoadingSpinner from '../Loading/LoadingSpinner';

const ProfileForm = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [date_of_birthday, setDateOfBirthday] = useState('');
    const [group, setGroup] = useState('')
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [date_of_entry, setDateOfEntry] = useState('')
    const [date_of_graduation, setDateOfGraduation] = useState('')

    const [isProfileFormChanged, setIsProfileFormChanged] = useState(false);
    const [isProfileFormValid, setIsProfileFormValid] = useState(true);

    const [prevFirstName, setPrevFirstName] = useState('');
    const [prevLastName, setPrevLastName] = useState('');
    const [prevUserName, setPrevUserName] = useState('');
    const [prevEmail, setPrevEmail] = useState('');
    const [prevPhoneNumber, setPrevPhoneNumber] = useState('');

    const [firstNameError, setFirstNameError] = useState(' ');
    const [lastNameError, setLastNameError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [myErrors, setMyErrors] = useState(' ');
    // const [isValid, setIsValid] = useState(true);
    const [isValidArray, setIsValidArray] = useState(Array(5).fill(true));

    const formRef = useRef(null);

    const user = props.user ? props.user : null;
    const updatedUserData = {};

    const [alertMessage, setAlertMessage] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertKey, setAlertKey] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      async function getProfileData() {
        setLoading(true);
        if (user && user.id) {
         return AxiosClient.get(`/students/${user.id}`)
            .then((response) => {
              if (response.status === 200) {
                // console.log(response.data);
                const userData = response.data;
                setFirstName(userData.user.first_name);
                setPrevFirstName(userData.user.first_name);
                setLastName(userData.user.last_name);
                setPrevLastName(userData.user.last_name);
                setUserName(userData.user.username);
                setPrevUserName(userData.user.username);
                setDateOfBirthday(userData.date_of_birthday);
                setEmail(userData.user.email);
                setPrevEmail(userData.user.email);
                setGroup(userData.group.name);
                setPhoneNumber(userData.user.phone);
                setPrevPhoneNumber(userData.user.phone);
                setDateOfEntry(userData.date_of_entry);
                setDateOfGraduation(userData.date_of_graduation);
                setLoading(false);
              }
            })
            .catch((error) => {
              console.log(error);
              setAlertMessage(error.response.data.error.message);
              setAlertSuccess(false);
              setAlertKey(alertKey + 1);
              setLoading(false);
            })
        }
      }   
      getProfileData();
    }, [user]);

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

    function setIsValid(index, value) {
      const newArray = [...isValidArray];
      newArray[index] = value;
      setIsValidArray(newArray);
    }
    const isValidName = (name) => {
      const namePattern = /^$|^[a-zA-Zа-яА-ЯіІїЇєЄ']{1,}$/;
      return namePattern.test(name);
    };
    const handleFirstNameChange = (event) => {
      const firstNameValue = event.target.value;
      setFirstName(firstNameValue);
      if (!isValidName(firstNameValue)){
        setFirstNameError("Ім'я не може містити цифри та інші спеціальні символи.");
        setIsValid(0, false);
      }
      else if (firstNameValue == ''){
        setFirstNameError("Ім'я не може бути порожнім.");
        setIsValid(0, false);
      }
      else{
        setFirstNameError("");
        setIsValid(0, true);
      }
    };

    useEffect(() => {
      const errors = [firstNameError, lastNameError, userNameError, emailError, phoneError];
      if (isValidArray.some(value => value === false)) {
        setMyErrors(errors.filter(error => !!error).join(' '));
      } else {
     setMyErrors("");
    }  
    }, [isValidArray]);
    
      const handleLastNameChange = (event) => {
        // setLastName(event.target.value);
        const lastNameValue = event.target.value;
        setLastName(lastNameValue);
        if (!isValidName(lastNameValue)){
          setLastNameError("Прізвище не може містити цифри та інші спеціальні символи.");
          setIsValid(1, false);
        }
        else if (lastNameValue == ''){
          setLastNameError("Прізвище не може бути порожнім.");
          setIsValid(1, false);
        }
        else{
          setLastNameError("");
          setIsValid(1, true);
        }
       };
    
      const handleUserNameChange = (event) => {
        setUserName(event.target.value);
        if (event.target.value == ''){
          setUserNameError("Ім'я користувача не може бути порожнім.");
          setIsValid(2, false);
        }
        else{
          setUserNameError("");
          setIsValid(2, true);
        }
      };

      const handleDateOfBirthdayChange = (event) => {
        setDateOfBirthday(event.target.value);
      };
    
      const isValidEmail = (email) => {
        const emailPattern = /(.+)?@[A-Za-z0-9]([A-Za-z0-9.\-]*[A-Za-z0-9])?\.[A-Za-z]{1,13}$/;
        return emailPattern.test(email);
      };

      const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        setEmail(emailValue);
        if (!isValidEmail(emailValue) || emailValue == ''){
          setEmailError("Некоректна електронна пошта.");
          setIsValid(3, false);
        }
        else if (emailValue == "") {
          setEmailError("Електронна пошта не може бути порожною.");
          setIsValid(3, false);
        }
        else{
          setEmailError("");
          setIsValid(3, true);
        }
      };

      const isValidPhone = (phone) => {
        const phonePattern =  /^[\d\s+]*$/; 
        return phonePattern.test(phone);
      };
    
      const handlePhoneNumberChange = (event) => {
        const phoneNumberValue = event.target.value;
        setPhoneNumber(phoneNumberValue);
        if (phoneNumberValue.trim() === "") {
          setPhoneError("Номер телефону не може бути порожнім.");
          setIsValid(4, false);
        } else if (!isValidPhone(phoneNumberValue)) {
          setPhoneError("Некоректний номер телефону.");
          setIsValid(4, false);
        } else {
          setPhoneError("");
          setIsValid(4, true);
        }
      };
       
      const handleSubmit = (event) => {
        event.preventDefault();
        props.setIsUpdatedUser(false);
        if(firstName != prevFirstName){
          updatedUserData.first_name = firstName;
        }    
        if(lastName != prevLastName){
          updatedUserData.last_name = lastName;
        } 
        if(userName != prevUserName){
          updatedUserData.username = userName;
        } 
        if(email != prevEmail){
          updatedUserData.email = email;
        } 
        if(phoneNumber != prevPhoneNumber){
          updatedUserData.phone = phoneNumber;
        } 
        // console.log(updatedUserData)
        AxiosClient.put(`/user/${props.user.username}`, 
          updatedUserData)
        .then((response) => {
         //  console.log(response.data)
         setAlertMessage("Зміни успішно збережені!");
         setAlertSuccess(true);
         setAlertKey(alertKey + 1);
         props.setIsUpdatedUser(true);
        })
        .catch((error) => {
          console.log(error);
          setAlertMessage(error.response.data.error.message);
          setAlertSuccess(false);
          setAlertKey(alertKey + 1);
        });
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
              {!loading ? (
                <>
              <div className="col-md-6">
                <label className="form-label-cust">Ім'я</label>
                <input
                  required
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
                  required
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
                  required
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
              <div className="button-update  d-md-flex justify-content-md-end text-center" style={{marginTop:"0.3rem"}}>
              <div className="error_changeprofile_text">
                <p className={myErrors ? 'show' : 'hide'}>
                  {myErrors ? myErrors : "\u00A0"}
                </p>
              </div>
              <button 
                type="submit" 
                disabled={!isProfileFormChanged || !isProfileFormValid}
                className={`btn btn-lg${isProfileFormChanged ? 'btn-disabled' : ''}`}
              >
                Зберегти
              </button>
              </div>
              </>
              ): (<LoadingSpinner/>)}
              </div>
            </div>
        </div> 
        </div>
        </form> 
        {alertMessage && (
        <CustomAlert 
          key={alertKey} 
          message={alertMessage} 
          success={alertSuccess} />
        )}       
    </>
  );
};

export default ProfileForm;