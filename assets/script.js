function getToken(){return localStorage.getItem('token');}
function getUser(){try{return JSON.parse(localStorage.getItem('user'));}catch(e){return null;}}
function requireAuth(redirect='login.html'){if(!getToken()){window.location.href=redirect;}}
async function api(path,options={}){const opts=Object.assign({headers:{}},options);
if(!opts.headers['Content-Type'] && !(opts.body instanceof FormData)) opts.headers['Content-Type']='application/json';
const t=getToken(); if(t) opts.headers['Authorization']='Bearer '+t;
const res=await fetch(path,opts); if(res.status===401){localStorage.clear();window.location.href='login.html';return;}
const data=await res.json().catch(()=>({})); return {res,data};}


// Attach handler only if registerForm exists on page
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { res, data } = await api("/.netlify/functions/sendRegisterMail", {
      method: "POST",
      body: JSON.stringify({ name, email, password })
    });

    if (res.ok) {
      document.getElementById("msg").innerText = "✅ Account created. Check your email!";
      // if backend sends token + user, save it:
      // localStorage.setItem("token", data.token);
      // localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      document.getElementById("msg").innerText =
        "❌ Registration failed: " + (data.error || "Unknown error");
    }
  });
}
