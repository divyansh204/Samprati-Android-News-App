// https://documenter.getpostman.com/view/3479169/Szf7zncp?version=latest#236e4205-de53-41e0-bfc2-f17d396f9741

export const categories = [
    {
      code: "",
      // pic: "https://img.icons8.com/fluent/96/000000/hard-working.png",
      // pic: "https://i.postimg.cc/BtH8Qjy1/business.png",
      pic: "https://i.postimg.cc/YqtqQgn8/business.png",
      name: "business",
    },
    {
      code: "",
      // pic: "https://img.icons8.com/fluent/96/000000/movie-projector.png",
      // pic: "https://i.postimg.cc/crWvKsyk/Entertainment.png",
      pic: "https://i.postimg.cc/yY6sDKxb/Entertainment.png",
      name: "entertainment",
    },
    {
      code: "",
      // pic: "https://img.icons8.com/fluent/96/000000/stethoscope.png",
      // pic: "https://i.postimg.cc/HVtVXfTY/Health.png",
      pic: "https://i.postimg.cc/MKr2Xjhn/Health.png",
      name: "health",
    },
    {
      code: "",
      // pic: "https://img.icons8.com/fluent/96/000000/microscope.png",
      // pic: "https://i.postimg.cc/8F7c8cMc/Science.png",
      pic: "https://i.postimg.cc/htzFmtBp/Science.png",
      name: "science",
    },
    {
      code: "",
      // pic: "https://img.icons8.com/fluent/96/000000/trophy.png",
      // pic: "https://i.postimg.cc/NKJFPmyZ/sports.png",
      pic: "https://i.postimg.cc/FRxwvfys/sports.png",
      name: "sports",
    },
    {
      code: "",
      // pic: "https://img.icons8.com/fluent/96/000000/artificial-intelligence.png",
      // pic: "https://i.postimg.cc/PL0xdHQ4/technology.png",
      pic: "https://i.postimg.cc/mkXqc0pv/technology.png",
      name: "technology",
    },
  ];
  
  export const country = [
    {
      code: "in",
      name: "India",
    },
    {
      code: "us",
      name: "USA",
    },
    {
      code: "au",
      name: "Australia",
    },
    {
      code: "ru",
      name: "Russia",
    },
    {
      code: "fr",
      name: "France",
    },
    {
      code: "gb",
      name: "United Kingdom",
    },
  ];
  
  export const sources = [
    {
      id: "bbc-news",
      name: "BBC News",
      pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/BBC_News_2019.svg/1200px-BBC_News_2019.svg.png",
    },
    {
      id: "cnn",
      name: "CNN",
      pic: "https://bankimooncentre.org/wp-content/uploads/2020/06/cnn-logo-square.png",
    },
    {
      id: "fox-news",
      name: "Fox News",
      pic: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Fox_News_Channel_logo.svg/768px-Fox_News_Channel_logo.svg.png",
    },
    {
      id: "google-news",
      name: "Google News",
      pic: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Google_News_icon.png",
    },
    {
      id: "abc-news",
      name: "ABC News",
      pic: "https://th.bing.com/th/id/OIP.WQyhfid1iolHog_dFK3eYwHaHa?pid=ImgDet&rs=1",
    },
    {
      id: "google-news-in",
      name: "Google News (India)",
      pic: "https://i.pinimg.com/originals/d0/31/fb/d031fb9e9a8d0685fe3e335833910c55.jpg",
    },
    {
      id: "the-hindu",
      name: "The Hindu",
      pic: "https://planetabled.com/wp-content/uploads/2019/07/The-Hindu-Logo.jpg",
    },
    {
      id: "the-times-of-india",
      name: "The Times of India",
      pic: "https://pbs.twimg.com/profile_images/1282407636/icon_512.png",
    },

  ];

  export const local = [
    {
      id: "local-news",
      name: "Local News",
      pic: "https://thumbs.dreamstime.com/b/local-news-25068677.jpg",
    },
  ];
  
  export const BASE_URL = "https://newsapi.org/v2/top-headlines?";
  const API_KEY = 'b385c30f07a54651a200a81ea8b02ff3';
  
  export const getNewsAPI = (category) => {
    return `${BASE_URL}country=in&apikey=${API_KEY}&category=${category}`;
  };
  
  export const getSourceAPI = (source) => {
    return `${BASE_URL}sources=${source}&apikey=${API_KEY}`;
  };