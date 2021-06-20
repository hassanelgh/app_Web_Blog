let tableUser=document.querySelector("#users tbody")
let pereButton= document.querySelector("#users #btn-Page")
let i=0

function supprimer(e)
{
    if(confirm("Êtes-vous sûr de le supprimer"))
    {
        fetch("/users/"+e.getAttribute("id"),{
            method:'DELETE'
        }).then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
        window.location.href="/";
    }
    
    
    
}

function modifier(e)
{
    const id=document.querySelector("#formModefier #id")
    const username=document.querySelector("#formModefier #username")
    const email=document.querySelector("#formModefier #email")
    const password=document.querySelector("#formModefier #password")

    const roleAdmin=document.querySelector("#formModefier #role #Admin")
    const roleAuthor=document.querySelector("#formModefier #role #Author")
    const roleGuest=document.querySelector("#formModefier #role #Guest")
    roleAdmin.removeAttribute("selected")
    roleAuthor.removeAttribute("selected")
    roleGuest.removeAttribute("selected")

    id.setAttribute("value",e.getAttribute("id"))
    username.setAttribute("value",e.getAttribute("username"))
    email.setAttribute("value",e.getAttribute("email"))

    switch(e.getAttribute("role"))
    {
        case 'Admin':{
            roleAdmin.setAttribute("selected",'selected')
            break;
        }
        case 'Author':{
            roleAuthor.setAttribute("selected",'selected')
            break;
        }
        case 'Guest':{
            roleGuest.setAttribute("selected",'selected')
            break;
        }
    }
    
}

function getUsers(cb)
{
   
        fetch('/users')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
                cb(data)
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });
        
   
          
}


function getUsersL(Offset,Limit,cb)
{
   
        fetch('/users/?limit='+Limit+'&offset='+Offset)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
                cb(data)
        })
        .catch(function (err) {
            console.log("Something went wrong!", err);
        });

   
} 

function ajouterbutton(Offset,Limit)
{
    getUsersL(Offset,Limit,(users)=>{
        if(users.length!=0)
        {
            i++
            var btn = document.createElement("BUTTON");        // Créer un élément <button>
            btn.textContent=i
            btn.setAttribute("class","Btn-change-table btn btn-primary")
            btn.setAttribute("Offset",Offset)
            btn.setAttribute("Limit",Limit)
            btn.onclick=function(){
                tableUser.textContent="";
                pereButton.textContent="";
                i=0
                getUserPage(btn.getAttribute("Offset"),btn.getAttribute("Limit"))
            }
            pereButton.appendChild(btn);
            ajouterbutton(Offset+ Limit*1,Limit)
        }
    })


}
function getUserPage(Offset,Limit)
{
    getUsersL(Offset,Limit,(users)=>{
        users.forEach(u => {
            tableUser.innerHTML += "<tr> <td>" +u.id+"</td><td>"+u.username+"</td><td>"+u.email+"</td><td>"+u.role+"</td>" +'<td> <button type="button" class="btn btn-danger X'+u.id+ '" id="'+ u.id +'" onclick="supprimer(this)">X</button> </td>'+ '<td> <button type="button" class="btn btn-success O'+u.id+ '" id="'+ u.id +'" email="'+ u.email +'" username="'+ u.username +'" role="'+ u.role +'"onclick="modifier(this)" data-bs-toggle="modal" data-bs-target="#Modifier" ">O</button> </td> </tr>'   
        });
    })
    Offset=0
    ajouterbutton(Offset,Limit)
}

