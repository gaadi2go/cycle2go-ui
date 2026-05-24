import React from 'react';

const FaqPage: React.FC = () => {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: '0 auto' }}>
      <h3>Terms and Conditions:</h3>
      <ul>
        <li>Complete amount to be paid before renting the bicycle.</li>
        <li>No security deposit.</li>
        <li>ID and Address proof are mandatory.</li>
        <li>
          Transportation will be provided, if the bicycle is rented for more
          than 3+ days. Transportation charges applicable based on the
          kms/distance.
        </li>
        <li>
          Customer shall be held responsible for any damage to the Bicycle or
          Accessories while it is under rental period.
        </li>
        <li>
          Full amount needs to be paid in case of theft/Lost of bicycle or
          accessories.
        </li>
        <li>
          Cancellations received 24hrs before your start date will not be
          refunded.
        </li>
      </ul>
    </div>
  );
};

export default FaqPage;
