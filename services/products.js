let API_PATH='https://shop-products-api-1q6w.vercel.app';

export  function getAllProducts(requestOptions) {
    const data =fetch(`${API_PATH}/api/products?limit=20`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getAllProductsByIds(requestOptions,prodids) {
    const data =fetch(`${API_PATH}/api/products/prodids?prodIds=${prodids}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }