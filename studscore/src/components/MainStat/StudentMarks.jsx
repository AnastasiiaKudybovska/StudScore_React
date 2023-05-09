import React, { useEffect, useState } from 'react';
import { FaGem} from 'react-icons/fa';
import AxiosClient from '../AxiosClient';
import CustomAlert from '../CustomAlert';
import { format } from 'date-fns';

const StudentMarks = (props) => {
  const user = props.user ? props.user : null;
  const [marks, setMarks] = useState([]);

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertKey, setAlertKey] = useState(0);

  useEffect(() => {
    async function getStudentMarks() {
      if (user && user.id) {
        return AxiosClient.get(`/students/${user.id}/marks`)
        .then((response) => {
          if (response.status === 200) {
            setMarks(response.data);
          //  console.log(response.data) 
          }
        }) 
        .catch((error) => {
          console.log(error);
          setAlertMessage(error.response.data.error.message);
          setAlertSuccess(false);
          setAlertKey(alertKey + 1);
        })
    }
  }
    getStudentMarks();
  }, [user]);
    // const marks = [
    //     {
    //       date: "22.02.2023",
    //       subject: "Веб-технології та веб-дизайн",
    //       teacher: "Пшеничний О. Ю.",
    //       mark: "5.0"
    //     },
    //     {
    //       date: "21.02.2023",
    //       subject: "Фізичне виховання",
    //       teacher: "Зелікова Т. І.",
    //       mark: "2.0"
    //     },
    //     {
    //       date: "21.02.2023",
    //       subject: "Математичні методи дослідження операцій",
    //       teacher: "Шиманський В. М.",
    //       mark: "5.0"
    //     },
    //     {
    //       date: "19.02.2023",
    //       subject: "Теорія інформації",
    //       teacher: "Косаревич Р. Я.",
    //       mark: "5.0"
    //     },
    //     {
    //       date: "18.02.2023",
    //       subject: "Комп'ютерні мережі",
    //       teacher: "Нич Л. Я.",
    //       mark: "5.0"
    //     },
    //     {
    //       date: "21.02.2023",
    //       subject: "Теорія інформації",
    //       teacher: "Косаревич Р. Я.",
    //       mark: "3.0"
    //     }
    // ];
    // const formattedMarks = marks.map(mark => {
    //   const dateString = mark.date;
    //   const parts = dateString.split('-');
    //   const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;
    //   return {
    //     ...mark,
    //     date: formattedDate
    //   };
    // });
    const uniqueDates = [...new Set(marks.map(item => item.date))]; 
  return (
    <div className="main-stat-rat-subcont">
      <div className="rat-title-cont">
        <h2 className="h2-place">Оцінки</h2>
      </div>
      <hr />
      <div className="stud-rat" id="myMarks">
        {uniqueDates.map(date => (
          <div className="stud-mark-day" key={date}>
            <h2>{format(new Date(date), 'dd.MM.yyyy')}</h2>
            {marks
              .filter(item => item.date === date)
              .map((item) => (
                <div className="mark-day-box" id="mark-day-box" key={item.id_mark}>
                  <div className="mark-day-box-text">
                    <p>{item.subject.name}</p>
                    <p>{item.teacher.user.last_name} {item.teacher.user.first_name}</p>
                  </div>
                  <p className={`rating-mark-block ${item.mark < 3 ? 'bad-m-icon' : item.mark == 3 ? 'middle-m-icon' : ''}`}>
                    {item.mark}.0{" "}
                    <FaGem className="fa fa-gem"/> 
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
        {alertMessage && (
          <CustomAlert key={alertKey} message={alertMessage} success={alertSuccess} />
        )}
    </div>
  );
};

export default StudentMarks;