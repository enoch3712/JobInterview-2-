import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route } from "react-router-dom";
import Home from './Home';
import { Dialog, DialogTitle, Grid } from '@mui/material';
import Question from './DTOs/Question';
import QuestionsService from './services/QuestionsService';
import Context from './Context';
import ErrorDto from './DTOs/Error';
import Quiz from './Quiz';
import Result from './Result';

const NotFound = () => (<div>Not Found</div>)

function App() {

  const [questions, setQuestion] = useState<Question[]>([]);
  const [error, setError] = useState<ErrorDto>({} as ErrorDto);
  const [containsError, setContainsError] = useState<boolean>(false);

  // react route only works on route components.
  // the history push should be of course, here 
  // it should be void, but the return is used to push the history
  const getQuestions = async () => {
    try {
      let response = await QuestionsService.getAnswers()
      setQuestion(response)
      return true;
    }
    catch(e) {
      setError(e as ErrorDto)
      setContainsError(true)
      return false;
    }
  }

  return (
    <div className="App">
      <Dialog onClose={() => {setError({} as ErrorDto); setContainsError(false)}} open={containsError}>
        <DialogTitle>{error.title}</DialogTitle>
        {error.message}
      </Dialog> 
      <Context.Provider value={{questions, openQuiz: getQuestions}}>
        <Router>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/quiz" element={<Quiz/>}></Route>
                <Route path="/result" element={<Result/>}></Route>
                <Route path="*" element={<NotFound/>}></Route>
              </Routes>
            </Grid>
          </Grid>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
