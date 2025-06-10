// import * as yup from 'yup';

// // Shared regex + messages
// export const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$/;
// const nameMsg = 'Letters, spaces, apostrophes or hyphens · min 2 chars';

// // Export the schema
// const customerSchema = yup.object({
//   first_name: yup
//     .string()
//     .trim()
//     .required('First name is required')
//     .matches(NAME_REGEX, nameMsg),
//   last_name: yup
//     .string()
//     .trim()
//     .required('Last name is required')
//     .matches(NAME_REGEX, nameMsg),
//   mail: yup
//     .string()
//     .trim()
//     .required('Email is required')
//     .email('Enter a valid email'),
// });

// export default customerSchema;