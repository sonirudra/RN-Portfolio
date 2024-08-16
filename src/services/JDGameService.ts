import EventEmitter from 'events';

export interface MatrixItem {
  id: number;
  isOccupied: boolean;
  isblocked: boolean;
}

export type Matrix = MatrixItem[][];

interface MatrixItemIndex {
  row: number;
  col: number;
}

export enum UpdateMatrixActions {
  UPDATE_BLOCKED_BOX,
  UPDATE_OCCUPIED_BOX,
}

export enum JDEventNames {
  UPDATE_MATRIX = 'updateMatrix',
}

class JDGameService extends EventEmitter {
  private size: number;
  public matrix: Matrix;

  constructor(size: number) {
    super();
    this.size = size;
    this.matrix = this.generateEmptyMatrix();
    this.updateMatrix(UpdateMatrixActions.UPDATE_BLOCKED_BOX, {row: 0, col: 0});
  }

  private generateRadndomIndexForBlockedBox(): MatrixItemIndex {
    let row = Math.floor(Math.random() * this.size);
    let col = Math.floor(Math.random() * this.size);

    while (this.matrix[row][col].isblocked) {
      row = Math.floor(Math.random() * this.size);
      col = Math.floor(Math.random() * this.size);
    }

    return {row, col};
  }

  private generateEmptyMatrix(): Matrix {
    let innerArray = [];
    let outerArray: Matrix = [];

    const defaultMatrixItem: MatrixItem = {
      isblocked: false,
      isOccupied: false,
      id: 0,
    };

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        innerArray.push(defaultMatrixItem);
      }
      outerArray.push(innerArray);
      innerArray = [];
    }

    return outerArray;
  }

  public updateMatrix(_for: UpdateMatrixActions, at: MatrixItemIndex) {
    let tempMatrix = Array.from(this.matrix);
    console.log("🚀 ~ JDGameService ~ updateMatrix ~ tempMatrix ~ before:", tempMatrix)
    switch (_for) {
      case UpdateMatrixActions.UPDATE_BLOCKED_BOX:
        const blockedBoxIndex = this.generateRadndomIndexForBlockedBox();
        console.log("blockedBoxIndex ===>>> ", blockedBoxIndex);
        
        let itemBloak = tempMatrix[blockedBoxIndex.row][blockedBoxIndex.col];
        tempMatrix[blockedBoxIndex.row][blockedBoxIndex.col] = {...itemBloak, isblocked: true};

        console.log("🚀 ~ JDGameService ~ updateMatrix ~ tempMatrix ~ after:", tempMatrix)

        this.emit(JDEventNames.UPDATE_MATRIX, tempMatrix);
        this.matrix = tempMatrix;
        break;
        
        case UpdateMatrixActions.UPDATE_OCCUPIED_BOX:
          let matrixItem = tempMatrix[at.row][at.col]
          console.log("🚀 ~ JDGameService ~ updateMatrix ~ matrixItem:", matrixItem)
          
          if (!matrixItem.isOccupied) {
            tempMatrix[at.row][at.col] = { ...tempMatrix[at.row][at.col], isOccupied: true};
          }
          console.log("🚀 ~ JDGameService ~ updateMatrix ~ tempMatrix ~ after:", tempMatrix)
          this.emit(JDEventNames.UPDATE_MATRIX, tempMatrix);
        this.matrix = tempMatrix;
        break;

      default:
        break;
    }
  }
}

export default JDGameService;
