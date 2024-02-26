const post = async(url,data)=>{
    try{
        const apiResponse = await fetch(url,{
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body:JSON.stringify(data)
          })
          const result = await apiResponse.json();
          if (!apiResponse.ok){
            throw new Error(result.error)
          }
          return result;

    }catch(error){
        throw new Error(error.message);
    }
}
export const httpMethods = {post}