module.exports = (sequlize, DataTypes) => {
    const Tokens = sequlize.define("Tokens", {
        // id: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        //     primaryKey: true,
        // },

        refreshToken: {
            type: DataTypes.STRING(1234),
            allowNull: false, 
        }
    }) 
 
    Tokens.associate = (models) => {
        Tokens.belongsTo(models.Users, {        
            onDelete: "cascade"
        }
        );
    }

    return Tokens
}
