import React, {useState} from 'react';
import { CreateGrid } from './CreateGrid';
import { Grid } from '../features/Grid';
import { Win } from './Win'
import { Loss } from './Loss'

export const Game = () => {
    const [gameState, setGameState] = useState('load')

    if (gameState === 'load') {
        return (
                <CreateGrid setGameState={setGameState} />
        )
        } else if (gameState === 'play') {
          return (
                    <Grid setGameState={setGameState} />
          )
        } else if (gameState === 'win') {
            return (
                <Win setGameState={setGameState} />
            )
        } else if (gameState === 'loss') {
            return (
                <Loss setGameState={setGameState} />
            )
        }

}