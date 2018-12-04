
// Functions to disable or enable activity inputs.
const disableLabel = input => {
    input.style.textDecoration = 'line-through';
    input.style.color = 'lightgray';
};
const enableLabel = input => {
    input.style.textDecoration = '';
    input.style.color = '';
};

// Function to manipulate activities that match targeted activity.
const manipulateInputs = (func, targetIndex, trueFalse) => {
    for(let i = 0; i < activities.length; i++){
        if(!activities[i].checked){
            if(activityDaysArray[i] == activityDaysArray[targetIndex][0]){
                if(activityNumbersArray[i][0] == activityNumbersArray[targetIndex][0]){
                    func(activityLabels[i]);
                    activities[i].disabled = trueFalse;
                }
                
            }
        }   
    } 
};

// Generic function to use across all text/email/number inputs to display error or OK message.
const displayErrorOrValid = (input, errorOrOk) => {  
        if (errorOrOk === 'error'){
            input[0].style.border = '2px solid red';
            $(input.prev()).find('#ok').hide();
            if(!input[0].labels[0].innerHTML.includes('error')){    
                input.prev().append('<span class="error">Invalid</span>');
            } else {
                $(input.prev()).find('.error').show();
            }  
        } else {
            input[0].style.border = '2px solid rgb(41, 219, 41)';
            $(input.prev()).find('.error').hide();
        if(!input[0].labels[0].innerHTML.includes('ok')){
            input.prev().append('<span id="ok">OK</span>');
        } else {
            $(input.prev()).find('#ok').show();
        }      
    }
};

// Function to check if name is not blank.
const validateName = input => {
    if(input[0].value.length === 0){
        (input.attr('placeholder', 'Name field cannot be empty'))
        displayErrorOrValid(input, 'error');
    } else {
        displayErrorOrValid(input, 'ok');
    }
};

// Generic function to validate input data and display either error or OK message on passed input.
const validateData = (input, regex) => {
    if(regex.test(input[0].value)){
        displayErrorOrValid(input, 'ok');
    } else {
        displayErrorOrValid(input, 'error');
    }
};

// Function to confirm at least one checkbox is selected. Display error message if not.
const validateCheckboxes = () => {
    if ($('.activities :checkbox:checked').length === 0){
        if($('.activities').find('.error').length === 0){
            $('.activities').prepend('<p class="error">PLEASE SELECT AT LEAST ONE CHECKBOX');
        } else {
            $('.activities').find('.error').show();
        }
    } else {
        $('.activities').find('.error').hide();
    }
};


