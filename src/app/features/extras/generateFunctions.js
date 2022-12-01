export const calcMines = (size, level) => {
    let square = Math.pow(size, 2);
    if (level === 'easy') {
        return Math.ceil(square * 0.12);
    } else if (level === 'hard') {
        return Math.ceil(square * 0.21);
    } else {
        return Math.ceil(square * 0.16);
    }
}

export const makeMineArray = async (info) => {
    const total = Math.pow(info.size, 2);
    info.total = total;
    const mineCount = info.mines;
    const arr = [];
    do {
        let num = Math.floor(Math.random() * (total + 1));
        if (!arr.includes(num)) {
            arr.push(num)
        }
    } while (arr.length < mineCount);
    if (arr.length === mineCount) {
        arr.sort((a, b) => a - b);
        info.mineArray = arr;
        return info
    } else {
        console.log('I broke...mines')
    }
  }
  
  
export  const makeCellObjs = async (info) => {
    const size = info.size;
    const total = info.total;
    const mineArray = info.mineArray;
    const data = [];
    for (let i = 0; i < total; i++) {
        let obj = {
            id: i,
            row: Math.floor(i / size),
            column: i % size,
            // opened: false,
            // flagged: false,
        }
        if(mineArray.includes(i)) {
            obj.mined = true;
        } else {
            obj.mined = false;
        }
        
        data.push(obj);
    }
    if (data.length === total) {
        return [info, data]
    } else {
        console.log('I broke...cells')
    }
    
  }
  
export const findNeighbours = async (responseArray) => {
    const data = responseArray[1];
    const info = responseArray[0];
    const size = info.size;
    const isChecked = [];
    for (let i = 0; i < data.length; i++) {
        const id = data[i].id;
        const row = data[i].row;
        const column = data[i].column;
        const neighbours = [];
        if (row > 0) {
            if (column > 0) {
                // console.log(id - (size + 1))
                neighbours.push(id - (size + 1));
            }
            // console.log(id - size)
            neighbours.push(id - size);
            if (column < (size - 1)) {
                // console.log(id - (size - 1))
                neighbours.push(id - (size - 1));
            }
        }
        if (column > 0) {
            // console.log(id - 1)
            neighbours.push(id - 1);
        }
        if (column < (size - 1)) {
            // console.log(id + 1)
            neighbours.push(id + 1);
        }
        if (row < (size - 1)) {
            if (column > 0) {
                // console.log(id + (size - 1))
                neighbours.push(id + (size - 1));
            }
            // console.log(id + size)
            neighbours.push(id + size);
            if (column < (size - 1)) {
                // console.log(id + (size + 1))
                neighbours.push(id + (size + 1));
            }
        } 
        // end of if checks
        data[i].neighbours = neighbours;
        // data[i].hiddenNeighbours = neighbours;
        isChecked.push(i);
    }
    if (isChecked.length === data.length) {
        // console.log(data)
        return [info, data]
    } else {
        console.log('I broke...neighbours')
    }
  }
  
export  const countMinedNeighbours = async (responseArray) => {
    const data = responseArray[1];
    // const info = responseArray[0];
    const mines = responseArray[0].mineArray;
    // const size = responseArray[0].size;
        const isChecked = [];
        for (let i = 0; i < data.length; i++) {
            const cell = data[i];
            if (cell.mined) {
                cell.minedNeighbourCount = null;
                isChecked.push(i);
            } else {
                // let neighbours = cell.neighbours;
                let mined = cell.neighbours.filter(n => mines.includes(n));
                cell.minedNeighbourCount = mined.length;
                isChecked.push(i);
            }
        }
        if (isChecked.length === data.length) {
            // console.log(data)
            return data;
        } else {
            console.log('I broke...count')
        }
  }

export const reduceCells = (array) => {
    array.reduce((filtered, arr) => {
        if (arr.opened) {
          let result = arr.id;
          filtered.push(result);
        }
        return filtered;
      }, []);
  }
  