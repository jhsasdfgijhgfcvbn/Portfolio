var typed=new Typed(".typing",{
    strings:["","Frontend Developer","Backend Developer","React JS Developer","Cyber Security Analyst","Freelancer"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})
/*Aside */
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section"),
  totalSection = allSection.length;
  for (let i = 0; i < totalNavList; i++) 
  {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function () 
    {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) 
        {
            if(navList[j].querySelector("a").classList.contains("active"))
            {
                addBackSection(j);
               // allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if(window.innerWidth < 1200)
        {
            asideSectionTogglerBtn();
        }
    });
  }
  function removeBackSection()
  {
    for (let i = 0; i < totalSection; i++) 
    {
        allSection[i].classList.remove("back-section");
    }
  }
  function addBackSection(num)
  {
    allSection[num].classList.add("back-section");
  }
  function showSection(element) 
  {
    for (let i = 0; i < totalNavList; i++)
    {
        allSection[i].classList.remove("active");
        allSection[i].classList.add("hidden");
    }
    const target=element.getAttribute("href").split("#")[1];
    document.querySelector("#"+target).classList.add("active");
    document.querySelector("#"+target).classList.remove("hidden");
  }
  function updateNav(element)
  {
    for (let i = 0; i < totalNavList; i++)
    {
        navList[i].querySelector("a").classList.remove("active");
        const target=element.getAttribute("href").split("#")[1];
        if(target===navList[i].querySelector("a").getAttribute("href").split("#")[1])
        {
            navList[i].querySelector("a").classList.add("active");
        }
    }
  }
  document.querySelector(".hire-me").addEventListener("click",function()
  {
    const sectionIndex=this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
  })
  const navTogglerBtn=document.querySelector(".nav-toggler"),
  aside=document.querySelector(".aside");
  navTogglerBtn.addEventListener("click",()=>
  {
    asideSectionTogglerBtn();
  })
  function asideSectionTogglerBtn()
  {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++)
    {
        allSection[i].classList.toggle("open");
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const navbarLinks = document.querySelectorAll('.aside ul li a');
    const sections = document.querySelectorAll('.section');

    // Function to show section based on the hash
    function showSectionBasedOnHash() {
        const hash = window.location.hash.substring(1); // Get the hash without the #
        const targetSection = document.getElementById(hash);

        if (targetSection) {
            // Hide all sections
            sections.forEach(section => {
                section.classList.add('hidden');
            });

            // Show the target section
            targetSection.classList.remove('hidden');
        } else {
            // If no valid hash is found, show the first section or a default section
            sections.forEach((section, index) => {
                if (index === 0) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        }
    }

    // Event listener for navbar links
    navbarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('data-target');

            // Update the URL hash without reloading the page
            window.location.hash = targetId;

            // Show the target section
            showSectionBasedOnHash();
        });
    });

    // Show the correct section based on the initial URL hash
    showSectionBasedOnHash();
});

const form=document.querySelector("form");
const fullName=document.getElementById("name");
const email=document.getElementById("email");
const subject=document.getElementById("subject");
const message=document.getElementById("message");
function sendEmail(){
    const bodyMessage=`Name: ${fullName.value}<br>Email: ${email.value}<br>Message: ${message.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "sairamgudla22@gmail.com",
        Password : "196962C1DEB1CAA97B25A117DB11DB8F77CB",
        To : 'sairamgudla22@gmail.com',
        From : "sairamgudla22@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message =>{
        if(message=="OK"){
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
              });
         }
        }
    );
}

function checkInputs(){
    const items=document.querySelectorAll(".form-control");

    for(const item of items){
        if(item.value===""){
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if(items[1].value!==""){
            checkEmail();
        }

        items[1].addEventListener("keyup",()=>{
                checkEmail();
        });

        item.addEventListener("keyup",()=>{
            if(item.value!==""){
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
        });
    }
}

function checkEmail(){
    const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const errorTextEmail=document.querySelector(".error-txt.email");
    if(!email.value.match(emailRegex)){
        email.classList.add("error");
        email.parentElement.classList.add("error");
        if(email.value!==""){
            errorTextEmail.innerText="Please enter a valid email address";
        }
        else{
            errorTextEmail.innerText="Email can't be empty";
        }
    }
    else{
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }

}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    checkInputs();

    if(!email.classList.contains("error") && !fullName.classList.contains("error") && !subject.classList.contains("error") && !message.classList.contains("error")){
        sendEmail();
        form.reset();
        return false;
    }
    
});


