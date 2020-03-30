import React, {useEffect, useState} from 'react';
import {HuePicker} from 'react-color'
import {compose} from "redux";
import {connect} from "react-redux";
import withStyles from '@material-ui/core/styles/withStyles'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {updateObject} from "../shared/utility";
import MyFreeSoloInput from "../components/ui/MyFreeSoloInput/MyFreeSoloInput";
import { newDoaData} from "../bootstrap/data";

import {withFirebase} from "../components/Firebase";
import Item from "../components/Item/Item";

const styles = theme => ({
    root: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    values: {
        padding: theme.spacing(2)
    },
    soloInput: {
        paddingTop: theme.spacing(2)
    },
    colorPicker: {
        paddingBottom: theme.spacing(3),
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
});

const findGroups = (arrayList, groupName) => {
    const groups = [];
    arrayList.map((item) => {
        if (groups.includes(item[groupName])) return
        groups.push(item[groupName])
    });
    return groups
};
/**
 * Created by Doa on 29-3-2020.
 */
const Details = withStyles(styles)(
    ({classes, location, data}) => {
        const [categories, setCategories] = useState([]);
        const [stores, setStores] = useState([]);
        const [item, setItem] = useState(
            {
                id: '',
                name: '',
                category: '',
                store: '',
                day: '',
                amount: '',
                color: '#123478',
                textColorIsBlack: true
            });

        const days = [
            '',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
        ];

        useEffect(() => {
            if (location && location.state) {
                setItem(location.state.item);
                setCategories(findGroups(data, 'category'));
                setStores(findGroups(data, 'store'));
                console.log(categories)
            }
        }, [location]);

        const inputChangedHandler = (event) => {
            console.log(event.target);
            setItem(updateObject(item, {[event.target.id]: event.target.value}));
        };

        const dayChangedHandler = (event, value) => {
            setItem(updateObject(item, {day: value}));

        };

        const autoCompleteChangedHandler = (id, value) => {
            setItem(updateObject(item, {[id]: value}));
        };

        const categoryChangedHandler = (id, value) => {
            let newValue = {[id]: value};
            let catData = null;
            for (let category in newDoaData) {
                catData = newDoaData[category]
                if (catData.name === value) {
                    newValue = {
                        category: value,
                        color: catData.color,
                        textColorIsBlack: catData.textColorIsBlack,
                        imageUrl: catData.image
                    };
                    break;
                }
            }
            console.log(newValue);
            setItem(updateObject(item, newValue));
        };

        const onSubmit = () => {
            console.log(item)
        };

        const colorChangedHandler = (color) => {
            setItem(updateObject(item, {color: color.hex}));
        };

        const textColorChangedHandler = () => {
            setItem(updateObject(item, {textColorIsBlack: !item.textColorIsBlack}));
        };

        return (
            <>
                <CssBaseline/>
                <div className={classes.root}>
                    <div style={{width: '100%'}}>
                        <Item item={updateObject(item, {mustBuy: true})}
                              displayDetails={true}
                              isBuying={false}/>
                    </div>
                    <div className={classes.colorPicker}>
                        <HuePicker
                            width='100%'
                            color={item.color}
                            onChangeComplete={colorChangedHandler}/>
                        <div className={classes.textColor}>
                            Text colour: white
                            <Switch
                                checked={item.textColorIsBlack}
                                color='primary'
                            onChange={textColorChangedHandler}/>
                                black
                        </div>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                id="amount"
                                label="amount"
                                variant="outlined"
                                value={item.amount}
                                onChange={inputChangedHandler}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                fullWidth
                                id="name"
                                label="name"
                                variant="outlined"
                                value={item.name}
                                onChange={inputChangedHandler}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Autocomplete
                                id="day"
                                options={days.map(day => day)}
                                value={item.day || ''}
                                blurOnSelect
                                onChange={(event, value) => dayChangedHandler(event, value)}
                                renderInput={(params) => (
                                    <TextField {...params} label="choose a day" margin="normal" variant="outlined"/>
                                )}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                <MyFreeSoloInput
                                    style={{paddingTop: 16}}
                                    label="store name"
                                    optionsArray={stores}
                                    value={item.store}
                                    setValue={autoCompleteChangedHandler.bind(this, 'store')}/>
                            </div>

                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MyFreeSoloInput
                                style={{paddingTop: 16}}
                                label="Category"
                                optionsArray={categories}
                                value={item.category}
                                setValue={categoryChangedHandler.bind(this, 'category')}/>
                        </Grid>
                    </Grid>
                </div>
                <Container component='main' maxWidth='sm'>
                    <div className={classes.values}>
                        {Object.entries(item).map(([key, value]) => (
                                <TextField
                                    key={key}
                                    id={key}
                                    label={key}
                                    value={value}
                                    onChange={inputChangedHandler}
                                    variant='outlined'/>
                            )
                        )}

                    </div>
                </Container>
            </>);
    });

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
};

export default compose(
    connect(mapStateToProps),
    withFirebase)
(Details);