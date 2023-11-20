module.exports = (sequelize, DataTypes) => {
    const Categorys = sequelize.define("Categorys", {
        title: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        }
    },

    {
        indexes: [
            {
                unique: true,
                fields: ['title']
            }
        ]
    }
    
    )

    Categorys.associate = (models) => {
        Categorys.hasMany(models.Products, { onDelete: "cascade" });
    }

    return Categorys
}