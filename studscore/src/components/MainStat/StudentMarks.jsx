import React from 'react';
import { FaGem} from 'react-icons/fa';

const StudentMarks = () => {

    const marks = [
        {
          date: "22.02.2023",
          subject: "Веб-технології та веб-дизайн",
          teacher: "Пшеничний О. Ю.",
          mark: "5.0"
        },
        {
          date: "21.02.2023",
          subject: "Фізичне виховання",
          teacher: "Зелікова Т. І.",
          mark: "2.0"
        },
        {
          date: "21.02.2023",
          subject: "Математичні методи дослідження операцій",
          teacher: "Шиманський В. М.",
          mark: "5.0"
        },
        {
          date: "19.02.2023",
          subject: "Теорія інформації",
          teacher: "Косаревич Р. Я.",
          mark: "5.0"
        },
        {
          date: "18.02.2023",
          subject: "Комп'ютерні мережі",
          teacher: "Нич Л. Я.",
          mark: "5.0"
        },
        {
          date: "21.02.2023",
          subject: "Теорія інформації",
          teacher: "Косаревич Р. Я.",
          mark: "3.0"
        }
    ];

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
            <h2>{date}</h2>
            {marks
              .filter(item => item.date === date)
              .map((item, index) => (
                <div className="mark-day-box" id="mark-day-box" key={index}>
                  <div className="mark-day-box-text">
                    <p>{item.subject}</p>
                    <p>{item.teacher}</p>
                  </div>
                  <p className={`rating-mark-block ${item.mark < 3 ? 'bad-m-icon' : item.mark == 3 ? 'middle-m-icon' : ''}`}>
                    {item.mark}{" "}
                    <FaGem className="fa fa-gem"/> 
                  </p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentMarks;