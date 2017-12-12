var basketList = document.querySelector('.catalog_basket__list');
var basketLine = document.querySelectorAll('.catalog_basket__line');
var basketDefault = document.querySelector('.catalog_basket__default');
var basketSum = document.querySelector('.catalog_basket__summ_text');
var basketClose = document.querySelectorAll('.catalog_basket__close');

/* Удаляем все что было в корзине изначально */
function removeBasketContent(){  
  basketList.innerHTML= '';
}
function returnBasketDefault(){
  basketList.appendChild(basketDefault);
}


/* Добавляем в корзину item, пересчитываем сумму */
var catalogItem = document.querySelectorAll('.catalog__item');
var sum = 0;
for (var i=0;i<catalogItem.length;i++){
  catalogItem[i].querySelector('.btn').addEventListener('click', addCart);    
}



/* */
var cart=[];

function renderCart(){
  removeBasketContent();
  sum = 0;
  for (var i=0;i<cart.length;i++){
    var newLine = document.createElement('div');
    newLine.classList.add('catalog_basket__line');
    var result = '<div class="catalog_basket__product">' + cart[i].title + '</div>';
    result += '<div class="catalog_basket__price price">' + cart[i].price + '</div>';
    result += '<div class="catalog_basket__close"><img src="img/svg/i-close.png" alt="close"></div>'
    newLine.innerHTML += result;
    basketList.appendChild(newLine);
    newLine.querySelector('.catalog_basket__close').addEventListener('click', removeCart);
    sum += +cart[i].price;
    sum = +sum.toFixed(1);
    basketSum.innerHTML= sum;
  } 
  if (cart.length == 0){
    basketSum.innerHTML= 0;
    sum = 0;
    returnBasketDefault();
  }
  // console.log(sum);
}

function addCart(e){
  e.preventDefault();
  var itemObj = {};
  var thisItem = this.closest('.catalog__item');
  if (!thisItem.classList.contains('catalog_cart--disabled')){
    itemObj.title = thisItem.querySelector('.catalog_cart__title').innerHTML;
    itemObj.price = thisItem.querySelector('.catalog_cart__price_new').innerHTML;
  cart.push(itemObj);
  }
  renderCart();
}

function removeCart(e){
  var curTitle = e.target.closest('.catalog_basket__line').querySelector('.catalog_basket__product');
  var curPrice = e.target.closest('.catalog_basket__line').querySelector('.catalog_basket__price');
  var flag;
  for (var i=0;i<cart.length;i++){
    if(cart[i].title == curTitle && cart[i].price == curPrice){
      flag = i;
      break;
    }  
  }
  cart.splice(flag, 1)
  renderCart();
}









/* 6.переключение режимов отображения товаров  */
var btnViewItem = document.querySelectorAll('.catalog_view__item');
for (var i=0;i<btnViewItem.length;i++){
  btnViewItem[i].addEventListener('click', switchCatalogView);    
}
function switchCatalogView(e){
  e.preventDefault();
  for (var i=0;i<this.parentNode.children.length;i++){
    this.parentNode.children[i].classList.remove("catalog_view__item--active")    
  }
  this.classList.toggle("catalog_view__item--active")
  var catalogList = this.closest('.catalog__content').querySelector('.catalog__list');
  catalogList.classList.toggle("catalog__list--three");
  catalogList.classList.toggle("catalog__list--two");
}

/* 7.открытие/закрытие фильтров  */
var filter = document.querySelectorAll('.filter');
for (var i=0;i<filter.length;i++){
  filter[i].querySelector('.filter__title').addEventListener('click', function(){
    this.parentNode.classList.toggle("filter--open");
  });    
}

/* 9.модалка  */
var btnBuy = document.querySelector('.catalog_basket__summ .btn');
btnBuy.addEventListener('click', showModal);    
function showModal(e){
  e.preventDefault();
  if (cart.length != 0){
    document.querySelector('.modal_underlay').style.display = 'block';
    document.querySelector('.modal_order').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
  }
}
var modalClose = document.querySelector('.modal__close');
var modalUnderlay = document.querySelector('.modal_underlay');
modalClose.addEventListener('click', hideModal);
modalUnderlay.addEventListener('click', hideModal);

function hideModal(e){
  e.preventDefault();
  document.querySelector('.modal_order').style.display = 'none';
  modalUnderlay.style.display = 'none';
  document.querySelector('body').style.overflow = 'auto';
}


