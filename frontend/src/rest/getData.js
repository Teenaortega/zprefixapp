const getData = async () => {

    const options = new Headers({
      'Content-type': 'application/json',
    });
    const res = await fetch('http://localhost:8081/users', options);
    const data = await res.json();
    return data;
  }
  
  export default getData;