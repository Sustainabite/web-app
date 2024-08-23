// Type for validation rule functions
type ValidationRule = (input: string) => string | null;

/**
 * @description Cleans input by applying rules function to input string and logging any errors
 * @param input Text input
 * @param rules Array of functions to be applied to input to validate input
 * @returns 
 */
function cleanAndValidateInput(input: string, rules: ValidationRule[]) {
    let cleanedInput = input.trim(); // Basic cleaning, e.g., trimming
    
    const errors = rules.reduce<string[]>((acc, rule) => {
        //Calls rule functions on input
        const error = rule(cleanedInput);
        if (error) {
            acc.push(error);
        }
        return acc;
    }, []);
  
    return {
      cleanedInput,
      isValid: errors.length === 0,
      errors,
    };
}
  
//Checks if string is empty
function notEmpty(input: string) {
    return input ? null : 'This field cannot be empty';
}

//Checks email against reg ex
function isValidEmail(input: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input) ? null : 'Invalid email address';
}

//Checks minimum length
function minLength(length: number) {
    return (input: string) => input.length >= length ? null : `Must be at least ${length} characters long`;
}

export {minLength, isValidEmail, notEmpty, cleanAndValidateInput}