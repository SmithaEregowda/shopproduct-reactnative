let API_PATH='https://shop-products-api-1q6w.vercel.app';

export  function signup(requestOptions) {
    const data =fetch(`${API_PATH}/api/user/signup`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   
   export  function login(requestOptions) {
       const data =fetch(`${API_PATH}/api/user/login`,requestOptions)
          .then(res => {
              return res.json();
          }).then(data=>{return data;} )
              return data;
      }