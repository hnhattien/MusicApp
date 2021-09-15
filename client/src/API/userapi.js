const user = async () => {
    let endpoint = `/user/${localStorage.getItem("userid")}`;
    let response = await fetch(endpoint,{
        method: "GET",
        headers:{
            "Accept": "application/json",
            "Content-Type":"application/json"
        }
    })
}