module.exports = (sequelize, DataTypes) => {
    const Categorys = sequelize.define("Categorys", {
        title: {
            type: DataTypes.STRING,
            require: true,
            allowNull: false,
        }
    },
        {
            // don't add the timestamp attributes (updatedAt, createdAt)
            timestamps: false,

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false
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