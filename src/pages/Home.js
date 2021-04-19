import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { nanoid } from 'nanoid';
import Cover from '../components/background/Background';
import socket from '../io';

const Home = () => {
  const [error, setError] = useState(false);
  const history = useHistory();
  const onPlayClick = () => {
    socket.emit('play', { roomId: nanoid() }, (response) => {
      const { status, roomId } = response;

      if (status === 'GAME_CREATED') {
        history.push({
          pathname: `/${roomId}`,
        });

        return;
      }

      setError(true);
    });
  };

  return(
    <Cover>
      <h1
        style={{ textAlign: 'center', padding: '24px 0'}}
      >
        { error ? 'Error creating the game': 'ROCK PAPER SCISSORS'}

      </h1>

      <div style={{ maxWidth: '45rem', margin: '0 auto'}}>
        <p style={{
             fontSize: '18px',
             lineHeight: '29.12px',
             marginBottom: '24px',
             textAlign: 'center'
            }}
        >
          Tired of discussions where you think your frenemy is not right?
          Perhaps your colleague thinks the same about you... I see something clear,
          be honest with yourself, you won&apos;t get an agreement on this, altought
          yo will never approve the other one arguments, this no sense, mad, silly discussion
          has to end, let&apos;s have some fun and bet a round of beers you drink this stupid
          game.
        </p>

        <button
          type='button'
          style={{
            backgroundColor: '#8e44ad',
            border: 'none',
            boxShadow: '6px 11px 25px -5px rgba(236,240,241,1)',
            color: '#ecf0f1',
            cursor: 'pointer',
            display: 'block',
            fontSize: '24px',
            margin: '0 auto',
            padding: '12px 24px',
            width: '80%',

          }}
          onClick={onPlayClick}
        >
          Play

        </button>
      </div>
    </Cover>
  )
}

export default Home;