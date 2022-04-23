let cart = [];
let total = 0;
const cartLocalStorage = window.localStorage;

const Database = async () => {
    fetch("./database.json")
        .then ((res) => res.json())
        .then ((data) => {ShowItems(data.items);})
    //
} 

const ShowItems = (items) => {
    let cartIcon = document.querySelector(".call-cart");
    cartIcon.addEventListener("click", () => ModalCart());

    // calling section for items in html 
    const itemsContainer = document.querySelector(".items");
    items.forEach((item) => {
        // item features container
        let itemContainer = document.createElement("div");
        itemContainer.className = "card item";

        // adding item title
        let itemTitle = document.createElement("h4");
        itemTitle.textContent= `${item.title}`;
        
        // adding item img
        let itemImage = document.createElement("img");
        itemImage.src = `${item.image}`;

        // adding item price
        let itemPrice = document.createElement("span");
        itemPrice.textContent = `${item.price}`;

        // adding item detail btn
        let detailsButton = document.createElement("button");
        detailsButton.textContent = "View details";
        detailsButton.className = "btn btn-secondary m-1";
        detailsButton.addEventListener("click", () => { 
            ModalDetails(item);
        })

        // Number of items in cart
        let itemsInCart = document.querySelector(".items-in-cart");
        itemsInCart.textContent = `${cart.length}`;
        
        // adding add to cart btn
        let toCartButton = document.createElement("button");
        toCartButton.textContent = "Add to cart";
        toCartButton.className = "btn btn-primary m-1";
        toCartButton.addEventListener("click", () => {
            Toastify({
                text: "Added to cart",
                duration: 2000,
                className: "toastNotification",
            }).showToast();
            AddToCart(item, itemsInCart);
        })
        
        // adding features
        itemContainer.appendChild(itemTitle);
        itemContainer.appendChild(itemImage);
        itemContainer.appendChild(itemPrice);
        itemContainer.appendChild(detailsButton);
        itemContainer.appendChild(toCartButton);
        // itemContainer whit all features
        itemsContainer.appendChild(itemContainer);
    })
}

