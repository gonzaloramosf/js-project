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
        itemTitle.className = "mt-2 mb-2"
        
        // adding item img
        let itemImage = document.createElement("img");
        itemImage.src = `${item.image}`;

        // adding item price
        let itemPrice = document.createElement("span");
        itemPrice.textContent = `us$ ${item.price}`;
        itemPrice.className = "text-end me-2 text-dark";

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
        toCartButton.className = "btn btn-primary m-1 mb-2";
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
            modalCloseBtn.className = "close text-danger";
            modalCloseBtn.textContent = "x";
            modalCloseBtn.addEventListener("click", () => {modal.hide()});
    // --  

    let itemTitle = document.createElement("h3");
    itemTitle.textContent = `${item.title}`;
    itemTitle.className = "modal-title";
    let itemPrice = document.createElement("span");
    itemPrice.textContent = `us$ ${item.price}`;
    itemPrice.className = "text-end me-2 text-dark";
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
                newItem.quantity = newItem.quantity + 1; 
                cartLocalStorage.setItem('cart', JSON.stringify(cart));
            }
        })
    } else {
        item.quantity = quantity;
        cart.push(item) && cartLocalStorage.setItem('cart', JSON.stringify(cart));
        itemsInCart.textContent = `${cart.length}`;
    }
}

const ModalCart = () => {
    let total = 0;
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
            modalCloseBtn.className = "close text-danger";
            modalCloseBtn.textContent = "x";
            modalCloseBtn.addEventListener("click", () => {modal.hide()});
    // --  

    if (cart.length === 0) {
        console.log("mostrar cart is empty");
        let cartTitle = document.createElement("h3")
        cartTitle.textContent = "Cart";
        cartTitle.className = "modal-title";
        let cartIsEmpty = document.createElement("p");
        cartIsEmpty.textContent = "Cart is empty, add items";
        cartIsEmpty.className = "text-info"
        let cartTotal = document.createElement("span");
        cartTotal.textContent = `Total: $ ${total}`;
        let emptyCart = document.createElement("button");
        emptyCart.className = "btn btn-warning";
        emptyCart.textContent = `Clear`;
        emptyCart.addEventListener("click",() => {
            ClearCart();
            modal.hide();
        });

        // modalbox content
        modalBox.appendChild(modalDialog);
        modalHeader.appendChild(cartTitle);
        modalHeader.appendChild(modalCloseBtn);
        modalBody.appendChild(cartIsEmpty);
        modalFooter.appendChild(cartTotal);
        modalFooter.appendChild(emptyCart);
    } 
    else {
        let cartTitle = document.createElement("h3")
        cartTitle.textContent = "Cart";
        cartTitle.className = "modal-title";
    
        for (let i=0; i < cart.length; i++) {
            let item = cart[i];
            let itemAddedContainer = document.createElement("div");
            itemAddedContainer.className = "row border-bottom pb-2";
            let itemAdded = document.createElement("h5");
            itemAdded.className = "mt-2"
            let priceAndClearContainer = document.createElement("div");
            priceAndClearContainer.className = "text-end";
            let itemAddedPrice = document.createElement("span");
            itemAddedPrice.className = "text-secondary me-4";
            let deleteItem = document.createElement("button");
            deleteItem.className = "btn btn-danger pe-4 ps-4";
            deleteItem.textContent = "x";
            deleteItem.addEventListener("click", () => {
                DeleteItemInCart(i);
                modal.hide();
            });
            priceAndClearContainer.appendChild(itemAddedPrice);
            priceAndClearContainer.appendChild(deleteItem);
            total = total + (item.price * item.quantity);
    
            itemAdded.textContent = `x${item.quantity} ${item.title}`;
            itemAddedPrice.textContent = `us$ ${item.price * item.quantity}`;
            itemAddedContainer.appendChild(itemAdded);
            itemAddedContainer.appendChild(priceAndClearContainer);
            modalBody.appendChild(itemAddedContainer);
        }
    
        let cartTotal = document.createElement("span");
        cartTotal.textContent = `Total: $ ${total}`;
        cartTotal.className = "me-3";
        let emptyCart = document.createElement("button");
        emptyCart.className = "btn btn-warning";
        emptyCart.textContent = `Clear`;
        emptyCart.addEventListener("click",() => {
            ClearCart();
            modal.hide();
        });
    
        // modalbox content
        modalBox.appendChild(modalDialog);
        modalHeader.appendChild(cartTitle);
        modalHeader.appendChild(modalCloseBtn);
        modalFooter.appendChild(cartTotal);
        modalFooter.appendChild(emptyCart);
    }

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

const ClearCart = () => {
    // emptying
    cart = [];
    // update modal
    ModalCart();
    // cleaning localStorage
    localStorage.clear();
    // items in cart count
    let itemsInCart = document.querySelector(".items-in-cart");
    itemsInCart.textContent = `${cart.length}`
}

const DeleteItemInCart = (index) => {
    // remove
    cart.splice(index, 1);
    // updating storage
    cartLocalStorage.setItem('cart', JSON.stringify(cart));
    // update modal
    ModalCart();
    // items in cart count
    let itemsInCart = document.querySelector(".items-in-cart");
    itemsInCart.textContent = `${cart.length}`
}   

const LoadStoredCart = () => {
    cartLocalStorage.getItem('cart') !== null ? cart = JSON.parse(cartLocalStorage.getItem('cart')) : console.log('cart no exist');
}

// initialization
Database();
LoadStoredCart();