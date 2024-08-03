filterSelection("all")

function filterSelection(content) {
    var x, i;
    x = document.getElementsByClassName("column");
    if (content == "all") content = "";
    for (i = 0; i < x.length; i++) {
        removeClass(x[i], "show");
        if (x[i].className.indexOf(content) > -1) addClass(x[i], "show");
    }
}

function addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

function removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

var btnContainer = document.getElementById("filterContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const products = document.querySelectorAll('.product');
    const totalCostElement = document.getElementById('total-cost');
    const orderDetailsElement = document.getElementById('order-details');
    const placeOrderButton = document.getElementById('place-order');
    const dropdownHeader = document.querySelector('.dropdown-header');
    const dropdownContainer = document.querySelector('.dropdown-container');

    products.forEach(product => {
        const quantityInput = product.querySelector('input[type="number"]');
        quantityInput.addEventListener('input', updateCart);
    });

    function updateCart() {
        let totalCost = 0;
        let orderSummary = '';
        let orderDetailsHTML = '';

        products.forEach(product => {
            const price = parseFloat(product.getAttribute('data-price'));
            const quantity = parseInt(product.querySelector('input[type="number"]').value);
            if (quantity > 0) {
                const productName = product.querySelector('h4 b').innerText;
                const productCost = price * quantity;
                totalCost += productCost;
                orderSummary += `Product: ${productName}, Quantity: ${quantity}, Total: ${productCost.toFixed(2)}\n`;
                orderDetailsHTML += `<div class="order-item">${productName} (${quantity}) = ${productCost.toFixed(2)}</div>`;
            }
        });

        orderDetailsElement.innerHTML = orderDetailsHTML;
        totalCostElement.innerText = `Total Cost: ${totalCost.toFixed(2)}`;

        placeOrderButton.onclick = () => {
            if (totalCost > 0) {
                const whatsappMessage = encodeURIComponent(`Order Summary:\n${orderSummary}Total Cost: ${totalCost.toFixed(2)}`);
                const whatsappUrl = `https://wa.me/+255758523353?text=${whatsappMessage}`;
                window.location.href = whatsappUrl;
            } else {
                alert('Please add some products to your cart.');
            }
        };
    }

    dropdownHeader.addEventListener('click', () => {
        dropdownContainer.classList.toggle('open');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const dropdownHeader = document.querySelector('.dropdown-header');
    const dropdownContent = document.querySelector('.dropdown-content');
    const arrow = document.querySelector('.arrow');

    dropdownHeader.addEventListener('click', () => {
        dropdownContent.style.display = dropdownContent.style.display === 'none' ? 'block' : 'none';
        arrow.innerText = dropdownContent.style.display === 'none' ? '▼' : '▲';
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const cartSummary = document.getElementById('cart-summary');
    const header = cartSummary.querySelector('.dropdown-header');

    header.addEventListener('mousedown', (e) => {
        let shiftX = e.clientX - cartSummary.getBoundingClientRect().left;
        let shiftY = e.clientY - cartSummary.getBoundingClientRect().top;

        const moveAt = (pageX, pageY) => {
            let newLeft = pageX - shiftX;
            let newTop = pageY - shiftY;

            const rightEdge = document.documentElement.clientWidth - cartSummary.offsetWidth;
            const bottomEdge = document.documentElement.clientHeight - cartSummary.offsetHeight;

            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft > rightEdge) newLeft = rightEdge;
            if (newTop > bottomEdge) newTop = bottomEdge;

            cartSummary.style.left = newLeft + 'px';
            cartSummary.style.top = newTop + 'px';
        };

        const onMouseMove = (e) => {
            moveAt(e.pageX, e.pageY);
        };

        document.addEventListener('mousemove', onMouseMove);

        header.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        });

        header.addEventListener('mouseleave', () => {
            document.removeEventListener('mousemove', onMouseMove);
        });

        header.ondragstart = () => {
            return false;
        };
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});