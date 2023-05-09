import React, { useContext, useEffect, useState } from 'react'
import './MainStat.scss'
import MainStatCont from './MainStatCont';
import LeaderboardTable from './LeaderboardTable';
import StudentMarks from './StudentMarks';
import AxiosClient from '../AxiosClient';
import CustomAlert from '../CustomAlert';
import Loader from '../Loading/Loader';

const MainStat = (props) => { 
  const user = props.user ? props.user : null;

  const [group_id, setGroupId] = useState('');

  const [placeInGroup, setPlaceInGroup] = useState(null);
  const [placeInStream, setPlaceInStream] = useState(null);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  const [loadingArray, setLoadingArray] = useState(Array(5).fill(false));

  const [leaderboardGroupData, setLeaderboarGroupdData] = useState([]);

  function setLoading(index, value) {
    const newArray = [...loadingArray];
    newArray[index] = value;
    setLoadingArray(newArray);
  }
  useEffect(() => {
    async function getGroupId() {
      setLoading(0, true);
      if (user && user.id) {
       return AxiosClient.get(`/students/${user.id}/groups`)
          .then((response) => {
            if (response.status === 200) {
              setGroupId(response.data);
              setLoading(0, false);
            }
          })
          .catch((error) => {
            console.log(error);
            setAlertMessage(error.response.data.error.message);
            setAlertSuccess(false);
            setAlertKey(alertKey + 1);
            setLoading(0, false);
          })
      }
    }   
    getGroupId();
    async function getPlaceInSteam() {
      setLoading(1, true);
      if (user && user.id) {
       return AxiosClient.get(`/students/${user.id}/rating/place`)
          .then((response) => {
            if (response.status === 200) {
              setPlaceInStream(response.data + 1)
              setLoading(0, false);
            }
          })
          .catch((error) => {
            console.log(error);
            setAlertMessage(error.response.data.error.message);
            setAlertSuccess(false);
            setAlertKey(alertKey + 1);
            setLoading(0, false);
          })
      }
    }   
    getGroupId();
    getPlaceInSteam();
  }, [user]);



  useEffect(() => {
    async function getPlaceInGroup() {
      setLoading(3, true);
      if (user && user.id && group_id != '') {
        return AxiosClient.get(`/students/${user.id}/groups/${group_id}/rating/place`)
        .then((response) => {
          if (response.status === 200) {
            setPlaceInGroup(response.data + 1); 
            setLoading(3, false);
          }
        })
        .catch((error) => {
          console.log(error);
          setAlertMessage(error.response.data.error.message);
          setAlertSuccess(false);
          setAlertKey(alertKey + 1);
          setLoading(3, false);
        })
    }
  }
    getPlaceInGroup();    
  }, [group_id]);
   
  useEffect(() => {
    async function getGroupRating() {    
      setLoading(4, true);
      if (group_id != '' && user && user.id) {
        return AxiosClient.get(`/students/groups/${group_id}/rating`)
        .then((response) => {
          if (response.status === 200) {
            setLeaderboarGroupdData(response.data);
            response.data.forEach((item) => {
              if (item.student.user.id_user === user.id) {
                props.setMyRatMark(item.rating_mark);
                props.setMyAverageMark(item.average_mark);
              }
              setLoading(4, false);
            });
                //  console.log(response.data) 
            }
          })
          .catch((error) => {
            console.log(error);
            setAlertMessage(error.response.data.error.message);
            setAlertSuccess(false);
            setAlertKey(alertKey + 1);
            setLoading(4, false);
          })
        }
      }
        getGroupRating();
        // console.log(loadingArray)
    
  }, [user, group_id]);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loadingArray.every(value => value === false)){
        setIsLoading(false);
      }
      // console.log(setIsLoading);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [loadingArray]);
  return (
    <div className="mainStatWrapper">
      {!isLoading ? (
        <div className="main-stat-wrap">
            <div className="main-stat-place-cont">
                <MainStatCont title="Місце у групі" data={placeInGroup} />
                <MainStatCont title="Місце на потоці" data={placeInStream} />
            </div>
            <div className="main-stat-cont-wrap">
              <div className="main-stat-cont">
                <div className="main-stat-rat-subcont">
                  <LeaderboardTable 
                    group_id={group_id} 
                    user={user} 
                    setMyRatMark={props.setMyRatMark} 
                    setMyAverageMark={props.setMyAverageMark} 
                    leaderboardGroupData={leaderboardGroupData}
                    />
                </div>
              </div>
              <StudentMarks user={user}/>
          </div>
        </div>
        ): (<Loader/>)}
        {alertMessage && (
        <CustomAlert 
          key={alertKey} 
          message={alertMessage} 
          success={alertSuccess} />
        )}
    </div>

  );
};

export default MainStat;