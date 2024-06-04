const customStyles = {
    control: base => ({
        ...base,
        border: 0,
        // This line disable the blue border
        boxShadow: 'none',
    }),
    control: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'pointer',
        backgroundColor: '#333',
        borderRadius: '10px',
        color: 'white',
        border: 0,
        boxShadow: 'none',
        width: '9rem',
        textAlign: 'left',
        height: '6vh',
        '&:hover': {
            border: 0,
            boxShadow: 'none',
        },
        '@media (max-width: 600px)': { // Mobile styling example
            width: '12.5w', // Adjust width for mobile screens
            height: '5vh', // Adjust height for mobile screens
        },
    }),
    placeholder: (baseStyles, state) => ({
        ...baseStyles,
        textAlign: 'center',
        color: state.isDisabled ? '#888888' : 'white',  // Change color based on isDisabled
        width: '100%',  // Ensure the single value spans the full width
        fontSize: '0.8rem',
    }),
    singleValue: (baseStyles) => ({
        ...baseStyles,
        color: 'white',
        textAlign: 'center',
        width: '100%',  // Ensure the single value spans the full width
    }),
    menu: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: '#222222',
        borderRadius: '20px',
        width: '100%',
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        color: state.isDisabled ? '#888888' : 'white',  // Change color based on isDisabled
        textAlign: 'center',
        whiteSpace: 'normal',   // Enable text wrapping
        wordWrap: 'break-word', // Break long words
        backgroundColor: state.isFocused ? '#444444' : '#222222',
        fontSize: '0.8rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#444444',
        },
    }),
    valueContainer: (baseStyles) => ({
        ...baseStyles,
        justifyContent: 'center',
        width: '100%',  // Ensure the value container spans the full width
    }),
    indicatorSeparator: (baseStyles) => ({
        ...baseStyles,
        display: 'none',
    }),
    dropdownIndicator: (baseStyles, state) => ({
        ...baseStyles,
        color: state.isDisabled ? '#888888' : 'white',  // Change color based on isDisabled
        display: 'none',
    }),
    input: (baseStyles) => ({
        ...baseStyles,
        color: 'white', // Text color while typing
        width: '100%',  // Ensure the value container spans the full width
        whiteSpace: 'normal',   // Enable text wrapping
        wordWrap: 'break-word', // Break long words
        fontSize: '0.8rem', // Adjust font size for mobile screens
    })
};

export default customStyles;