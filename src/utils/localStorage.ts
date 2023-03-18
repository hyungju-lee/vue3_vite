function setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}

function setLocalStorageArrayData(key: string, value: string, num = 4): void {
    const res = localStorage.getItem(key);
    if (res) {
        const parseRes = JSON.parse(res);
        if (parseRes.length > num) {
            parseRes.pop();
        }
        let result;
        if (parseRes.includes(value)) {
            result = [...parseRes];
        } else {
            result = [value, ...parseRes];
        }
        localStorage.setItem(key, JSON.stringify(result));
    } else {
        localStorage.setItem(key, JSON.stringify([value]));
    }
}

function removeLocalStorageArrayData(key: string, value: string): void {
    const res = getLocalStorage(key);
    if (!res) {
        return;
    }
    const values = JSON.parse(res);
    if (!values || typeof values === 'string') {
        return;
    }
    values.splice(values.indexOf(value), 1);
    removeLocalStorage(key);
    setLocalStorage(key, JSON.stringify(values));
}

function getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
}

function removeLocalStorage(key: string) {
    localStorage.removeItem(key);
}

function clearLocalStorage() {
    localStorage.clear();
}

export {setLocalStorage, setLocalStorageArrayData, getLocalStorage, removeLocalStorage, clearLocalStorage, removeLocalStorageArrayData}