export function getValidationProps(
  showError?: boolean,
  validationMessage?: string
) {
  /* Compatible with RNUILib components */
  return {
    validateOnBlur: true,
    validateOnStart: true,
    validateOnChange: true,
    validate: () => false, // Is always invalid
    enableErrors: showError, // So the error can be displayed using any logic
    validationMessage: validationMessage,
  };
}
