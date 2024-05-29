let API_PATH='https://shop-products-api-1q6w.vercel.app'

export  function postOrder(requestOptions) {
    const data =fetch(`${API_PATH}/api/orders/create`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   export function CancelOrder(requestOptions,orderId){
    const data =fetch(`${API_PATH}/api/orders/cancelorder/${orderId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   export  function getOrdersByUser(userId,requestOptions) {
    const data =fetch(`${API_PATH}/api/orders/${userId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }

   export  function getSingleOrder(orderId,requestOptions) {
    const data =fetch(`${API_PATH}/api/orders/order/${orderId}`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }
   
   
   export  function postPayment(requestOptions) {
    const data =fetch(`${API_PATH}/api/pay`,requestOptions)
       .then(res => {
           return res.json();
       }).then(data=>{return data;} )
           return data;
   }