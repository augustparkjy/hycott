module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Users', {
        // primary key를 의미, 유저의 번호
        email:{
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate:{
                isEmail: true
            }
        },
        pw:{
            type: DataTypes.STRING,
            allowNull: false
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        age:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        salt:{
            type:DataTypes.STRING
        }
    },{
        timestamps: false
    });
  };