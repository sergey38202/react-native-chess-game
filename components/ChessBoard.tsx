import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Position {
  row: number;
  col: number;
}

const ChessBoard: React.FC = () => {
  const [horsePosition, setHorsePosition] = useState<Position>({ row: 0, col: 0 });
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);

  const handleSquarePress = (row: number, col: number): void => {
    const moves = calculatePossibleMoves(row, col);
    setPossibleMoves(moves);
    setHorsePosition({ row, col });
  };

  const calculatePossibleMoves = (row: number, col: number): Position[] => {
    const possibleMoves: Position[] = [
      { row: row - 2, col: col - 1 },
      { row: row - 2, col: col + 1 },
      { row: row - 1, col: col - 2 },
      { row: row - 1, col: col + 2 },
      { row: row + 1, col: col - 2 },
      { row: row + 1, col: col + 2 },
      { row: row + 2, col: col - 1 },
      { row: row + 2, col: col + 1 },
    ];

    return possibleMoves.filter(
      (move) => move.row >= 0 && move.row < 8 && move.col >= 0 && move.col < 8
    );
  };

  return (
    <View style={styles.board}>
      {[...Array(8)].map((_, row) => (
        <View key={row} style={styles.row}>
          {[...Array(8)].map((_, col) => {
            const isHorse = horsePosition.row === row && horsePosition.col === col;
            const isPossibleMove = possibleMoves.some(
              (move) => move.row === row && move.col === col
            );

            return (
              <TouchableOpacity
                key={col}
                style={[
                  styles.square,
                  { backgroundColor: isPossibleMove ? '#aaffaa' : isHorse ? '#ffaa00' : '#fff' },
                ]}
                onPress={() => handleSquarePress(row, col)}
              >
                {isHorse && <Text style={styles.horse}>🐴</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  board: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  horse: {
    fontSize: 20,
  },
});

export default ChessBoard;