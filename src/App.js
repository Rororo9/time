import React, {useState} from 'react';
import "./css/index.css";

const DateTime = (props) => {
  return (
      <p className="date">{props.date}</p>
  )
}

const Video = (props) => {
  const UpdateDateTime = DateTimePretty(DateTime, props.date);
  return (
      <div className="video">
        <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        <DateTime date={props.date} />
        <UpdateDateTime />
      </div>
  )
}

const VideoList = (props) => {
  return props.list.map(item => <Video url={item.url} date={item.date} />);
}

const DateTimePretty = (date) => {
  const updateDate = (correctDate) => {
    let difDate = new Date() - new Date(correctDate);
    if (difDate > 86400000) {
      const result = Math.round(difDate / 86400000);
      return `${result} ${formingDate(result, ["день", "дня", "дней"])} назад`;
    } else if (difDate > 3600000) {
      const result = Math.round(difDate / 3600000);
      return `${result} ${formingDate(result, ["час", "часа", "часов"])} назад`;
    } else {
      const result = Math.round(difDate / 3600);
      return `${result} ${formingDate(result, ["минута", "минуты", "минут"])} назад`;
    }
  };

  const formingDate = (number, arrTitles) => {
    const decCache = [];
    const decCases = [2, 0, 1, 1, 1, 2];
    const decOfNum = (number, titles) => {
      if (!decCache[number]) {
        decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
      }
      return titles[decCache[number]];
    };
    return decOfNum(number, arrTitles);
  };

  return () => {
    return <DateTime date={updateDate(date)} />;
  };
};

const App = () => {
  const [list, setList] = useState([
    {
      url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-07-31 13:24:00'
    },
    {
      url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-03-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-02-03 23:16:00'
    },
    {
      url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-03 12:10:00'
    },
    {
      url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2018-01-01 16:17:00'
    },
    {
      url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
      date: '2017-12-02 05:24:00'
    },
  ]);

  return (
      <VideoList list={list} />
  );
}

export default App;
