import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="160"
                    image={require('../../../img/lap3.jpg')}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lists
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Part of project tracking and managing inside boards where You can create Lists to separate or combine your tasks according to their relations.
                        Crucial component of our effort.You can entitle them according to your projects,plans requirements.So keep calm and enjoy the management in creative way.
           </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
              <br />
            </CardActions>
        </Card>
    );
}
