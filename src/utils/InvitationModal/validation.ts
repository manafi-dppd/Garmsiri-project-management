export const validateFileFormat = (
  file: File | null,
  fieldName: string,
  t: (key: string, params?: Record<string, any>) => string
): string[] => {
  const errors: string[] = [];
  if (file) {
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    if (!allowedFormats.includes(file.type)) {
      errors.push(t("invalidFileFormat", { fieldName }));
    }
  }
  return errors;
};

export const validateInvitation = (
  firstName: string,
  lastName: string,
  mobile: string,
  endDate: string,
  today: string,
  selectedPositions: number[],
  file: File | null,
  t: (key: string, params?: Record<string, any>) => string
): string[] => {  
  let errors: string[] = [];

  errors = [...errors, ...validateField(firstName, "firstName", false, 20, t)];
  errors = [...errors, ...validateField(lastName, "lastName", true, 20, t)];
  errors = [...errors, ...validateMobile(mobile, t)];
  errors = [...errors, ...validateEndDate(endDate, today, t)];
  errors = [...errors, ...validatePositionSelection(selectedPositions, t)];
  errors = [...errors, ...validateFileFormat(file, "attachment", t)];

  return errors;
};

function validateField(
  value: string,
  fieldName: string,
  isRequired: boolean,
  maxLength: number,
  t: (key: string, params?: Record<string, any>) => string
): string[] {
  const errors: string[] = [];
  const letterRegex = /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\s]*$/;

  if (isRequired && !value) {
    errors.push(t("required", { fieldName }));
  } else if (value && !letterRegex.test(value)) {
    errors.push(t("onlyLettersAndSpaces", { fieldName }));
  } else if (value.length > maxLength) {
    errors.push(t("maxLength", { fieldName, maxLength }));
  }
  return errors;
}

function validateMobile(
  mobile: string,
  t: (key: string, params?: Record<string, any>) => string
): string[] {
  const errors: string[] = [];
  const phoneRegex = /^09\d{9}$/;

  if (!phoneRegex.test(mobile)) {
    errors.push(t("invalidMobile"));
  }
  return errors;
}

function validateEndDate(
  endDate: string,
  today: string,
  t: (key: string, params?: Record<string, any>) => string
): string[] {
  const errors: string[] = [];

  if (endDate && new Date(endDate) < new Date(today)) {
    errors.push(t("invalidEndDate"));
  }
  return errors;
}

function validatePositionSelection(
  selectedPositions: number[],
  t: (key: string, params?: Record<string, any>) => string
): string[] {
  const errors: string[] = [];

  if (selectedPositions.length === 0) {
    errors.push(t("positionRequired"));
  }
  return errors;
}
