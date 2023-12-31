import React, { useContext, useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../context/UserContext';
import "./Home.css";
import axios from "axios";
import Question from "../../Components/Question/Question";

const Home = () => {
  // const [userData, setUserData] = useContext(UserContext);
   const [userData] = useContext(UserContext);
  const [allQuestions, setAllQuestions] = useState([]);
   const [search, setSearch] = useState("");
  const navigate = useNavigate();



  const Questions = async () => {
    try {
      const questionRes = await axios.get(
        `${process.env.REACT_APP_base_url}/api/questions`
      );
     
      setAllQuestions(questionRes.data.data);
    } catch (err) {
      console.log("problem", err);
    }
  };


  
  useEffect(() => {
    if (!userData.user) navigate("/login");
    Questions();
  }, [userData.user, navigate]);


  // console.log(allQuestions.user_name);


  const handleClick = (e) => {
    e.preventDefault();
    navigate("/ask-question");
  };

  

    const handledelet = (e) => {
          e.preventDefault();
      navigate("/YourQuestion");
    };

  return (
    <div className="container my-5 home-container">
      <div className="d-flex mb-5 justify-content-between">
        <button className="ask_button" onClick={handleClick}>
          Ask Question
        </button>

        <input
          className="question_title searchTitle d-block my-2 w-10"
          type="text"
          // name="search"
          Placeholder="Search Questions"
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="YourQuestion" onClick={handledelet}>
          YourQuestion
        </button>
        <h4>Welcome: {userData.user?.display_name}</h4>
      </div>
      <h3>Questions</h3>
      <div>
        {allQuestions
          .filter((question) => {
            if (search === "") {
              return question;
            } else if (
              question.question.toLowerCase().includes(search.toLowerCase())
            ) {
              return question;
            }
          })

          .map((question) => (
            <div key={question.post_id}>
              <hr />
              <Link
                to={`questions/${question.post_id}`}
                className="text-decoration-none text-reset"
              >
                <Question
                  question={question.question}
                  userName={question.user_name}
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
