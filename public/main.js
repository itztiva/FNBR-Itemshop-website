const itemShopContainer = document.getElementById('itemShop');

fetch('/shopData.json') 
  .then(response => response.json())
  .then(data => {
    const featuredItems = data.data.featured;
    const dailyItems = data.data.daily;

    processItems(featuredItems);
    processItems(dailyItems);
  })
  .catch(error => console.error('Error fetching data:', error));

function processItems(items) {
  if (Array.isArray(items)) {
    items.forEach(item => {
      const itemDiv = createItemDiv();
      const itemName = createItemElement('h3', item.name);
      const itemImage = createItemElement('img', null, item.images.featured);
      const itemPrice = createItemElement('p', null, null, item.price, item.priceIconLink);

      appendItemElements(itemDiv, itemName, itemImage, itemPrice);
    });
  } else {
    console.error('Items data is not an array:', items);
  }
}

function createItemDiv() {
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('item');
  return itemDiv;
}

function createItemElement(tag, textContent, src, price, priceIconLink) {
  const element = document.createElement(tag);
  if (textContent) {
    element.textContent = textContent;
  }
  if (src) {
    element.src = src;
  }
  if (price) {
    const priceIcon = document.createElement('img');
    priceIcon.src = priceIconLink;
    priceIcon.style.width = '20px'; 
    priceIcon.style.height = '20px';
    element.appendChild(priceIcon);
    element.appendChild(document.createTextNode(price));
  }
  return element;
}

function appendItemElements(itemDiv, ...elements) {
  elements.forEach(element => itemDiv.appendChild(element));
  itemShopContainer.appendChild(itemDiv);
}
