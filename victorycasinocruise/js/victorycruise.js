paypal.Buttons({
    style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'paypal',

    },
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.getElementById('package').value
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
    }
}).render('#paypal-button-container');

$(document).ready(function() {
  alert('test');
});
