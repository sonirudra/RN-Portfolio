import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {COLORS} from '../theme/Colors';
import JDGameService, {
  Matrix,
  JDEventNames,
  UpdateMatrixActions,
  MatrixItem,
} from '../services/JDGameService';

interface UpdateMatrixProps {
  rowIndex: number;
  colIndex: number;
}

const MainScreen = () => {
  const route = useRoute();
  const {userInput} = route.params;

  const GameService = new JDGameService(userInput);

  const [matrix, setMatrix] = useState<Matrix>(GameService.matrix);

  useEffect(() => {
    const handleMatrixChange = (data: Matrix) => {
      console.log('Matrix updated:', data);
      setMatrix(data);
    };

    // GameService.on(JDEventNames.UPDATE_MATRIX, handleMatrixChange);
    GameService.addListener(JDEventNames.UPDATE_MATRIX, handleMatrixChange);

    return () => {
      GameService.off(JDEventNames.UPDATE_MATRIX, handleMatrixChange);
    };
  }, []);

  const handleUpdateMatrix = (props: UpdateMatrixProps) => {
    const {rowIndex, colIndex} = props;

    GameService.updateMatrix(UpdateMatrixActions.UPDATE_OCCUPIED_BOX, {
      col: colIndex,
      row: rowIndex,
    });
  };

  const renderMatrixItem = (
    item: MatrixItem,
    colIndex: number,
    rowIndex: number,
  ) => {
    console.log('render matrix item ==>>', item);
    if (item.isOccupied) {
      return (
        <TouchableOpacity
          key={colIndex}
          style={[styles.item, {backgroundColor: COLORS.primary}]}
          onPress={() => handleUpdateMatrix({colIndex, rowIndex})}>
          <Text>{item.id}</Text>
        </TouchableOpacity>
      );
    } else if (item.isblocked) {
      return (
        <TouchableOpacity
          key={colIndex}
          style={[styles.item, {backgroundColor: COLORS.red}]}
          onPress={() => handleUpdateMatrix({colIndex, rowIndex})}>
          <Text>{item.id}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          key={colIndex}
          style={styles.item}
          onPress={() => handleUpdateMatrix({colIndex, rowIndex})}>
          <Text>{item.id}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {matrix.map((rowItems, rowIndex) => {
        return (
          // <ScrollView horizontal >
          <View key={rowIndex} style={{flexDirection: 'row'}}>
            {rowItems.map((colItem, colIndex) => {
              return <>{renderMatrixItem(colItem, colIndex, rowIndex)}</>;
            })}
          </View>
          // </ScrollView>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  item: {
    height: 40,
    width: 60,
    margin: 5,
    backgroundColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    color: COLORS.text,
    paddingVertical: 10,
    alignItems: 'center',
    marginVertical: 12,
  },
  btnLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});

export default MainScreen;
