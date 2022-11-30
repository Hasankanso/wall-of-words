import {DataTypes } from 'sequelize';
import connection from '../connection';

export const initWord = function (sequelize, DataTypes) {
    return sequelize.define('words', {
        word: {
            type: DataTypes.STRING(65),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        roundId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Round',
                key: 'id',
            },
        },
        occurence: DataTypes.BIGINT,
    }, { timestamps: true });

}

export default initWord(connection, DataTypes);