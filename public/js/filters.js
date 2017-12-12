/* 8.Фильтрация товаров */
/* 8.1. Добавление data в массив */
var states = { 
  type:[], 
  special: false, 
  priceFrom: false, 
  priceTo: false, 
  dateTo: false, 
  metro:[] 
};

  /* 8.1.1. metro */
  var filterMetroItem = document.querySelector('.filter--metro').querySelectorAll('.filter__item');
  var arrayMetroItems = [].slice.call(filterMetroItem, 0);
  arrayMetroItems.forEach(function(el){
    var nameMetro = el.querySelector('.checkbox__label').innerHTML;
    el.addEventListener('change', function(e){
      if (el.querySelector('.checkbox__input').checked){
        addFilterMetro(nameMetro)
      } else {
        removeFilterMetro(nameMetro)
      }
      // что находится в массиве metro
      console.log(states.metro)
      // фильтрация
      filterFunctions();
    });  
  })
  function addFilterMetro(nameMetro){
    states.metro.push(nameMetro)
  }
  function removeFilterMetro(nameMetro){
    var index = states.metro.indexOf(nameMetro)
    states.metro.splice(index, 1)
  }

  /* 8.1.2. type */
  var filterTypeItem = document.querySelector('.filter--type').querySelectorAll('.filter__item');
  var arrayTypeItems = [].slice.call(filterTypeItem, 0);
  arrayTypeItems.forEach(function(el){
    var nameType = el.querySelector('.checkbox__label').innerHTML;
    el.addEventListener('change', function(e){
      if (el.querySelector('.checkbox__input').checked){
        addFilterType(nameType)
      } else {
        removeFilterType(nameType)
      }
      // что находится в массиве type
      console.log(states.type)
      // фильтрация
      filterFunctions();
    });  
  })
  function addFilterType(nameType){
    states.type.push(nameType)
  }
  function removeFilterType(nameType){
    var index = states.type.indexOf(nameType)
    states.type.splice(index, 1)
  }

  /* 8.1.3. special offer */
  var filterSpecial = document.querySelector('.filter--special .filter__item');
  filterSpecial.addEventListener('change', function(e){
    if (filterSpecial.querySelector('.checkbox__input').checked){
      addFilterSpecial()
    } else {
      removeFilterSpecial()
    }
    // что находится в boolean special
    console.log(states.special)
    // фильтрация
    filterFunctions();
  });  
  function addFilterSpecial(){
    states.special = true;
  }
  function removeFilterSpecial(){
    states.special = false;
  }

  /* 8.1.4.1. price from */
  var filterPriceFrom = document.querySelector('.filter--price .filter__input--from');
  filterPriceFrom.addEventListener('change', function(e){
    // console.log(filterPriceFrom.value);
    if (filterPriceFrom.value != false){
      addFilterPriceFrom(filterPriceFrom.value)
    } else {
      removeFilterPriceFrom(filterPriceFrom.value)
    }
    // что находится в строке priceFrom
    console.log(states.priceFrom)
    // фильтрация
    filterFunctions();
  });

  function addFilterPriceFrom(priceFrom){
    states.priceFrom = +priceFrom;
  }
  function removeFilterPriceFrom(priceFrom){
    states.priceFrom = false;
  }
  /* 8.1.4.2. price to */
  var filterPriceTo = document.querySelector('.filter--price .filter__input--to');
  filterPriceTo.addEventListener('change', function(e){
    // console.log(filterPriceTo.value);
    if (filterPriceTo.value != false){
      addFilterPriceTo(filterPriceTo.value)
    } else {
      removeFilterPriceTo(filterPriceTo.value)
    }
    // что находится в строке priceFrom
    console.log(states.priceTo)
    // фильтрация
    filterFunctions();
  });

  function addFilterPriceTo(priceTo){
    states.priceTo = +priceTo;
  }
  function removeFilterPriceTo(priceTo){
    states.priceTo = false;
  }

  /* 8.1.5. date to */
  var filterDateTo = document.querySelector('.filter--date .input');
  filterDateTo.addEventListener('blur', function(e){  
    var filterDateRegExp = filterDateTo.value.split('-');
    console.log(filterDateRegExp); 
    var d = new Date(filterDateRegExp)
    console.log(d);
    var filterSec = (Date.parse(d))/1000;
    console.log(filterSec);

    if (filterDateTo.value != false){
      addFilterDateTo(filterSec)
    } else {
      removeFilterDateTo(filterSec)
    }
    // что находится в строке dateTo
//    console.log(states.dateTo)
    // фильтрация
    filterFunctions();
  });

  function addFilterDateTo(num){
    states.dateTo = num;
  }
  function removeFilterDateTo(num){
    states.dateTo = false;
  }



function filterFunctions() {    
  var catalogItems = document.querySelectorAll('.catalog__item');
  for (var i=0; i<catalogItems.length; i++) {

    var t = 1;
    if (states.metro.length){
      t *= catalogMetro( catalogItems[i] );
    }
    if (states.type.length){
      t *= catalogType( catalogItems[i] );
    }
    if (states.special == true ){
      t *= catalogSpecial( catalogItems[i] );
    }
    if (states.priceFrom != false ){
      t *= catalogPriceFrom( catalogItems[i] );
    }
    if (states.priceTo != false ){
      t *= catalogPriceTo( catalogItems[i] );
    }
    if (states.dateTo != false ){
      t *= catalogDateTo( catalogItems[i] );
    }





    if (t == 0)
      catalogItems[i].style.display = 'none';
    else
      catalogItems[i].style.display = 'inline-block';

  }
}

function catalogMetro(currentCart) {
  var data = currentCart.getAttribute('data-metro');
  if ( states.metro.indexOf( data ) == -1 ) {
    return 0;
  } else {
    return 1;
  }
}

function catalogType(currentCart) {
  var data = currentCart.getAttribute('data-type');
  if ( states.type.indexOf( data ) == -1 ) {
    return 0;
  } else {
    return 1;
  }
}

function catalogSpecial(currentCart) {
  if ( currentCart.hasAttribute('data-special') ) {
    return 1;
  } else {
    return 0;
  }
}

function catalogPriceFrom(currentCart) {
  var currentPriceFrom = currentCart.querySelector('.catalog_cart__price_new').innerHTML;
  if ( +currentPriceFrom > states.priceFrom ) {
    return 1;
  } else {
    return 0;
  }
}
function catalogPriceTo(currentCart) {
  var currentPriceTo = currentCart.querySelector('.catalog_cart__price_new').innerHTML;
  if ( +currentPriceTo < states.priceTo ) {
    return 1;
  } else {
    return 0;
  }
}

function catalogDateTo(currentCart) {
  var data = currentCart.getAttribute('data-date-to');
  var arr = data.split('.').reverse();;
  arr[0] = '20'+ arr[0];
  console.log(arr)
  var v = new Date(arr)
  console.log(v); 
  var currentSecTo = (Date.parse(v))/1000;
  console.log(currentSecTo);

  if ( currentSecTo < states.dateTo ) {
    return 1;
  } else {
    return 0;
  }
}





