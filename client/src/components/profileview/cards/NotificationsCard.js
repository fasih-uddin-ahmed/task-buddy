import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NotificationDialog from '../notifications/notificationDialog';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard({ noti }) {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="160"
                    image={require('../../../img/lap1.jpg')}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Notifications
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Here you can see the recent activities related to you, like if someone add you to board,cards or your reminders for your daily tasks.
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <NotificationDialog noti= {noti}/>
            </CardActions>
        </Card>
    );
}
