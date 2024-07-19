let title = document.getElementById('title');
let description = document.getElementById('description');
let priority = document.getElementById('priority');
let date = document.getElementById('date');

let tbody =document.getElementById('view');

let isedit =  false ;
let isindix;

const getdata = ()=>{
    let data=JSON.parse(localStorage.getItem('user'));

    if(data){
        return data ;
    }else{
        return[];
    }
}
let storage = getdata();

const addData =()=>{
    event.preventDefault()
    let userDetalis ={
        id :isindix?isindix: Math.floor(Math.random()*1000),
        title : title.value,
        description : description.value,
        priority : priority.value,
        date: date.value,
    }

    if(isedit){

        let data = [...storage];

        // updtada

        const Upedtedata  = data.map((rec)=> {
            if(rec.id  === isindix){
                return userDetalis;
            } else{
                return rec;
            }
        });

        storage = Upedtedata;

        isedit = false;
        isindix = undefined ;
    }else{


        storage = [...storage , userDetalis];
    }


    console.log("user",userDetalis)


    localStorage.setItem('user',JSON.stringify(storage));
    
    title.value = "";
    description.value = "";
    date.value = "";
    // priority.value = "";
    viewdata();
}
const viewdata=()=>{
    tbody.innerHTML='';
    storage.forEach(ele => {
        tbody.innerHTML+=`<tr>
            <th scope="row">${ele.id}</th>
            <td>${ele.title}</td>
            <td>${ele.description}</td>
            <td>${ele.date}</td>
            <td>${ele.priority}</td>
              <td>
            <button  class="btn btn-primary" onclick="return singlerec(${ele.id})">Edit</button>
            ///
            <button  class="btn btn-info" onclick="return del(${ele.id})">delet</button>
          </td>

        </tr>
        
        `;        
    });
}
viewdata();
const singlerec =(id)=>{
    // console.log("hello",id)
    let data=[...storage];

    let singlerec = data.filter((f)=>{
        return f.id == id;
    });
    title.value=singlerec[0].title;
    description.value=singlerec[0].description;
    date.value=singlerec[0].date;
    priority.value=singlerec[0].priority;

    isedit = true;
    isindix = id;
}
const deleteData = (id) => {
    // console.log("deleteData")
    let data = [...storage];

    let deleteData = data.filter((del) => {
        return del.id !== id;
    });
    localStorage.setItem('Product', JSON.stringify(deleteData));

    storage = deleteData;

    dataview();


}
const del =(id)=>{
    // console.log("hello",id)
    let data=[...storage];

    let del = data.filter((f)=>{
        return f.id !== id;
    });
   
    localStorage.setItem('user',JSON.stringify(del));
    
    storage=del;
    viewdata();
}