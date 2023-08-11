module.exports = (sequlize, DataTypes) => {
    const Ratings = sequlize.define("Ratings", {
        // id: {
        //     type: DataTypes.UUID,
        //     defaultValue: DataTypes.UUIDV4,
        //     primaryKey: true,
        // },

        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true, 
        },

    }) 

    return Ratings
}
