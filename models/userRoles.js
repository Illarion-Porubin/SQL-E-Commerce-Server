module.exports = (sequlize, DataTypes) => {
    const UserRoles = sequlize.define("UserRoles", {},
        { timestamps: false },
        { timestamps: false },

    )

    return UserRoles
}
