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
          image={require('../../../img/lap5.jpg')}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Privacy
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Yeah Privacy is also a main subject here is taskbuddy, board's owner has the right to add only his team members or any one from public. So this way privacy is upto Owner of the Board 
            whether he wanna keep it limited to his team as happens in organizations or add public members for some general plans.           </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
          <br />
      </CardActions>
    </Card>
  );
}
