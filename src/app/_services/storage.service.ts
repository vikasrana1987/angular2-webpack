import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    constructor() { }

    /*  removeStorage: removes a key from localStorage and its sibling expiracy key
        params:
            key <string>     : localStorage key to remove
        returns:
            <boolean> : telling if operation succeeded
    */
    removeStorage(name) {
        try {
            localStorage.removeItem(name);
            localStorage.removeItem(name + '_expiresIn');
        } catch (e) {
            console.log('removeStorage: Error removing key [' + name + '] from localStorage: ' + JSON.stringify(e) );
            return false;
        }
        return true;
    }

    /*  getStorage: retrieves a key from localStorage previously set with setStorage().
        params:
            key <string> : localStorage key
        returns:
            <string> : value of localStorage key
            null : in case of expired key or failure
    */
    getStorage(key) {

        let now = Date.now();  // epoch time, lets deal only with integer
        // set expiration for storage
        let expiresKey: any;
        let expiresIn: number;
        expiresKey = localStorage.getItem(key + '_expiresIn');
        expiresIn = expiresKey;
        if (expiresIn === undefined || expiresIn === null) { expiresIn = 0; }

        if (expiresIn < now) {// Expired
            this.removeStorage(key);
            return null;
        } else {
            try {
                let value = localStorage.getItem(key);
                return value;
            } catch (e) {
                console.log('getStorage: Error reading key [' + key + '] from localStorage: ' + JSON.stringify(e) );
                return null;
            }
        }
    }
    /*  setStorage: writes a key into localStorage setting a expire time
        params:
            key <string>     : localStorage key
            value <string>   : localStorage value
            expires <number> : number of seconds from now to expire the key
        returns:
            <boolean> : telling if operation succeeded
    */
    setStorage(key, value, expires) {

        if (expires === undefined || expires === null) {
            expires = ( 24 * 60 * 60 );  // default: seconds for 1 day
        } else {
            expires = Math.abs(expires); // make sure it's positive
        }

        let now = Date.now();  // millisecs since epoch time, lets deal only with integer
        let schedule: any;
        schedule = now + expires * 1000;
        try {
            localStorage.setItem(key, value);
            localStorage.setItem(key + '_expiresIn', schedule);
        } catch (e) {
            console.log('setStorage: Error setting key [' + key + '] in localStorage: ' + JSON.stringify(e) );
            return false;
        }
        return true;
    }
}
