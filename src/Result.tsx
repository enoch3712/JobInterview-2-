import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import Context from './Context';
import Question from './DTOs/Question';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

export default function Result() {

    const { Consumer } = Context;

    const navigate = useNavigate();
    
    const getRightAnswers = (questions : Question[]) => {
        let count = 0;

        // this could be done with a function inside the Question with this logic
        // nullable(q.answer?) is useful when switching routes 
        questions.forEach(q => {
            if(q.correct_answer.toLocaleLowerCase() === q.answer?.toString())
                ++count;
        })

        return count;
    }

    const renderQuestionsResult = (questions : Question[]) => {
        return (
            <Grid container spacing={3}>
            {
                questions.map(q => {
                    return (
                    <>
                        <Grid item xs={1}>
                        {
                            q.correct_answer.toLocaleLowerCase() === q.answer?.toString() ? 
                                <AddIcon style={{color: "gray"}}/> : 
                                <RemoveIcon style={{color: "gray"}}/>
                        }
                        </Grid>
                        <Grid item xs={1}/>
                        <Grid item xs={10}>
                            <Typography style={{color: "gray"}}>{q.question}</Typography>
                        </Grid>
                    </>
                    )
                })
            }
            </Grid>
        )
    }

    //duplicated code. Given the simplicty is not a crime
    const repeatQuiz = async (openQuiz : () => Promise<boolean>) => {
        let res = await openQuiz();
        
        if(res) {
            navigate("/home");
        }
    }

    return (
        <React.Fragment>
            <Consumer>
            {data => 
                <Container maxWidth="sm">
                    <Box sx={{ bgcolor: '#e0e0e0', height: '100%' }}>
                        <Grid container spacing={5} alignItems="center" justifyContent="center">
                            <Grid item xs={10}>
                                <Typography variant="h4" gutterBottom component="div" style={{fontWeight:'bold'}}>
                                    You Scored
                                </Typography>
                                <Typography variant="h4" gutterBottom component="div" style={{fontWeight:'bold'}}>
                                    {getRightAnswers(data.questions)}/{data.questions.length}
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                            {
                                renderQuestionsResult(data.questions)
                            }
                            </Grid>
                            <Grid item xs={11}>
                                <Button 
                                    variant="text" 
                                    onClick={() => repeatQuiz(data.openQuiz)}
                                    style={{ color: "black", fontWeight: "bold" }}>
                                    PLAY AGAIN?
                                </Button>
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