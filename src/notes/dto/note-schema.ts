import * as yup from 'yup';

export const noteSchema = yup.object({
  name: yup.string().required(),
  date: yup.date().default(() => new Date()),
  content: yup.string().required(),
  category: yup.string().required(),
  archived: yup.boolean().required(),
});
