export class LocalStorageService<T> {

    constructor(private key: string) {

    }


    saveItemsToLocalStorage(items: Array<T> | T) {
        const savedItem = localStorage.setItem(this.key, JSON.stringify(items));
        return savedItem;
    }
    getItemsFromLocalStorage(key?: string) {
        let savedItem;
        if (key != null) {
            savedItem = JSON.parse(localStorage.getItem(key));

        } else {
            savedItem = JSON.parse(localStorage.getItem(this.key));

        }
        return savedItem;
    }

    clearItemFromLocalStorage(key?: string) {
        if (key != null) {
            const items = null;
            localStorage.setItem(key, JSON.stringify(items));
        } else {
            localStorage.clear();

        }
    }
}


