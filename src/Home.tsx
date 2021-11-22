import { Box, Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import Context from './Context';

export default function Home() {

    const { Consumer } = Context;
    const navigate = useNavigate();

    const startGame = async (openQuiz : () => Promise<boolean>) => {
        let res = await openQuiz();
        
        if(res) {
            navigate("/quiz");
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
                                    Welcome to Trivia Challenge!
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="h4" gutterBottom component="div">
                                    You will be presented with 10 True or False questions.
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="h5" gutterBottom component="div">
                                    Can you score 100%?
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Button disableRipple onClick={() => startGame(data.openQuiz)}>
                                    <Typography style={{color: "black"}}>
                                        BEGIN
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>   
            }
            </Consumer>
        </React.Fragment>
    );
}