const Database = () => {
    const items = [
        {
            id: 1,
            title: 'Peugeot 308',
            price: 1800000, 
        },
        {
            id: 2,
            title: 'Peugeot 208',
            price: 2200000, 
        },
        {
            id: 3,
            title: 'Peugeot 307',
            price: 1000000, 
        }
    ];
    ShowItems(items);
}

const ShowItems = (items) => {
    // calling section for items in html 
    const itemsContainer = document.querySelector(".items");

    items.forEach((item) => {
        // item features container
        let itemContainer = document.createElement("div");
        
        // adding item.title
        let itemTitle = document.createElement("h4");
        itemTitle.textContent= `${item.title}`
        // adding item.img

        // adding ite.price
        let itemPrice = document.createElement("span")
        itemPrice.textContent = `${item.price}`

        // button addToCart
        let itemButton = document.createElement("button");
        itemButton.textContent = "Add to cart"
        itemButton.addEventListener("click", () => {
            let itemId = item.id;
            AddToCart(itemId);
        });

        // adding features
        itemContainer.appendChild(itemTitle);
        // item.img
        itemContainer.appendChild(itemPrice);
        itemContainer.appendChild(itemButton);

        // itemContainer whit all features
        itemsContainer.appendChild(itemContainer);
    })
};

const AddToCart = (itemId) => {
    console.log(itemId);
}


// initialization
Database();











































// const elegirUnAuto = () => {
//     let autoId;
//     do{
//         autoId = parseInt(prompt('Ingresa el la opcion que deseas compra: 1 para 308, 2 para 208, 3 para 307'));
//     }while(isNaN(autoId))
    
//     infoAutoSeleccionado(autoId);
// }

// const infoAutoSeleccionado = (autoId) => {
//     const items = [
//         {
//             id: 1,
//             title: 'Peugeot 308',
//             price: 1800000, 
//         },
//         {
//             id: 2,
//             title: 'Peugeot 208',
//             price: 2200000, 
//         },
//         {
//             id: 3,
//             title: 'Peugeot 307',
//             price: 1000000, 
//         }
//     ];
    
//     const autoSeleccionado = items.find((element) =>  element.id === autoId);
//     ingresoDePrecioYcuotas(autoSeleccionado);
// }

// const ingresoDePrecioYcuotas = (autoSeleccionado) => {
//     let precio = autoSeleccionado.price;
//     let cuotas;

//     alert('El precio del auto ' + autoSeleccionado.title + ' es de ' + autoSeleccionado.price);
    
//     do{
//         cuotas = parseInt(prompt('Ingresa la cantidad de cuotas en que deseas pagar el producto'));
//     }while(isNaN(cuotas))
//     costoPorCuota(precio, cuotas);
// }

// const costoPorCuota = (precio, cuotas) => {
//     let precioAPagarMensual = precio / cuotas;
//     alert(`El precio a pagar mensualmente por el producto es de ${precioAPagarMensual}`);
// }   

// elegirUnAuto();