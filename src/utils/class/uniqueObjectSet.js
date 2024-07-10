class UniqueObjectSet {
    constructor() {
        this.map = new Map();
    }

    _generateKey(obj) {
        return `${obj.itemType}:${obj.itemId}`;
    }

    add(obj) {
        const key = this._generateKey(obj);
        this.map.set(key, obj);
    }

    has(obj) {
        const key = this._generateKey(obj);
        return this.map.has(key);
    }

    delete(obj) {
        const key = this._generateKey(obj);
        return this.map.delete(key);
    }

    size() {
        return this.map.size;
    }

    values() {
        return Array.from(this.map.values());
    }
}

export default UniqueObjectSet;
