import styled  from 'styled-components'
import React from 'react';
import rpsbackground from '../../assets/rps-background.svg';

const CoverStyles = styled.div`
  height: 100vh;
  position: relative;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 16px;

  &:before {
    content: '';
    background: url(${rpsbackground});
    height: 100%;
    opacity: .15;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const Cover = ({ children }) => (
  <CoverStyles>
    <div style={{position: 'relative'}}>
      { children }
    </div>
  </CoverStyles>
)

export default Cover;
