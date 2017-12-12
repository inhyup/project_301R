/* 1, 3. Наполнение страницы информацией (купонами) */
var cartsDataArray; 


getJson("js/json/generated.json", function(generated){
  cartsDataArray = generated;
  createItem(cartsDataArray);
});
/* получаем информацию из файла json */
function getJson(url, callback){
  var req  = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener('load', function(){
    var responseJson = JSON.parse(this.responseText);
    callback(responseJson)
  });
  req.send();
}

document.querySelector('.catalog_sort__item--price').addEventListener('click', sortPrice); 
document.querySelector('.catalog_sort__item--discount').addEventListener('click', sortDiscount);

function sortPrice(e) {
  e.preventDefault();
  cartsDataArray.sort(function(a, b){
    if (a.priceNew>b.priceNew){
      return 1;
    } else {
      return -1;
    }
  });
  createItem(cartsDataArray);
  filterFunctions();
}

function sortDiscount(e){
  e.preventDefault();
  cartsDataArray.sort(function(a, b){
    if (a.discount<b.discount){
      return 1;
    }else{
      return -1;
    }
  });
  createItem(cartsDataArray);  
  filterFunctions();
}


/* создаем элемент */
function createItem(generated){
  var catalogList = document.querySelector('.catalog__list');
  catalogList.innerHTML = '';
  generated.forEach( function(item){
    var newItem = document.createElement('a');
    newItem.classList.add('catalog_cart', 'catalog__item');
    newItem.setAttribute('href', '/');
    if (item.special == true){
      newItem.setAttribute('data-special', item.special);
      newItem.classList.add('catalog_cart--special');
    }

    /* преобразование даты "от" */
    var itemDateFromString = item.dateFrom;
    itemDateFromString = itemDateFromString.replace(/\s/g, "");
    var milliSecDateFrom = Date.parse(itemDateFromString);
    var itemDateFrom = new Date(milliSecDateFrom);
    var dayFrom = itemDateFrom.getDate();
    if (dayFrom<10){
      dayFrom = '0'+dayFrom;
    }
    var monthFrom = itemDateFrom.getMonth() + 1;
    if (monthFrom<10){
      monthFrom = '0'+monthFrom;
    }
    var yearFrom = itemDateFrom.getFullYear();
    yearFrom = String(yearFrom);
    yearFrom = yearFrom.replace("20", "");
    var dateFrom = dayFrom+'.'+monthFrom+'.'+yearFrom;

    /* преобразование даты "до" */
    var itemDateToString = item.dateTo;
    itemDateToString = itemDateToString.replace(/\s/g, "");
    var milliSecDateTo = Date.parse(itemDateToString);
    var itemDateTo = new Date(milliSecDateTo);
    var dayTo = itemDateTo.getDate();
    if (dayTo<10){
      dayTo = '0'+dayTo;
    }
    var monthTo = itemDateTo.getMonth() + 1;
    if (monthTo<10){
      monthTo = '0'+monthTo;
    }
    var yearTo = itemDateTo.getFullYear();
    yearTo = String(yearTo);
    yearTo = yearTo.replace("20", "");
    var dateTo = dayTo+'.'+monthTo+'.'+yearTo;


    newItem.setAttribute('data-type', item.type);
    newItem.setAttribute('data-price', item.priceNew);
    newItem.setAttribute('data-date-to', dateTo);
    newItem.setAttribute('data-date-from', dateFrom);    
    newItem.setAttribute('data-metro', item.metro);

    catalogList.appendChild(newItem);


    /* внутренности catalog item */
    /* catalog_cart__image */
    var newItemImage = document.createElement('div');
    newItemImage.classList.add('catalog_cart__image');
    newItem.appendChild(newItemImage);

    var newItemImageImg = document.createElement('img');
    newItemImageImg.setAttribute('src', item.image);
    newItemImage.appendChild(newItemImageImg);

    var newItemImageTimer = document.createElement('div');
    newItemImageTimer.classList.add('catalog_cart__timer', 'timer');
    newItemImage.appendChild(newItemImageTimer);

    var imageHTML = '<div class="timer__item"><span></span><span>day</span></div>';
    imageHTML += '<div class="timer__item"><span></span><span>hour</span></div>';
    imageHTML += '<div class="timer__item"><span></span><span>min</span></div>';
    imageHTML += '<div class="timer__item"><span></span><span>sec</span></div>';
    newItemImageTimer.innerHTML += imageHTML;

    /* catalog_cart__content */
    var newItemContent = document.createElement('div');
    newItemContent.classList.add('catalog_cart__content');
    newItem.appendChild(newItemContent);

    var contentHTML = '<div class="catalog_cart__discount">'+item.discount+'%</div>';
    contentHTML += '<p class="catalog_cart__title">'+item.title+'</p>';
    contentHTML += '<div class="catalog_cart__footer">';
    contentHTML += '<p class="catalog_cart__price">';
    contentHTML += '<span class="price catalog_cart__price_old">'+item.priceOld+'</span>';
    contentHTML += '<span class="price catalog_cart__price_new">'+item.priceNew+'</span>';
    contentHTML += '</p>';
    contentHTML += '<div class="catalog_cart__btn"><p class="btn">to cart</p></div>';
    contentHTML += '</div>';
    newItemContent.innerHTML += contentHTML;

    newItemContent.querySelector('.btn').addEventListener('click', addCart);


    /* 4. таймер */
    var now = new Date();
    var secOverall = Date.parse(itemDateTo)/1000 - Date.parse(now)/1000;
    // console.log(secOverall);

    if (Date.parse(itemDateTo)/1000 < Date.parse(now)/1000){
      newItem.classList.add('catalog_cart--disabled');
      newItemImage.removeChild(newItemImageTimer);
    }


    var SECONDS_IN_DAY = 60*60*24;
    var SECONDS_IN_HOUR = 60*60;
    var SECONDS_IN_MINUTE = 60;

    var daysAmount = Math.floor(secOverall/SECONDS_IN_DAY);
    var hoursAmount = Math.floor((secOverall - daysAmount*SECONDS_IN_DAY)/SECONDS_IN_HOUR);
    var minAmount = Math.floor((secOverall - daysAmount*SECONDS_IN_DAY - hoursAmount*SECONDS_IN_HOUR)/SECONDS_IN_MINUTE);
    var secAmount = Math.floor(secOverall - daysAmount*SECONDS_IN_DAY - hoursAmount*SECONDS_IN_HOUR - minAmount*SECONDS_IN_MINUTE);


    var days = newItemImageTimer.querySelector(".timer__item:nth-of-type(1) span:nth-of-type(1)");
    var hours = newItemImageTimer.querySelector(".timer__item:nth-of-type(2) span:nth-of-type(1)");
    var minutes = newItemImageTimer.querySelector(".timer__item:nth-of-type(3) span:nth-of-type(1)");
    var seconds = newItemImageTimer.querySelector(".timer__item:nth-of-type(4) span:nth-of-type(1)");
    function countdown () {
      seconds.innerHTML = secAmount;
      minutes.innerHTML = minAmount;
      hours.innerHTML = hoursAmount;
      days.innerHTML = daysAmount;
      secAmount--
      secOverall--
      if (secAmount < 0){
        secAmount = 59;
        minAmount--;
      }
      if (minAmount < 0){
        minAmount = 59;
        hoursAmount--;
      } 
      if (hoursAmount < 0){
        hoursAmount = 23;
        daysAmount--;
      }  
      // console.log(secOverall);
      if (secOverall < 0){
        clearInterval(count);
        newItem.classList.add('catalog_cart--disabled');
      }
    }
    var count = setInterval(countdown, 1000);


  });
}

