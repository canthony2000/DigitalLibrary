class LibReSTinterface {
  constructor(){
    this.libraryURL = 'http://127.0.0.1:3002/Library';
  };

    _handleGetBooks(){
      $.ajax({
        url: this.libraryURL,
        dataType:'json',
        method: 'GET',
        success: data => {
          console.log(data);
        }
      });
    };

  _handleAddBook(){
  var formData = this._getFormData();
    $.ajax({
      url: this.libraryURL,
      dataType:'json',
      method:'POST',
      data: formData,
      success: data => {
        console.log(data);
      }
    })
  };

    _getFormData(){
      let aForm = $('form').serializeArray();
      let oData = new Object();
      aForm.map((value, index)=>{
        oData[value.name] = value.value;
      });
      return oData;
    };

  };

  $(function(){
    window.glibReSTinterface = new LibReSTinterface();
    //window.libReSTinterface.init();
  });
