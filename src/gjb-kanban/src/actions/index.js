//Actions creator
import React from 'react'
import KanbanColumn from '../components/column/KanbanColumn'

export const incColId = () => {
    return {
        type: 'INC_COL_ID',
        payload: 1
    };
};

export const colId = id => {
    return {
        type: 'COL_ID',
        payload: id
    }
}

export const newKan = () => {
    return {
        type: 'NEW_KAN'
    }
}

export const addCol = (id) => {
    return {
        type: 'ADD_COL',
        payload: <KanbanColumn id= {id}/>,
    }
}

export const delCol = (id) => {
    return {
        type: 'DEL_COL',
        payload: id
    }
}

export const moveColRight = (id) => {
    return {
        type: 'MOVE_COL_RIGHT',
        payload: id
    }
}

export const moveColLeft = (id) => {
    return {
        type: 'MOVE_COL_LEFT',
        payload: id
    }
}


