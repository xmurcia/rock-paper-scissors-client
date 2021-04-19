/* eslint-disable react/prop-types */
import React from 'react';
import Choice from '../choice/Choice';

const ChoiceList = ({ choices }) => (
  <>
    { choices.map((choice) => (
      <Choice
        key={choice.id}
        id={choice.id}
        img={choice.img}
        sendChoice={choice.sendChoice}
        value={choice.value}
      />
    ))}
  </>
    );

export default ChoiceList;