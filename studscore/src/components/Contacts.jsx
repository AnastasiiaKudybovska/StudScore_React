import React from 'react';
import ContactsCard from './ContactsCard';

const Contacts = () => {
  return (
    <div className="contacts-cont">
      <div className="my-5">
        <h2>Контакти</h2>
        <hr/>
      </div>
      <ContactsCard/>
    </div>
  );
};

export default Contacts;