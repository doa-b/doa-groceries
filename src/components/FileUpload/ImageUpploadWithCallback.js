import React, {Component} from 'react';
import {
    Uppload, Camera, en, Local, Crop,Pixabay
} from 'uppload';
import 'uppload/dist/uppload.css'
import 'uppload/dist/themes/light.css';

import {withFirebase} from '../Firebase';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import {Button} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import {pixabayKey} from "../../kluisje";

const styles = theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white
        }
    },
    root: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    image: {
        width: 150,
        height: 150
    }
});

let defaultImage = '';

class ImageUpploadWithCallback extends Component {

    constructor(props) {
        super(props);
        if (this.props.imageUrl) {
            defaultImage = this.props.imageUrl
        }
        this.state = {
            url: defaultImage,
            ready: false
        };
    }

    componentDidMount() {
        this.uppload = new Uppload({
            maxSize: [150, 150],
            compression: 0.6, // between 1 (highest quality to 0 highest compression
            lang: en,
            defaultService: 'local',
            uploader: (file, updateProgress) =>
                this.props.firebase.firebaseUploader(file, updateProgress, this.props.fileName, this.props.saveUrl)
        });
        // Camera plugin  is built for non-mobile devices (like laptops with webcams)
        // since the native file picker (for Uppload, that is the Local service)
        // allows users to click photos in all major mobile operating systems.
        this.uppload.use([
            // services order matters
            new Local(),
            new Camera(),
            new Pixabay(pixabayKey),
            // effects order matters
            new Crop(),
        ]);
    }


    open() {
        // set listener for result
        this.uppload.on('upload', url => {
            this.setState({url});
          // we could also save the URL to our database here
            //  this.props.firebase.user(this.props.userId).update({imageUrl: url})
            // send the URL back in your callback
           this.props.urlCallback(url)
        });
        // open uploader
        this.uppload.open();
        // auto navigate to service
        this.uppload.navigate('local');
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Avatar
                    onClick={this.open.bind(this)}
                    variant='square'
                    className={classes.image}
                    alt='profile picture'
                    src={this.state.url}/>
                <Button color='primary' onClick={this.open.bind(this)}>
                    Select another Image</Button>
            </div>
        );
    }
}

export default compose (
    withFirebase,
    withStyles(styles)
)(ImageUpploadWithCallback)