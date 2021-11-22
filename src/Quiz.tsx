import { Box, Button, Container, Fade, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Context from './Context';
import QuestionDto from './DTOs/Question';
import { useNavigate } from 'react-router';

const Question = (props: {question: string}) => 
{
    return (
        <Fade in timeout={300}>
            <Box 
                sx={{
                    minHeight: 300,
                    minWidth: 300,
                    border: 1,
                }}
            >
                <Typography variant="h5" component="div" style={{marginTop: "20%"}}>
                    {props.question}
                </Typography>
            </Box>
        </Fade>
    )
}

export default function Quiz() {

    const [questionIdx, setQuestionIdx] = useState(0);

    const { Consumer } = Context;
    const navigate = useNavigate();

    const setAnswer = (option : boolean, question : QuestionDto, length : number) => {
        question.answer = option;

        if(questionIdx < length-1)
            setQuestionIdx(1+questionIdx);
        else
        {
            navigate("/result");
        }
    }

    return (
        <React.Fragment>
            <Consumer>
            {data => 
                <Container maxWidth="sm">
                    <Box sx={{ bgcolor: '#e0e0e0', height: '100vh' }}>
                        <Grid container spacing={10} alignItems="center" justifyContent="center">
                            <Grid item xs={10}>
                                <Typography variant="h4" gutterBottom component="div" style={{fontWeight:'bold'}}>
                                    {data.questions[questionIdx].category}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={() => setAnswer(true, data.questions[questionIdx], data.questions.length)}>Yes</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button onClick={() => setAnswer(false, data.questions[questionIdx] , data.questions.length)}>No</Button>
                            </Grid>
                            <Grid item xs={11}>
                                {
                                    /*hack to force the fade*/
                                    [data.questions[questionIdx]].map(_ => <Question key={Math.random()} question={data.questions[questionIdx].question}/>)
                                }
                                <Typography variant="h5" component="div" style={{marginTop: 20}}>
                                    {questionIdx+1} of {data.questions.length}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}/>
                        </Grid>
                    </Box>
                </Container>   
            }
            </Consumer>
        </React.Fragment>
    );
}