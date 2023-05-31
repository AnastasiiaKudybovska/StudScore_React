import React from 'react';
import ContactsCard from './ContactsCard';
import { ButtonSocket } from './ButtonSocket';

const Contacts = (props) => {
  return (
    <div className="contacts-cont">
      <div className="my-5">
        <h2>Контакти</h2>
        <hr/>
      </div>
      <ContactsCard user={props.user}/>
      <ButtonSocket/>
    </div>
  );
};

export default Contacts;