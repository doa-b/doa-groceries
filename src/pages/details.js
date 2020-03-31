import React, {useEffect, useState} from 'react';
import {HuePicker} from 'react-color'
import {compose} from "redux";
import {connect} from "react-redux";
import {AuthUserContext} from '../components/Session';
import withStyles from '@material-ui/core/styles/withStyles'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {updateObject} from "../shared/utility";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from "@material-ui/core/FormControl";
import MyFreeSoloInput from "../components/ui/MyFreeSoloInput/MyFreeSoloInput";
import { newDoaData, days} from "../bootstrap/data";
import MenuItem from '@material-ui/core/MenuItem';
import {withFirebase} from "../components/Firebase";
import Item from "../components/Item/Item";
import * as actions from "../store/actions";
import Button from "@material-ui/core/Button";
import ImageUpploadWithCallback from "../components/FileUpload/ImageUpploadWithCallback";
import {Select} from "@material-ui/core";



const styles = theme => ({
    root: {
        padding: theme.spacing(1),
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
        paddingBottom: theme.spacing(1),
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',

    }

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
    ({classes, location, data, onAddItem, onSaveItem, onDeleteItem,
         firebase, history}) => {
        const [categories, setCategories] = useState([]);
        const [stores, setStores] = useState([]);
        const [buttonLabel, setButtonLabel] = useState('Save');
        const [ischanged,setIsChanged] = useState(false);
        const [item, setItem] = useState(
            {
                id: '',
                name: '',
                category: '',
                store: '',
                day: '',
                amount: '',
                color: '#123478',
                textColorIsBlack: true,
                imageUrl: ''
            });

        useEffect(() => {
            if (location && location.state && location.state.item) {
                setItem(updateObject(item, location.state.item));
                setCategories(findGroups(data, 'category'));
                setStores(findGroups(data, 'store'));
                // when adding a new item into existing category, load category data
                if (location.state.item.category && !location.state.item.name) {
                    console.log('ONLY THE CATEGORY');
                    categoryChangedHandler(location.state.item.category)
                }
                if (location.state.item.id) setButtonLabel('update');
                console.log(location.state.item)
            }
        }, [location]);

        const inputChangedHandler = (event) => {
            setItem(updateObject(item, {[event.target.id]: event.target.value}));
            setIsChanged(true);
        };

        const dayChangedHandler = (event) => {
            console.log('EVENT');
            console.log(event.target);
            setItem(updateObject(item, {[event.target.name]: event.target.value}));
            //setIsChanged(true);
            console.log(item)
        };

        const autoCompleteChangedHandler = (id, value) => {
            setItem(updateObject(item, {[id]: value}));
            setIsChanged(true);
        };

        const categoryChangedHandler = (value) => {
            let newValue = {category: value};
            let catData = null;
            for (let category in newDoaData) {
                catData = newDoaData[category];
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
            setItem(updateObject(item, newValue));
            setIsChanged(true);
        };

        const onSubmit = () => {
            if (item.id) {
                onSaveItem(firebase, item)
            } else {
                delete item.id;
                onAddItem(firebase, item)
            }
            history.goBack()
        };

        const deleteItem = () => {
         onDeleteItem(firebase, item);
            history.goBack()
        };

        const colorChangedHandler = (color) => {
            setItem(updateObject(item, {color: color.hex}));
            setIsChanged(true);
        };

        const textColorChangedHandler = () => {
            setItem(updateObject(item, {textColorIsBlack: !item.textColorIsBlack}));
            setIsChanged(true);
        };

        const setNewImage = (value) => {
            console.log('setting new image');
            setItem(updateObject(item,{imageUrl: value}));
            firebase.saveItem(item.id,{imageUrl: value})
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
                            { item.id &&
                            <ImageUpploadWithCallback
                                imageUrl={item.imageUrl}
                                fileName=''
                                saveUrl=''
                                urlCallback={setNewImage}
                            />}
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
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        id="amount"
                                        label="amount"
                                        variant="outlined"
                                        value={item.amount}
                                        onChange={inputChangedHandler}
                                    />
                                </Grid>
                                <Grid item xs={8}>
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
                            <Grid container spacing={2} style={{marginTop: 8}}>
                                <Grid item xs={6}>
                                    <FormControl variant="filled" fullWidth>
                                        <InputLabel id="day-label">Day</InputLabel>
                                    <Select
                                        id="day"
                                        name="day"
                                        labelId="day-label"
                                        variant="outlined"
                                        value={item.day}
                                        onChange={dayChangedHandler}
                                    >
                                        {days.map(day => (
                                            <MenuItem key={day} value={day}>{day}</MenuItem>
                                            ))}

                                    </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                    <div>
                                        <MyFreeSoloInput
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
                                        setValue={categoryChangedHandler}/>
                                </Grid>
                            </Grid>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Button
                                disabled={!ischanged}
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={onSubmit}
                            >
                                {buttonLabel}
                            </Button>
                            {(buttonLabel === "update") &&
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                                onClick={deleteItem}
                            >
                                Delete
                            </Button>}
                        </div>
                    </>
           );
    });

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddItem: (firebase, item) => dispatch(actions.addItem(firebase, item)),
        onSaveItem: (firebase, item) => dispatch(actions.saveItem(firebase, item)),
        onDeleteItem: (firebase, item) => dispatch(actions.deleteItem(firebase, item))
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withFirebase)
(Details);