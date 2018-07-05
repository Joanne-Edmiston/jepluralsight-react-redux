import React, {Proptypes} from 'react';

const SelectInput = ({name, label, onChange, defaultOption, value, error, options}) => {

    return (
      <div className = "form-group">
        <label htmlFor={name}>{label}</label>
        <div className="field">
            { /* Note, value is set here rather than on the option */}
            <select 
                name={name}
                value={value}
                onChange={onChange}
                className="form-control">

                <option value="">{defaultOption}</option>
                {options.map((option) => {
                    return <option key={option.value} value={option.value}>{option.text}</option>;
                })}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>  
    );
};

SelectInput.propTypes = {
    name: Proptypes.string.isRequired,
    label: Proptypes.string.isRequired,
    onChange: Proptypes.function .isRequired,
    defaultOption: Proptypes.string,
    value: Proptypes.string,
    error: Proptypes.string,
    options: Proptypes.options
};

export default SelectInput;