var flag = false;
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if (this.files && this.files[0]) {
            var img = document.querySelector('img');  // $('img')[0]
            img.src = URL.createObjectURL(this.files[0]); // set src to blob url
            flag = true;
            img.onload = imageIsLoaded();
        }
    });
  });
  
  function imageIsLoaded() { 
    return flag;
       //alert(this.src);  // blob url
    // update width and height ...s
  }