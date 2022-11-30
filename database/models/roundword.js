import {DataTypes } from 'sequelize';
import connection from '../connection';
import Round from './round';
import Word from './word';
export const initRoundWord = function (sequelize, types) {
    return sequelize.define('roundwords', {
        roundId: {
            type: types.INTEGER,
            primaryKey: true,
            references: {
                model: 'rounds',
                key: 'id',
            },
        },
        word: {
            type: DataTypes.STRING(65),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'words',
                key: 'word',
            },
        },
    }, { timestamps: true });


}

export default initRoundWord(connection, DataTypes);;