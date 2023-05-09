import React from 'react';
import './style.scss';
import ProfileForm from './ProfileForms/MainProfileForm';
import ChangePasswordForm from './ProfileForms/ChangePasswordForm';

const Profile = (props) => {
  
  return (
    <>
    <div className="profile-cont">
      <div className="container">
        <div className="row ">
            <div className="col-12">
              <div className="my-5">
                <h2>Профіль</h2>
                <hr/>
              </div>
              <ProfileForm user={props.user} setIsUpdatedUser={props.setIsUpdatedUser}/>
              <ChangePasswordForm user={props.user}/>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;