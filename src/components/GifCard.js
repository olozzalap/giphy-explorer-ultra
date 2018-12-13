import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ShareIcon from '@material-ui/icons/Share';
import classnames from 'classnames';

const cardWidth = 345;
const styles = theme => ({
  card: {
    width: cardWidth,
    margin: 15
  },
  media: {
    width: "100%"
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

class GifCard extends Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
    this.handleExpandClick = this.handleExpandClick.bind(this);
  }
  handleExpandClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  render() {
    const { classes } = this.props;
    const item = this.props.item;
    console.log(item.user && item.user.display_name || item.username);
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <img
            className={classes.media}
            src={item.images.downsized.url}
            title={item.title}
            style={{height: ((cardWidth / item.images.downsized.width) * item.images.downsized.height) + "px"}}
          />
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={this.handleExpandClick}>Expand Details</Button>
          <IconButton aria-label="Share">
            <a href={item.bitly_url} target="_blank" title="permalink">
              <ShareIcon />
            </a>
          </IconButton>
          <IconButton
             className={classnames(classes.expand, {
               [classes.expandOpen]: this.state.expanded,
             })}
             onClick={this.handleExpandClick}
             aria-expanded={this.state.expanded}
             aria-label="Show more"
           >
             <ExpandMoreIcon />
           </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h5">
              {item.title}
            </Typography>
            <Typography variant="h6" style={{padding: "7px 0"}}>
              By: 
              <a href={item.user && item.user.profile_url} style={{margin: "0 5px"}}>
               {item.user && item.user.display_name || item.username}
              </a>
              <img src={item.user && item.user.avatar_url} 
                  title={"avatar for " + (item.user && item.user.display_name || item.username)}
                  style={{height: "40px", margin: "0 7px -11px"}}/>
           </Typography>
           <Typography variant="subtitle1">
            Rating <em>{item.rating}</em>
           </Typography>
           <Typography variant="subtitle1">
            Posted <em>{item.import_datetime}</em>
           </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

GifCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GifCard);