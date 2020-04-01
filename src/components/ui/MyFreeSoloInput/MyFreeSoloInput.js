import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();
// options must be array of { title: option1} objects
const MyFreeSoloInput = ({label, optionsArray, value, setValue, style}) => {

    // convert optionsArray props to array of objects with title
    const options = [];
    optionsArray.map((option) => options.push({title: option}));

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (newValue && newValue.inputValue) {
                    setValue(newValue.inputValue);
                    return;
                }
                if (newValue) setValue(newValue.title);
            }}
            filterOptions={(options, params) => {
                const filtered = filter(options, params);

                if (params.inputValue !== '') {
                    filtered.push({
                        inputValue: params.inputValue,
                        title: `Add "${params.inputValue}"`,
                    });
                }

                return filtered;
            }}
            id={label}
            options={options}
            getOptionLabel={(option) => {
                // e.g value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                if (option.inputValue) {
                    return option.inputValue;
                }
                return option.title;
            }}
            renderOption={(option) => option.title}
            style={style}
            freeSolo
            blurOnSelect
            renderInput={(params) => (
                <TextField {...params} label={label} variant="outlined"/>
            )}
        />
    );
};

export default MyFreeSoloInput
