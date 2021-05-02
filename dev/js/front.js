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



  init(){
    const _ = this;
    _.selectHandlers();
  }
}
new Front();
