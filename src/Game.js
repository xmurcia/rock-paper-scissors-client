import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import socket from './io';

const Game = () => {
  const { roomId } = useParams();

  // TODO Change the state by useReducer
  const [isWaitingForOpponent, setWaitingForOpponent] = useState(false);
  const [error, setError] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isWaitingOpponentChoice, setIsWaitingOpponentChoice] = useState(false);
  const [gameFinish, setGameFinish] = useState('');

  // TODO Improve the handler
  const handleJoinRoomCallback = ({status, message}) => {
    if (status === 'OK') {
      switch (message) {
        case 'WAITING_OPPONENT_IN_ROOM':
          setWaitingForOpponent(true);
          break;
        default:
          return;
      }
    }

    if (status === 'ERROR') {
      switch (message) {
        case 'UNEXISTING_GAME':
          setError('The game you are looking for does not exist');
          break;
        case 'FULL_GAME':
          setError('There are already two players in this match');
          break;
        default:
          setError('Sorry, something went wrong');
      }
    }
  }

  useEffect(() => {
    socket.emit('joinRoom', roomId, handleJoinRoomCallback);
  }, [roomId]);

  // TODO Split the event handlers into another files
  socket.on('startGame', () => setIsGameStarted(true));
  socket.on('resetGame', () => {
    setIsGameStarted(false);
    setGameFinish('');
  });

  socket.on('finishGame', (result) => {
    setIsWaitingOpponentChoice(false);
    let finish;

    if (result.winner === socket.id) {
      finish = <div>You win!!!</div>;
    } else if (result.winner === 'TIE'){
      finish = <div>Its a tie!!!!</div>;
    } else {
      finish = <div>You loose!!!</div>
    }

    setGameFinish(finish);
  });

  const sendChoice = (choice) => {
    socket.emit('choice', { choice, roomId, socketId: socket.id }, (callback) => {
      if (callback.status === 'OK' && callback.message === 'WAITING_OPPONENTS_CHOICE') {
        setIsWaitingOpponentChoice(true);
      }
    })
  }

  return (
    <div>
      { isWaitingForOpponent && !isGameStarted && 'Waiting for your opponent'}
      { error }
      { gameFinish || isGameStarted &&
      (
      <div>
        <p>Choose your choice</p>
        <input
          type='radio'
          name='choice'
          onClick={(e) => sendChoice(e.target.value)}
          value='paper'
        />
        {' '}
        <span>Paper</span>
        <input
          type='radio'
          name='choice'
          onClick={(e) => sendChoice(e.target.value)}
          value='scissors'
        />
        {' '}
        <span>Scissors</span>
        <input
          type='radio'
          name='choice'
          onClick={(e) => sendChoice(e.target.value)}
          value='rock'
        />
        {' '}
        <span>Rock</span>
      </div>
)}
      { isWaitingOpponentChoice && <div>Waiting your opponent response</div>}

    </div>
);
}

export default Game;