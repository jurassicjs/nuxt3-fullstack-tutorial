type FormValidation = {
 hasErrors: boolean
 errors?: Map<string, { message: InputValidation; }>
 loggedIn?: boolean
};

type FormErrors = {
 field: string
 message: InputValidation
}