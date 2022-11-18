export const getCells = async (size, i) => {
    return {
        id: i,
        row: Math.floor(i / size),
        column: i % size,
        opened: false,
        flagged: false,
        mined: false,
    }
}

export const randomMines = async (size, mines) => {
    const total = Math.pow(size, 2)
    const arr = [];
    do {
        let num = Math.floor(Math.random() * (total + 1));
        if (!arr.includes(num)) {
            arr.push(num)
        }
    } while (arr.length < mines)
    return arr;
}

export const getNeighbours = async (id, row, column, size) => {
    const neighbours = [];
    // above
    if (row > 0) {
        // above left
        if (column > 0) {
            neighbours.push(id - (size - 1));
        }
        neighbours.push(id - size);
        // above right
        if (column < (size - 1)) {
            neighbours.push(id - (size + 1));
        }
    }
    // left
    if (column > 0) {
        neighbours.push(id - 1);
    }
    // right
    if (column < (size - 1)) {
        neighbours.push(id + 1);
    }
    // below
    if (row < (size - 1)) {
        // below left
        if (column > 0) {
            neighbours.push(id + (size - 1));
        }
        neighbours.push(id + size);
        // below right
        if (column < (size - 1)) {
            neighbours.push(id + (size + 1));
        }
    }
    return neighbours;
}

export const getMinedNeighbours = async (cell, data) => {
    // const isMined = cell.isMined;
    // const i = cell.id
    const neighbours = cell.neighbours;
    console.log(cell.mined)
    const arr = [];
    if (!cell.mined) {
        for (let i = 0; i < neighbours.length; i++) {
            let n = neighbours[i]
            console.log(n)
            console.log(data[n].mined)
            if (data.n.mined) {
                arr.push(n)
            }
        }
        return arr.length;
    } else {
        return null
    }
    
    // console.log(state[i].isMined)

    return neighbours.filter(n => data[n].mined === true)
    
    // if (!isMined) {
    //     return neighbours.filter(n => state[n].isMined)
    //     // return nearMines.length;
    // } else return null;  
}
// 
// 
