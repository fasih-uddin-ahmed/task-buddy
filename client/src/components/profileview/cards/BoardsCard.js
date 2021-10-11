import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

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
          image={require('../../../img/205644.jpg')}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Board
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Here you can create boards and through them you can manage your projects, track your progress through different things.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link
          to="/home"
          className="btn btn-lg btn-danger"
          style={{
            width: "120px",
            height: "40px",
            paddingBottom: "7px",
            paddingTop: "-5px",
            fontSize: "17px",
            marginLeft: "105px"
          }}
        >
          Boards
      </Link>
      </CardActions>
    </Card>
  );
}
