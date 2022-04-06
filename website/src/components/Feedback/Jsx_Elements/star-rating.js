import React, { useState } from 'react';
import { MDBContainer, MDBRating } from 'mdbreact';

const RatingPage = () => {
  const [basic] = useState([
    {
      tooltip: 'Very Bad'
    },
    {
      tooltip: 'Poor'
    },
    {
      tooltip: 'Ok',
      choosed: true
    },
    {
      tooltip: 'Good'
    },
    {
      tooltip: 'Excellent'
    }
  ]);

  return (
    <MDBContainer>
      <MDBRating data={basic} />
    </MDBContainer>
  );
};

export default RatingPage;