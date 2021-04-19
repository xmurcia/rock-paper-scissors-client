/* eslint-disable react/prop-types */
import React from 'react';
import styled, {keyframes} from 'styled-components';

const slideDown = keyframes`
  0% {
    transform: translateY(-100px) rotateX(150deg);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`

const SlideDownChoice = styled.div`
  animation: 1s ${slideDown} ease-out;
  animation-delay: calc(var(--i) * 300ms);
  animation-fill-mode: both;
  cursor: pointer;
  width: 100px;
`

const Choice = ({ sendChoice, value, id, img }) => (
  <label htmlFor={id}>
    <SlideDownChoice style={{'--i': id }}>
      <img src={img} alt={value} style={{ width: '100%'}} />
    </SlideDownChoice>
    <input
      type='radio'
      id={id}
      name='choice'
      onClick={(e) => sendChoice(e.target.value)}
      value={value}
      hidden
    />
  </label>
);

export default Choice;