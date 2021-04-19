import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import socket from '../io';
import Cover from '../components/background/Background';
import ChoiceList from '../components/choiceList/ChoiceList';
import paper from '../assets/paper.svg';
import rock from '../assets/rock.svg';
import scissors from '../assets/scissors.svg';

const Game = () => {
  const { roomId } = useParams();

  // TODO Change the state by useReducer
  const [isWaitingForOpponent, setWaitingForOpponent] = useState(false);
  const [error, setError] = useState(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isWaitingOpponentChoice, setIsWaitingOpponentChoice] = useState(false);
  const [gameFinish, setGameFinish] = useState('');

  const sendChoice = (choice) => {
    socket.emit('choice', { choice, roomId, socketId: socket.id }, (callback) => {
      if (callback.status === 'OK' && callback.message === 'WAITING_OPPONENTS_CHOICE') {
        setIsWaitingOpponentChoice(true);
      }
    })
  }

  const choices = [
    { id: 1, img: paper, sendChoice, value: 'paper'},
    { id: 2, img: rock, sendChoice, value: 'rock'},
    { id: 3, img: scissors, sendChoice, value: 'scissors'}
  ];

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
      finish = (
        <h3 style={{ textAlign: 'center', padding: '24px 0'}}>
          You win!!!
        </h3>
);
    } else if (result.winner === 'TIE'){
      finish =  (
        <h3 style={{ textAlign: 'center', padding: '24px 0'}}>
          Its a Tie!!
        </h3>
);
    } else {
      finish =  (
        <h3 style={{ textAlign: 'center', padding: '24px 0'}}>
          You loose!!!
        </h3>
)
    }

    setGameFinish(finish);
  });

  return (
    <Cover>
      { isWaitingForOpponent &&
        !isGameStarted && (
        <h3 style={{ textAlign: 'center', padding: '24px 0'}}>
          Pass the
        </h3>
      )}
      { error }
      {gameFinish ||
        isGameStarted &&
        !isWaitingOpponentChoice &&
        <ChoiceList choices={choices} />}
      { isWaitingOpponentChoice && (
        <h3 style={{ textAlign: 'center', padding: '24px 0'}}>
          Waiting your opponent response
        </h3>
      )}
    </Cover>
);
}

export default Game;