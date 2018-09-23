'use strict'

class league {
    constructor() {
        this.leagues = [];
    }
    getLeagues(callback) {
        var xhr = new XMLHttpRequest();
        var thisLeauge = this;
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                thisLeauge.leagues = JSON.parse(xhr.responseText);
                callback();
            }
        }
        xhr.open('GET', 'http://localhost:3000/league-data.json', true);
        xhr.send(null);
    }
}
export default league;
