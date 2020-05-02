import { combineReducers } from 'redux'
import React from 'react'
import KanbanColumn from '../components/column/KanbanColumn'


const incColIdReducer = (id=0, action) => {
    if (action.type === 'INC_COL_ID'){
        return id + action.payload;
    }

    return id;
}


const columnsReducer = (cols=[<KanbanColumn id='0'/>, <KanbanColumn id='1'/>, <KanbanColumn id='2'/>], action) => {
    if (action.type === 'ADD_COL'){
        return [...cols, action.payload];
    }
    else if (action.type === 'DEL_COL'){
        let index = cols.findIndex(columns => columns.props.id === action.payload);
        console.log(index);
        if (index > -1){
            cols.splice(index, 1);
            console.log(cols);
        }
        return [...cols];
        //return cols.filter(column => column.props.id !== action.payload);
    }
    else if (action.type === 'MOVE_COL_LEFT'){
        let i = cols.findIndex(column => column.props.id === action.payload);
        [cols[i], cols[i-1]] = [cols[i-1], cols[i]];
        return [...cols]
    }
    else if (action.type === 'NEW_KAN'){
        cols = [];
        return cols;
    }
    return [...cols];
}

export default combineReducers({
    incColId: incColIdReducer,
    columns: columnsReducer
});

