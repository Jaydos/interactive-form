/* 
Dynamically hide other job text field as well as bitcoin and paypal info 
so they will still be displayed when JS is disabled.
*/
$('#other-title').hide();
$('#bitcoin-info').hide();
$('#paypal-info').hide();

// Focus on the name input field by default.
$('#name').focus();

// Display 'Your job role' text field when 'Other' job role is selected.
$('#title').on('change', function(){
    if(this.value === 'other'){
        $('#other-title').show();
    };
});

// Hide 'Color' drop down menu until a T-Shirt design is selected.
$('#colors-js-puns').hide();

// Display corresponding options when a T-Shirt design is selected.
$('#design').on('change', function(){
    if(this.value === 'heart js'){
        $('.puns').hide();
        $('.heart').show();
        $('#color').val('tomato');    
        $('#colors-js-puns').show();
    } else if(this.value === 'js puns'){
        $('.heart').hide();
        $('.puns').show();
        $('#color').val('cornflowerblue');    
        $('#colors-js-puns').show();
    }
});

// Dynamically add a price display to the bottom of the activities section.
$('.activities').append('<p id="priceDisplay">Total Cost: $<span  id="cost">0</span></p>');

// Initialize activity variables.
const activities = $('.activities input');
const activityLabels = $('.activities label');

// Create number and day regex to extract info out of activity labels.
const timeRegEx = /\d+/g;
const dayRegEx = /\w+day/;

// Setup running total of activity costs.
let totalCost = 0;

// Hide price display until an activity is selected.
$('#priceDisplay').hide();

// Initialize empty arrays to store times, prices, and days in each activity for later use.
const activityNumbersArray = [];
const activityDaysArray = [];

for(let i = 0; i < activities.length; i++){
    activityNumbersArray.push(activityLabels[i].textContent.match(timeRegEx));
    activityDaysArray.push(activityLabels[i].textContent.match(dayRegEx));
};

// Listen for any change in activities section.
activities.on('change', function(e){

    // Store target index to use in the numbers and days array we set up earlier.
    let targetIndex = Array.from(activities).indexOf(e.target);

    /* 
    If the targeted activity is not the first on the list,
    disable or enable inputs that conflict with selected activity,
    as well as update total cost.
    */
    if (targetIndex !== 0){       
        if(this.checked){
            manipulateInputs(disableLabel, targetIndex, true);
            totalCost += parseInt(activityNumbersArray[targetIndex][2]); 
            } else {
                manipulateInputs(enableLabel, targetIndex, false);
                totalCost -= parseInt(activityNumbersArray[targetIndex][2]); 
            }

    /* 
    Else (if first activity was selected), update total cost.
    There is no need to enable or disable any activities as there aren't
    any conflicting activities with the main conference.
    */
    } else {
        if(this.checked){
            totalCost += 200;
        } else {
            totalCost -= 200;
        }     
    }

    // Update and display total cost to user if cost is more than $0.
    $('#cost')[0].textContent = totalCost.toString();
    if(totalCost !== 0){
        $('#priceDisplay').show();
    } else {
        $('#priceDisplay').hide();
    }
});

// When payment type is changed, display corresponding info/inputs and hide the rest.
$('#payment').on('change', function(e){
    switch(e.target.value) {
        case 'paypal':
            $('#paypal-info').show();
            $('#credit-card').hide();
            $('#bitcoin-info').hide();
            break;
        case 'credit card':
            $('#credit-card').show();
            $('#paypal-info').hide();
            $('#bitcoin-info').hide();
            break;
        case 'bitcoin':
            $('#bitcoin-info').show();
            $('#paypal-info').hide();
            $('#credit-card').hide();
    }
});

// Validate inputs when focus on field is lost.
$('#name').on('blur', function(){
    validateName($('#name'));
})

$('#mail').on('blur', function(){
    if($('#mail').val() === ''){
        $('#mail').attr('placeholder', "Email field cannot be empty");
    } 
    validateData($('#mail'), /^[^@]+@[^@.]+\.[a-z]+$/i);
})

$('#cc-num').on('blur', function(){
    validateData($('#cc-num'), /^(\d{13,16})$/);
})

$('#zip').on('blur', function(){
    validateData($('#zip'), /^(\d{5})$/);
})

$('#cvv').on('blur', function(){
    validateData($('#cvv'), /^(\d{3})$/);
})

// Validate checkboxes each time a checkbox is clicked.
$('.activities input').on('click', function(){
    validateCheckboxes();
});

/* 
Upon submitting form, validate all inputs again. 
*/
$('#submit').on('click', function(e){
    validateName($('#name'));
    validateData($('#mail'), /^[^@]+@[^@.]+\.[a-z]+$/i);
    validateCheckboxes();

    // Only validate credit card details if the credit card option is selected.
    if($('#payment').val() === 'credit card'){
        validateData($('#cc-num'), /^(\d{13,16})$/);
        validateData($('#zip'), /^(\d{5})$/);
        validateData($('#cvv'), /^(\d{3})$/);
    }

    // If there is any .error class visible, prevent submission and add review message under submit button.
    if($('.error').is(':visible')){
        e.preventDefault();
        $('#review-error').show();
    }
});