const getErrorMessageByField = (field: string) => {
  switch (field) {
    case 'year':
      return 'Year is too low. Please enter a value greater than 1900';
    default:
      return 'Something went wrong. Please try later.';
  }
};

export const getErrorMessageByCode = (code?: string) => {
  switch (code) {
    case 'FILE_INVALID':
      return 'File upload failed';
    default:
      return 'Something went wrong. Please try later.';
  }
};

export default getErrorMessageByField;
