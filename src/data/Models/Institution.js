class institution {
    get Id() {
        return this._id;
    }
    set Id(id) {
        id = id.trim();
        if (id === '') {
            throw new Error('Id is required');
        }
        this._id = id;
    }

    get Name() {
        return this._name;
    }
    set Name(name) {
        name = name.trim();
        if (name === '') {
            throw new Error('Name is required');
        }
        this._name = name;
    }

    get City() {
        return this._city;
    }
    set City(city) {
        city = city.trim();
        if (city === '') {
            throw new Error('City is required');
        }
        this._city = city;
    }

    get Photo() {
        return this._photo;
    }
    set Photo(photo) {
        photo = photo.trim();
        if (photo === '') {
            throw new Error('Photo is required');
        }
        this._photo = photo;
    }

    get Address() {
        return this._address;
    }
    set Address(address) {
        address = address.trim();
        if (address === '') {
            throw new Error('Address is required');
        }
        this._address = address;
    }

    get Category() {
        return this._category;
    }
    set Category(category) {
        category = category.trim();
        if (category === '') {
            throw new Error('Category is required');
        }
        this._category = category;
    }

    get PhoneNumber() {
        return this._phoneNumber;
    }
    set PhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.trim();
        if (phoneNumber === '') {
            throw new Error('PhoneNumber is required');
        }
        this._phoneNumber = phoneNumber;
    }

    get Categories() {
        return this._categories;
    }
    set Categories(categories) {
        this._categories = categories;
    }

    get CreatedAt() {
        return this._createdAt;
    }
    set CreatedAt(createdAt) {
        createdAt = createdAt.trim();
        if (createdAt === '') {
            throw new Error('CreatedAt is required');
        }
        this._createdAt = createdAt;
    }

    get Status() {
        return this._status;
    }
    set Status(status) {
        status = status.trim();
        if (status === '') {
            throw new Error('Status is required');
        }
        this._status = status;
    }

    Institution(){
        this.Categories = [];
        this.Status = 1;
    }
}