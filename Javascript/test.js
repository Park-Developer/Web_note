var table=document.querySelector(".js-Schedule__Table");


for(var i = 0; i < table.rows.length; i++) {
  table.rows[i].addEventListener('click', function() {
    var msg = 'JavaScript: ';
    for(var j = 0; j < this.cells.length; j++) {
      msg += this.cells[j].innerHTML;
      console.log(msg);
    }
    
  });
}

	