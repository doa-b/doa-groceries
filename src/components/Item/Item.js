import React from 'react';
import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/InfoOutlined';
import {Icon} from "@material-ui/core";


const styles = theme => ({
    root: {},
    paper: {
        display: 'flex',
        flexDirection: 'row',
        padding: '10, 0, 10, 0',
        marginBottom: 5,
    },
    image: {
        maxHeight: 50,
        marginRight: 20
    },
    info: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    details: {
        marginLeft: 'auto'
    },
    greyOut: {
        opacity: '0.4',
    },
    activeText: {
        color: 'white',
        fontWeigth: 'bold'
    }
});

const PaperCmp = (props) => {
    if (props.item.mustBuy) {
        console.log(props);
        return (
            <Paper {...props} elevation={20} style={{backgroundColor: props.item.color}}>
                {props.children}
            </Paper>
        )
    }
    return (
        <Paper {...props} variant="outlined" style={{backgroundColor: '#eee'}}>
            {props.children}
        </Paper>
    )
};


/**
 * Created by Doa on 29-3-2020.
 */
const Item = withStyles(styles)(
    ({classes, item, detailsClicked, displayDetails, clickToBuy, isBuying}) => {

        if (isBuying && !item.mustBuy) return null;

        return (
            <PaperCmp className={classes.paper} item={item}>
                <img className={clsx(classes.image, {[classes.greyOut]: !item.mustBuy})}
                     src={item.imageUrl}
                     onClick={clickToBuy}/>
                <div className={classes.info} onClick={clickToBuy} style={{color: item.mustBuy ? (item.textColorIsBlack ? 'black' : 'white') : 'black'}}>
                    <Typography variant='body1'>
                        {(item.amount) ? item.amount + ' ' + item.name : item.name}
                    </Typography>
                    {(displayDetails && (item.store || item.day))
                        ? <Typography variant='caption'>
                            {item.store + ' - ' + item.day}
                        </Typography>
                        : null}
                </div>
                <div className={classes.details}>
                    <IconButton onClick={detailsClicked}>
                        <InfoIcon/>
                    </IconButton>
                </div>
            </PaperCmp>
        );
    });

export default Item;