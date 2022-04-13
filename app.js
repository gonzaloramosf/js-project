let cart = [];
const cartLocalStorage = window.localStorage;

const Database = async () => {
    fetch("./database.json")
        .then ((res) => res.json())
        .then ((data) => {
            // const items = data.items;
            // console.log(items)
            ShowItems(data.items);
        })
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
            ActivateModal(item);
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

const ActivateModal = (item) => {
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
    cart.push(item) && cartLocalStorage.setItem('cart', JSON.stringify(cart));
    itemsInCart.textContent = `${cart.length}`;
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
    cartTotal.textContent = `Total: `;

    for (let i=0; i < cart.length; i++) {
        let itemAdded = document.createElement("p");
        let item = cart[i];
        itemAdded.textContent = `${item.title}`;
        modalBody.appendChild(itemAdded);
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

const ClearCart = () => {
    // cart = [];
}

const LoadStoredCart = () => {
    cartLocalStorage.getItem('cart') !== null ? cart = JSON.parse(cartLocalStorage.getItem('cart')) : console.log('cart no exist');
}

// initialization
LoadStoredCart();
Database();