const ModalDetails = (item) => {
    let modalWrap = null;
    if (modalWrap !== null) {
        modalWrap.remove();
    }
    modalWrap = document.createElement("div");

    let modalBox = document.createElement("div");
    modalBox.className = "modal fade";
        let modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog modal-dialog-centered";
            let modalContent = document.createElement("div");
            modalContent.className = "modal-content";
                let modalHeader = document.createElement("div");
                modalHeader.className = "modal-header";
                let modalBody = document.createElement("div");
                modalBody.className = "modal-body";
                let modalFooter = document.createElement("div");
                modalFooter.className = "modal-footer";
            let modalCloseBtn = document.createElement("button");
            modalCloseBtn.className = "close";
            modalCloseBtn.textContent = "x";
            modalCloseBtn.addEventListener("click", () => {modal.hide()});
    // --  

    let itemTitle = document.createElement("h3");
    itemTitle.textContent = `${item.title}`;
    itemTitle.className = "modal-title";
    let itemPrice = document.createElement("span");
    itemPrice.textContent = `${item.price}`;
    let itemDetail = document.createElement("p");
    itemDetail.textContent = `${item.detail}`;

    // modalBox content
    modalBox.appendChild(modalDialog);
    modalHeader.appendChild(itemTitle);
    modalHeader.appendChild(modalCloseBtn);
    modalBody.appendChild(itemDetail);
    modalFooter.appendChild(itemPrice);
    // adding modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);

    // adding modalBox whit all content - styles
    modalWrap.appendChild(modalBox);
    document.body.append(modalWrap);
    let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

const AddToCart = (item, itemsInCart) => {
    let quantity = 1;
    const itemsIsInCart = cart.find((itemAdded) => itemAdded.id === item.id);
    if (itemsIsInCart) {
        cart.map((newItem) => {
            if(newItem.id === item.id) {
                item.quantity = item.quantity + 1;
                console.log('modify quantity to item') 
            }
        })
    } else {
        item.quantity = quantity;
        cart.push(item) && cartLocalStorage.setItem('cart', JSON.stringify(cart));
        itemsInCart.textContent = `${cart.length}`;
    }
    CalculateTotal();
}

const ModalCart = () => {
    // show modal cart with items
    let modalWrap = null;
    if (modalWrap !== null) {
        modalWrap.remove();
    }
    modalWrap = document.createElement("div");

    let modalBox = document.createElement("div");
    modalBox.className = "modal fade";
        let modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog modal-dialog-centered";
            let modalContent = document.createElement("div");
            modalContent.className = "modal-content";
                let modalHeader = document.createElement("div");
                modalHeader.className = "modal-header";
                let modalBody = document.createElement("div");
                modalBody.className = "modal-body";
                let modalFooter = document.createElement("div");
                modalFooter.className = "modal-footer";
            let modalCloseBtn = document.createElement("button");
            modalCloseBtn.className = "close";
            modalCloseBtn.textContent = "x";
            modalCloseBtn.addEventListener("click", () => {modal.hide()});
    // --  
    let cartTitle = document.createElement("h3")
    cartTitle.textContent = "Cart";
    cartTitle.className = "modal-title";
    let cartTotal = document.createElement("span");
    cartTotal.textContent = `Total: $ ${total}`;

    for (let i=0; i < cart.length; i++) {
        let itemAddedContainer = document.createElement("div");
        itemAddedContainer.className = "row";
        let itemAdded = document.createElement("p");
        let itemAddedPrice = document.createElement("span");

        let item = cart[i];

        itemAdded.textContent = `x${item.quantity} ${item.title}`;
        itemAddedPrice.textContent = `${item.price}`;
        itemAddedContainer.appendChild(itemAdded);
        itemAddedContainer.appendChild(itemAddedPrice);
        modalBody.appendChild(itemAddedContainer);
    }

    // modalbox content
    modalBox.appendChild(modalDialog);
    modalHeader.appendChild(cartTitle);
    modalFooter.appendChild(cartTotal);

    // adding modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);

    // adding modalBox whit all content - styles
    modalWrap.appendChild(modalBox);
    document.body.append(modalWrap);
    let modal = new bootstrap.Modal(modalWrap.querySelector('.modal'));
    modal.show();
}

const CalculateTotal = () => {
    for (let i=0; i <  cart.length; i++) {
        total = total + cart[i].price;
    }
}

const ClearCart = () => {
    // emptying
    cart = [];
    // update
    ModalCart();
    // cleaning localStorage
    localStorage.clear();
}

const LoadStoredCart = () => {
    cartLocalStorage.getItem('cart') !== null ? cart = JSON.parse(cartLocalStorage.getItem('cart')) : console.log('cart no exist');
    let items = cart.reduce((a,v) => {
        a[v.id] ?  a[v.id].push(v) : a[v.id] = [v];
        return a;
    }, {});
    cartWithoutDuplicates = items;
}

// initialization
LoadStoredCart();
CalculateTotal();
Database();


/*
let itemAddedContainer = document.createElement("div");
itemAddedContainer.className = "row";
let itemAdded = document.createElement("p");
let itemAddedPrice = document.createElement("span");

for (let i=0; i < cart.length; i++) {
    let item = cart[i];
    let quantity = cart.filter(item => item);


    if (quantity.length < 1) {
        itemAdded.textContent = `x${quantity.length} ${item.title}`;
        itemAddedPrice.textContent = `${item.price}`;
        itemAddedContainer.appendChild(itemAdded);
        itemAddedContainer.appendChild(itemAddedPrice);
        modalBody.appendChild(itemAddedContainer);
    }
    else {           
        itemAdded.textContent = `x${quantity.length} ${item.title}`;
        itemAddedPrice.textContent = `${item.price}`;
        itemAddedContainer.appendChild(itemAdded);
        itemAddedContainer.appendChild(itemAddedPrice);
        modalBody.appendChild(itemAddedContainer);
    }
}
*/