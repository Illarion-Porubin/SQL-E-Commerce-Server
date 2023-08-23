module.exports = class UserDto {
    id;
    username;
    phone;
    password;
    email;
    isActivated;


    constructor(model) {
        this.id = model.id;
        this.username = model.username;
        this.password = model.password;
        this.phone = model.phone;
        this.email = model.email;
        this.isActivated = model.isActivated
    }
}
