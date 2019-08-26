module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Contents', {
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        genre:{
            type: DataTypes.STRING,
            allowNull: false
        },
        year:{
            type: DataTypes.STRING,
            allowNull: false
        },
        summary:{
            type: DataTypes.STRING,
            allowNull: false
        },
        poster:{
            type: DataTypes.STRING,
            allowNull: false
        },
        infohash:{
            type: DataTypes.STRING,
            allowNull: false
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
    },{
        timestamps: false
    });
};