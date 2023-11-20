module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        avatar: {
            type: DataTypes.STRING,
            require: false,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            require: false,
            defaultValue: '',
        },
        password: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isActivated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        activationLink: {
            type: DataTypes.STRING(1234),
            require: true,
        },
    },

        {
            indexes: [
                {
                    unique: true,
                    fields: ['email']
                }
            ]
        }
    ) 

    Users.associate = (models) => {
        Users.hasMany(models.Ratings, { onDelete: "cascade", });
        Users.hasOne(models.Tokens, {
            // foreignKey: {
            //     name: DataTypes.UUID,
            //     allowNull: true
            // },
            onDelete: "cascade"
        });
    }


    return Users
}  