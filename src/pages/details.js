import React, {useEffect, useState} from 'react';
import withStyles from '@material-ui/core/styles/withStyles'
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    root: {
        padding: theme.spacing(2)
    },
});
/**
 * Created by Doa on 29-3-2020.
 */
const Details = withStyles(styles)(
    ({classes, location}) => {
        const [item, setItem] = useState(
            {
                id: '',
                name: '',
                category: '',
                store: '',
                day: ''
            });


        useEffect(() => {
            if (location && location.state) {
                setItem(location.state.item);
            }
        }, [location]);


        return (
            <Container component='main' maxWidth='sm'>
                <CssBaseline/>
                <div className={classes.root}>
                {Object.entries(item).map(([key, value]) => (
                        <TextField
                            key={key}
                            id={key}
                            label={key}
                            value={value}
                            variant='outlined'/>
                    )
                )}
                </div>
            </Container>);
    });

export default Details;