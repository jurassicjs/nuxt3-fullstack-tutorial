type FormValidation = {
 hasErrors: boolean
 errors?: Map<string, { check: InputValidation; }>
};

type FormErrors = {
 field: string
 check: InputValidation
}