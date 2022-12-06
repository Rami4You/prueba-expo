class Category {
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
}