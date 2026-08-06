const generateOrderNumber=(id)=>{
    const now=new Date();
    const year=now.getFullYear();
    const month=String(now.getMonth()+1).padStart(2,"0");
    const day=String(now.getDate()).padStart(2,"0");
    // const random=Math.floor(Math.random()*9000+1000);
    const sequence = String(id).padStart(6, "0");

    return `NGRI-${year}${month}${day}-${sequence}`;
};
export default generateOrderNumber;

