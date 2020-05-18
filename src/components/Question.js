import React from 'react';

const Question = (props) => {
  console.log(props.jwt);
  return(
    <div className='Question'>
      Today's Question
    </div>
  );
}

export default Question;