module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
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
        Users.hasOne(models.Tokens, {
            foreignKey: {
                name: DataTypes.UUID,
                allowNull: true
            },
            onDelete: "cascade"
        });
    }

 
    return Users
}  