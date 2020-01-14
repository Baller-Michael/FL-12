function convert() {
    let newArg = [];

    for (let i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'string') {
            newArg.push(+arguments[i]);
        } else {
            newArg.push(arguments[i] + '');
        }
    }

    return newArg;
}

function executeforEach(arr, func) {
    for (let i = 0; i < arr.length; i++) {
        func(arr[i]);
    }
}

function mapArray(arr, cb) {
    let result = [];

    executeforEach(arr, elem => {
        if (typeof elem === 'string') {
            elem = parseInt(elem);
        }

        result.push(cb(elem));
    });

    return result;
}

function filterArray(arr, cb) {
    let result = [];

    executeforEach(arr, elem => {
        if (cb(elem)) {
            result.push(elem);
        }
    });

    return result;
}

function flipOver(str) {
    let result = '';

    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }

    return result;
}

function makeListFromRange(range) {
    let arr = [];

    for (let i = range[0]; i < range[1] + 1; i++) {
        arr.push(i);
    }

    return arr;
}

const actors = [{
    name: 'tommy',
    age: 36
},
{
    name: 'lee',
    age: 28
}
];

function getArrayOfKeys(arr, key) {
    let result = [];

    executeforEach(arr, elem => {
        if (elem.hasOwnProperty(key)) {
            result.push(elem[key]);
        }
    });

    return result;
}

function substitute(arr) {
    let separator = 30;
    let newArr = mapArray(arr, function (el) {
        return el < separator ? '*' : el;
    });

    return newArr;
}

function getPastDay(date, numberDaysAgo) {
    let pastDate = new Date();

    pastDate.setDate(date.getDate() - numberDaysAgo);

    return pastDate.getDate();
}


function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let separator = 10;

    if (hours < separator) {
        hours = '0' + hours;
    }

    if (minutes < separator) {
        minutes = '0' + minutes;
    }

    return `${year}/${month}/${day} ${hours}:${minutes}`;
}