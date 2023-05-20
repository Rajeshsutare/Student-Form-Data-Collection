

let cl = console.log;

const stdForm =document.getElementById("stdForm")


const stdInfo =document.getElementById("stdInfo")
const fnameControls =document.getElementById("fname")
const lnamControls =document.getElementById("lname")
const emailControls =document.getElementById("email")
const contactControls =document.getElementById("contact")

const submitBtn = document.getElementById("submitBtn")
const updateBtn = document.getElementById("updateBtn")
const resetBtn = document.getElementById("resetBtn")



const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


let stdArray =[
    // {
    //     fname :'Tony',
    //     lname :'starc',
    //     email :'Tony@starc.com',
    //     contact :123456789,
    //     edit : '<i class="fa-solid fa-pencil fa-2x text-success"></i>',
    //     delete : '<i class="fa-solid fa-trash fa-2x text-danger"></i>'
    // }
];
// if(localStorage.getItem("stdForm")){
//     stdArray =JSON.parse(localStorage.getItem("stdForm"));    //null
//     // localStorage.removeItem("stdForm");
//     // localStorage.clear();
// }

// stdArray =JSON.parse(localStorage.getItem("stdForm")) || []
// cl(stdArray)

//nullish collision
stdArray = JSON.parse(localStorage.getItem('stdForm')) ?? [];
cl(stdArray)


const onEdit = (ele) =>{
    cl(ele.closest('tr').getAttribute('id'))
    let editId = ele.closest('tr').getAttribute('id');
    localStorage.setItem('editId',editId)
    let editObj = stdArray.find(std=>std.id===editId)
    cl(editObj)

    fnameControls.value = editObj.fname;
    lnamControls.value = editObj.lname;
    emailControls.value = editObj.email;
    contactControls.value = editObj.contact;

    updateBtn.classList.remove('d-none');
    resetBtn.classList.add('d-none');
    submitBtn.classList.add('d-none')

}

const onDelete = (ele) =>{
    // cl(ele)
    let deleteId =ele.closest('tr').id;
    cl(deleteId)

    let deleteIndx = stdArray.findIndex(std=>std.id === deleteId)
    cl(deleteIndx)
    stdArray.splice(deleteIndx,1)
    localStorage.setItem("stdForm",JSON.stringify(stdArray));
    templating(stdArray)

    alert("Form Deleted Successfully...!!!")
}


function templating(arr){
    let result = '';
    arr.forEach((e,i)=>{
        result += `
                <tr id="${e.id}">
                    <th>${i+1}</th>
                    <th>${e.fname}</th>
                    <th>${e.lname}</th>
                    <th>${e.email}</th>
                    <th>${e.contact}</th>
                    <th>
                        <button class="btn btn-primary" onclick="onEdit(this)">
                            <i class="fa-solid fa-pen-to-square "></i>
                        </button>
                    </th>
                    <th>
                        <button class="btn btn-danger" onclick="onDelete(this)">
                        <i class="fa-solid fa-trash  "></i>
                         </button>
                    </th>
                </tr>
                
                `;
    })
    stdInfo.innerHTML=result;
}

templating(stdArray);



const onSubmitBtn = (eve) =>{
    eve.preventDefault();
    cl('added')
    let stdObj = {
        fname :fnameControls.value,
        lname :lnamControls.value,
        email :emailControls.value,
        contact :contactControls.value,
        id : generateUuid()
    }
    
stdArray.push(stdObj);
eve.target.reset()
localStorage.setItem("stdForm",JSON.stringify(stdArray));
templating(stdArray);

alert("Form submitted Successfully...!!!")

}



const onUpdateBtn = (eve) =>{
let updateId = localStorage.getItem("editId")
cl(`updated ${updateId}`)

cl(fnameControls.value )
cl(lnamControls.value) 
cl(emailControls.value) 
cl(contactControls.value)


stdArray.forEach(obj=>{
    if(obj.id===updateId){
        obj.fname = fnameControls.value;
        obj.lname = lnamControls.value;
        obj.email = emailControls.value;
        obj.contact = contactControls.value;
    }
})
    localStorage.setItem("stdForm",JSON.stringify(stdArray))
    templating(stdArray)
    alert("Form Updated Successfully...!!!")
    updateBtn.classList.add('d-none')
    submitBtn.classList.remove('d-none')
    resetBtn.classList.remove('d-none')
    stdForm.reset();

}



stdForm.addEventListener('submit',onSubmitBtn)
updateBtn.addEventListener("click",onUpdateBtn)