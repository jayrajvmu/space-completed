



// let decodedCookie = decodeURIComponent(document.cookie);
decodedCookie =document.cookie.split("=")[1],
// 
// console.log('decodedC',document.cookie'); // => 'value'

console.log('document.cookie',decodedCookie)
// alert('decodedCookie',decodedCookie)
// const id=decodedCookie;

const input = {
    'user_id': decodedCookie,
  'valid_user':'true or false'
  }


