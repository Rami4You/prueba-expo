class User {
    get Id(){
        return this._id;
    }
    set Id(id) {
        id = id.trim();
        if (id === '') {
            throw new Error('Id is required');
        }
        this._id = id;
    }

    get FirstName() {
        return this._name;
    }
    set FirstName(firstname) {
        firstname = firstname.trim();
        if (firstname === '') {
            throw 'The name cannot be empty';
        }
        this._name = firstname;
    }

    get LastName() {
        return this._lastName;
    }
    set LastName(lastName) {
        lastName = lastName.trim();
        if (lastName === '') {
            throw 'The last name cannot be empty';
        }
        this._lastName = lastName;
    }

    get PhoneNumber() {
        return this._phoneNumber;
    }
    set PhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.trim();
        if (phoneNumber === '') {
            throw 'The phone number cannot be empty';
        }
        this._phoneNumber = phoneNumber;
    }

    get Role() {
        return this._role;
    }
    set Role(role) {
        role = role.trim();
        if (role === '') {
            throw 'The role cannot be empty';
        }
        this._role = role;
    }

    get Email() {
        return this._email;
    }
    set Email(email) {
        email = email.trim();
        if (email === '') {
            throw 'The email cannot be empty';
        }
        this._email = email;
    }

    get Password() {
        return this._password;
    }
    set Password(password) {
        password = password.trim();
        if (password === '') {
            throw 'The password cannot be empty';
        }
        this._password = password;
    }

    get City() {
        return this._city;
    }
    set City(city) {
        city = city.trim();
        if (city === '') {
            throw 'The city cannot be empty';
        }
        this._city = city;
    }

    get InstitutionId() {
        return this._institutionId;
    }
    set InstitutionId(institutionId) {
        institutionId = institutionId.trim();
        if (institutionId === '') {
            throw 'The institutionId cannot be empty';
        }
        this._institutionId = institutionId;
    }

    get CreatedAt() {
        return this._createdAt;
    }
    set CreatedAt(createdAt) {
        createdAt = createdAt.trim();
        if (createdAt === '') {
            throw 'The createdAt cannot be empty';
        }
        this._createdAt = createdAt;
    }

    get Status() {
        return this._status;
    }
    set Status(status) {
        status = status.trim();
        if (status === '') {
            throw 'The status cannot be empty';
        }
        this._status = status;
    }
}