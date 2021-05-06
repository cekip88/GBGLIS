class Front {
  constructor(){
    const _ = this;
    _.init();

  }

  selectHandlers(){
    const _ = this;
    let selects = document.querySelectorAll('.select');
    if (selects.length) {
      for (let select of selects) {
        let head = select.querySelector('.select-head');
        head.addEventListener('click',function (){
          _.selectHeadClick({item:head,cont:select});
        });
        let options = select.querySelectorAll('.select-option');
        if (options.length){
          for (let option of options) {
            option.addEventListener('click',function (){
              _.selectOptionClick({
                item:option,
                cont:select,
                head:head
              })
            })
          }
        }
      }
    }
  }
  selectHeadClick(selectData){
    let select = selectData.cont;
    select.classList.toggle('active');
  }
  selectOptionClick(selectData){
    let btn = selectData.item;
    let select = selectData.cont;
    let head = selectData.head;
    let input = select.firstElementChild;
    let value = btn.getAttribute('data-value') ? btn.getAttribute('data-value') : btn.textContent;
    input.value = value;
    head.firstElementChild.innerHTML = btn.innerHTML;
    select.classList.remove('active');
  }

  pageSelectorsHandlers(){
    const _ = this;
    let buttons = document.querySelectorAll('.bag-nav-btn');
    if (buttons.length) {
      let pages = document.querySelectorAll('.page');
      let next = document.querySelector('.bag-nav-next');
      for (let button of buttons) {
        button.addEventListener('click',function () {
          _.pagesControlRemoveActive(buttons);
          _.pageSelect(button,pages,next);
        })
      }
      next.addEventListener('click',function () {
        _.pageNextClick(next,buttons,pages);
      })
    }
  }
  pagesControlRemoveActive(buttons){
    for (let btn of buttons) {
      btn.classList.remove('active');
    }
  }
  pageSelect(button,pages,next){
    let position = parseInt(button.getAttribute('data-pos'));
    button.classList.add('active');
    for (let page of pages) {
      page.style.transform = `translateX(${position * -100}%)`
    }
    next.setAttribute('data-pos',position);
    if (position === 2) next.style = 'display:none;'
    else next.style = '';
  }
  pageNextClick(button,buttons,pages){
    let position = parseInt(button.getAttribute('data-pos'));
    if (position < 2) {
      position += 1;
      if (position === 2) button.style = 'display:none;'
      else button.style = '';
      this.pagesControlRemoveActive(buttons);
      button.setAttribute('data-pos',position);
      buttons[position].classList.add('active');
      for (let page of pages) {
        page.style.transform = `translateX(${position * -100}%)`
      }
    }
  }

  bagHandlers(){
    let bag = document.querySelector('.bag');
    if (bag) {
      let startButton = document.querySelector('.start-button');
      startButton.addEventListener('click',function (e) {
        e.preventDefault();
        bag.classList.add('active')
      });
      let cancel = document.querySelector('.bag .cancel');
      cancel.addEventListener('click',function () {
        bag.classList.remove('active')
      })
    }
  }

  detailsHandler(){
    let table = document.querySelector('.search-results-table');
    if (table) {
      let details = document.querySelector('.details');
      table.addEventListener('click',function (e){
        details.classList.add('active');
      });
      let closeBtn = document.querySelector('.details-close');
      closeBtn.addEventListener('click',function (e){
        details.classList.remove('active');
      })
    }
  }

  patientHandlers(){
    let newPat = document.querySelector('.new-patient');
    if (newPat) {
      let addBtn = document.querySelector('.add-patient');
      addBtn.addEventListener('click',function (e){
        newPat.classList.add('active');
      })
      let cancel = newPat.querySelector('.cancel');
      cancel.addEventListener('click',function (e){
        newPat.classList.remove('active');
      })
    }
  }

  statusHandlers(){
    const _ = this;
    let statusInputs = document.querySelectorAll('.bag-nav-btn .value');
    if (statusInputs.length) {
      for (let statusInput of statusInputs) {
        _.statusValuesShow(statusInput);
      }
    }
  }
  statusValuesShow(statusInput,value = null){
    console.log(value)
    let statusBtn = statusInput.closest('.bag-nav-btn');
    let text = statusBtn.querySelector('.text');

    if (value === null) value = parseInt(statusInput.value);
    if (value < 0) value = 0;
    else if (value > 100) value = 100;

    let right = statusBtn.querySelector('.right span');
    let left = statusBtn.querySelector('.left span');

    if (value < 100) {
      statusBtn.classList.remove('ready');
      text.textContent = value + '%';
    } else {
      statusBtn.classList.add('ready');
      text.textContent = '';
    }

    if (value <= 50) {
      let leftStyle = left.getAttribute('style');
      if (leftStyle) {
        leftStyle = leftStyle.split('deg')[0];
        leftStyle = parseInt(leftStyle.split('(')[1]);
      }
      if (leftStyle) {
        left.setAttribute('style','transform:rotate(0deg)');
        setTimeout(function (){
          right.setAttribute('style',`transform:rotate(${value * 3.6}deg)`)
        },250)
      }
      else right.setAttribute('style',`transform:rotate(${value * 3.6}deg)`);
    }
    if (value > 50) {
      right.setAttribute('style',`transform:rotate(180deg)`);
      setTimeout(function (){
        left.setAttribute('style',`transform:rotate(${(value - 50) * 3.6}deg)`)
      },250)
    }
  }

  init(){
    const _ = this;
    _.selectHandlers();
    _.pageSelectorsHandlers();
    _.bagHandlers();
    _.detailsHandler();
    _.patientHandlers();
    _.statusHandlers();
    setTimeout(function (){_.statusValuesShow(document.querySelector('.Patient-btn'),0)},4000)
  }
}
new Front();
