var getData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({OS: 'Maverick'});
    }, 1000);
  })
}


getData().then((OSX) => {
  console.log(OSX);
})
