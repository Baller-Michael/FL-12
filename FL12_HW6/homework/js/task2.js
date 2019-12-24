var price = prompt("Enter your number (0-9999999): ","");
var discount = prompt("Enter your discount (0-99): ","");

if ((price === "" || discount === "") || (isNaN(price) || isNaN(discount) ||
        (price < 0 || price > 9999999) || (discount < 0 || discount > 99))) {
    alert('Invalid input data');
} else {
    var rez = price * ((100 - discount) / 100);
    var saved = price - rez;
    alert('Price without discount: ' + price +
        '\nDiscount: ' + discount + '%' +
        '\nPrice with discount: ' + setValue(rez) +
        '\nSaved: ' + setValue(saved)
    );
}

function setValue(num) {
    return Math.floor(num * 100) / 100;
}
