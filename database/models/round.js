import {DataTypes } from 'sequelize';
import connection from '../connection';


export const initRound = function (sequelize, DataTypes) {
    return sequelize.define('rounds', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        finishedAt: DataTypes.DATE,
    }, { timestamps: true });
}

export default initRound(connection, DataTypes);