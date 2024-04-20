'use server';

// create a Server Action that is going to be called when the form is submitted

export const createBill = (formData: FormData) => {
  // extract the user input data from the form and convert it to an object
  const rawFormData = {
    memberId: formData.get('memberId'),
    amount: formData.get('amount'),
    description: formData.get('description'),
    status: formData.get('status'),
    dueDate: formData.get('dueDate'),
  };
  // Test it out: log the rawFormData to the console
  console.log(rawFormData);
};
