import React from 'react';

const SubmittedForm = ({ submittedData }) => {
  return (
    <div>
      <h3>Submitted Form Data</h3>
      <pre>{JSON.stringify(submittedData, null, 2)}</pre>
    </div>
  );
};

export default SubmittedForm;
