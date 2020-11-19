import * as Yup from 'yup';

//General Form Validations

export const stringRequiredValidator = Yup.string()
  .nullable()
  .required('Required field');
export const stringValidator = Yup.string();

export const stringNullableValidator = Yup.string().nullable();

export const numberRequiredValidator = Yup.number()
  .nullable()
  .typeError('Must be a number')
  .positive('Must be a positive number')
  .required('Required field');

export const numberValidator = Yup.number()
  .nullable()
  .typeError('Must be a number')
  .positive('Must be a positive number');

export const nameValidator = Yup.string()
  .required('Required name field')
  .matches(/^[a-zA-ZàáèéìíòóùúüñÀÁÈÉÌÍÒÓÙÚÜ ,.'-]+$/u, {
    message: 'Name must contain only letters',
    excludeEmptyString: true,
  });

export const nameWithNumbersValidator = Yup.string()
  .nullable()
  .matches(/^[a-zA-Z0-9àáèéìíòóùúüñÀÁÈÉÌÍÒÓÙÚÜ ,.'-]+$/u, {
    message: 'Name must contain only letters or numbers',
    excludeEmptyString: true,
  });

export const emailValidator = Yup.string()
  .required('Email is required')
  .email('Invalid Email');

export const timeRequiredValidator = Yup.date()
  .typeError('Must be a valid time HH-MM- (AM / PM)')
  .nullable()
  .required('Required field');

export const urlValidator = Yup.string().matches(
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi,
  {
    message: 'Invalid URL',
    excludeEmptyString: true,
  },
);

//AddUser Custom Validations

export const passwordValidator = Yup.string()
  .required('Password is required')
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    'Must contain 6 characters: one uppercase, one lowercase, one number and one special character',
  )
  .min(6);

export const confirmPasswordValidator = Yup.string()
  .required('A matching password is required')
  .oneOf([Yup.ref('password'), null], 'Password must match');

//AddCandidate Custom Validations

export const referralValidator = Yup.string().matches(
  /^[a-zA-ZàáèéìíòóùúüñÀÁÈÉÌÍÒÓÙÚÜ ,.'-]+$/u,
  {
    message: 'Name must contain only letters',
    excludeEmptyString: true,
  },
);

export const phoneRequiredValidator = Yup.string()
  .matches(/^[0-9]+$/, 'Must be only numbers')
  .min(10, 'Must be exactly 10 digits')
  .max(10, 'Must be exactly 10 digits')
  .required('Phone is required');

//AddJob Custom Validations

const salaryRegex = /^[+]?[0-9]{1,3}(?:[0-9]*(?:[.,][0-9]{2})?|(?:,[0-9]{3})*(?:\.[0-9]{2})?|(?:\.[0-9]{3})*(?:,[0-9]{2})?)$/;

export const salaryRequiredValidator = Yup.string()
  .matches(salaryRegex, 'Invalid format!')
  .required('Required field');

export const salaryUpperRequiredValidator = Yup.string()
  .required('Required field')
  .matches(salaryRegex, 'Invalid format!')
  .test('greater-than', 'This salary must be higher', function (
    value,
  ) {
    return value && this.parent.salarylower
      ? Number(value.replace(/[^0-9]/, '')) >
          Number(this.parent.salarylower.replace(/[^0-9]/, ''))
      : false;
  });

export const salaryValidator = Yup.string()
  .nullable()
  .matches(salaryRegex, 'Invalid format!');

export const jobTitleRequiredValidator = Yup.string()
  .nullable()
  .required('Required field')
  .matches(/^[a-zA-ZàáèéìíòóùúüñÀÁÈÉÌÍÒÓÙÚÜ ,.'-]+$/u, {
    message: 'Job must contain only letters',
    excludeEmptyString: true,
  });

//Rich Text
export const richTextRequiredValidator = Yup.string()
  .max(65535)
  .required('Required field');

//Note validation
export const noteRequiredValidator = Yup.object({
  noteComment: Yup.string()
    .min(12, 'Note too short')
    .max(65535, 'Note too long')
    .required("Note can't be empty"),
});
