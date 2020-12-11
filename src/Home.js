import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { nanoid } from 'nanoid';
import socket from './io';

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
    <div>
      <h1>{ error ? 'Error creating the game': 'SOCKET IO ROCK PAPER SCISSORS'}</h1>
      <button type='button' onClick={onPlayClick}>Play</button>
    </div>
  )
}

export default Home;