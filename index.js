const goods = [
    {
        id: '01',
        name: 'Califronia Salmon',
        src: './images/californiaSalmon.png',
        amount: 6,
        price: '6$'
    },
    
    {
        id: '02',
        name: 'Nigiri Salmon',
        src: './images/nigiri.png',
        amount: 6,
        price: '10$'
    },
    
    {
        id: '03',
        name: 'Green Dragon',
        src: './images/greenDragon.png',
        amount: 6,
        price: '8$'
    },

    {
        id: '04',
        name: 'Philadelphia Salmon',
        src: './images/philadelphiaSalmon.png',
        amount: 6,
        price: '7$'
    },

    {
        id: '05',
        name: 'Maki Salmon',
        src: './images/makiSalmon.png',
        amount: 6,
        price: '3$'
    },

    {
        id: '06',
        name: 'Califronia Caviar',
        src: './images/californiaCaviar.png',
        amount: 6,
        price: '5$'
    },

];

const productItems = document.querySelector('.product');

goods.forEach(element => {
    let div = document.createElement('div');
    div.classList.add('product__item');
    div.setAttribute('id', element.id);
    div.setAttribute('data-id', element.id);
    let h2 = document.createElement('h2');
    h2.innerText = element.name;
    let img = document.createElement('img');
    img.setAttribute('src', element.src);
    let amount = document.createElement('p');
    amount.innerText = `amount: ${element.amount}`;
    let price = document.createElement('p');
    price.innerText = element.price;
    price.classList.add('price');
    let btn = document.createElement('button');
    btn.innerText = 'Add to the cart';
    let check = document.createElement('p');
    check.innerText = 'Product is already in cart';
    check.classList.add('check');
    div.append(h2);
    div.append(img);
    div.append(amount);
    div.append(price);
    div.append(btn);
    div.append(check);
    productItems.append(div);
});

let cart = document.querySelector('.cart__main');

const items = new Set();

let cartItems = document.querySelector('.cart__item');

window.addEventListener('click', (event) => {
    if (event.target.closest('.product__item')) {
        let card = event.target.closest('.product__item');
        let id = card.getAttribute('id');
        if (items.has(id)) {
            let check = card.querySelector('.check');
            check.style.display = 'block'
            setTimeout(() => {
                check.style.display = 'none';
            }, 2000)
        } else {
        goods.forEach(element => {
                if (element.id == id) {
                let div = document.createElement('div');
                div.classList.add('cart__item');
                div.setAttribute('id', element.id);
                let description = document.createElement('div');
                description.classList.add('description');
                let h2 = document.createElement('h2');
                h2.innerText = element.name;
                let img = document.createElement('img');
                img.setAttribute('src', element.src);
                let amount = document.createElement('p');
                amount.innerText = `amount: ${element.amount}`;
                let price = document.createElement('p');
                price.innerText = element.price;
                price.classList.add('price');
                let sum = document.createElement('div');
                sum.classList.add('description__sum');
                let minus = document.createElement('button');
                minus.innerText = '-';
                minus.classList.add('minus');
                let count = document.createElement('p');
                count.innerText = 1;
                count.classList.add('count');
                let plus = document.createElement('button');
                plus.innerText = '+';
                plus.classList.add('plus');
                div.append(img);
                description.append(h2);
                description.append(amount);
                description.append(price);
                sum.append(minus);
                sum.append(count);
                sum.append(plus);
                description.append(sum);
                div.append(description);
                cart.after(div);
            }
            calcCartPrice();
        });
    }
        items.add(id);
    }
})

window.addEventListener('click', (event) => {
    if (event.target.classList.contains('minus')) {
        const card = event.target.closest('.cart__item');
        let count = card.querySelector('.count');
        let id = card.getAttribute('id');
        count.innerText = --count.innerText;
        calcCartPrice();
        if (count.innerText == 0) {
            card.remove();
            calcCartPrice();
            items.delete(id);
        }
    }

    if (event.target.classList.contains('plus')) {
        const card = event.target.closest('.cart__item');
        let count = card.querySelector('.count');
        count.innerText = ++count.innerText;
        calcCartPrice();
    }

})

function calcCartPrice () {
    const cartItems = document.querySelectorAll('.cart__item');
    let totalPrice = 0;
    cartItems.forEach(element => {
        const sum = element.querySelector('.count');
        const price = element.querySelector('.price');
        const currentPrice = parseInt(sum.innerText) * parseInt(price.innerText);
        totalPrice += currentPrice;
    });
    let total = document.querySelector('.total');
    total.innerText = `Total price: ${totalPrice}$`;
}

const number = document.querySelector('.cart__form input');

number.addEventListener('keyup', (event) => {
    let value = event.target.value;
    let pattern = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
    if (value.match(pattern)) {
        event.target.classList.remove('error');
        event.target.classList.add('success');
    } else {
        event.target.classList.remove('success');
        event.target.classList.add('error');
    }
})