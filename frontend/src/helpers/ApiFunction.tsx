import axios from "axios";

const host = "http://localhost:8080/api/";
let token = localStorage.getItem('token');


export async function ApiFunction(url: string, data: {}, method: 'get' | 'post' | 'put' | 'delete', userOperation: boolean)  {
        try {
          let response;
          if(userOperation){
              response = await axios[method](host + url, data);
          }else{ 
            if(localStorage.getItem('token') !== null){
              let config = {
                headers: {
                   'Authorization': "Bearer" + " " + localStorage.getItem('token'),
                   'Content-Type': 'application/json'
                }
                 
             }
              if(url.includes("-")){
                  response = await axios[method](host + url, config)
              }else{
                response = await axios[method](host + url,  data,  config );
              }
              
              
              
              }
            }
           
           
           return response;
        } catch (error) {
          console.error(error);
        }

  }