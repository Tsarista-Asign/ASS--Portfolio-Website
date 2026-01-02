const info = document.querySelectorAll('.content');
const infotitle = document.querySelector("#aboutme");
const skill = document.querySelectorAll('.skill');
const skilltitle = document.querySelector("#myskill");
const project = document.querySelectorAll('.project');
const projecttitle = document.querySelector("#myproj");
const contact = document.querySelectorAll('.cusinfo');
const contacttitle = document.querySelector("#contactus");

info.forEach(info => info.classList.add("offscreen"));
skill.forEach(skill => skill.classList.add("offscreen"));
project.forEach(project => project.classList.add("offscreen"));
contact.forEach(contact => contact.classList.add("offscreen"));
infotitle.classList.add("offscreen");

const observerInfo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            info.forEach(item => {
                item.classList.remove("offscreen");
                item.classList.add("visible");
            });
            infotitle.classList.remove("offscreen");
            infotitle.classList.add("visible");
        } else {
            info.forEach(item => {
                item.classList.remove("visible");
                item.classList.add("offscreen");
            });
            infotitle.classList.remove("visible");
            infotitle.classList.add("offscreen");
        }
    });
}, {
    threshold: 0.3
});

const observerSkills = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skill.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove("offscreen");
                    item.classList.add("visible");
                }, index * 30);
            });
        } else {
            skill.forEach(item => {
                item.classList.remove("visible");
                item.classList.add("offscreen");
            });
        }
    });
}, {
    threshold: 0.3
});

const observerProject = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            project.forEach((item, index) => {
                item.classList.remove("offscreen");
                item.classList.add("visible");
            });
        } else {
            project.forEach(item => {
                item.classList.remove("visible");
                item.classList.add("offscreen");
            });
        }
    });
}, {
    threshold: 0.3
});

const observerContact = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            contact.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove("offscreen");
                    item.classList.add("visible");
                }, index * 100);
            });
        } else {
            contact.forEach(item => {
                item.classList.remove("visible");
                item.classList.add("offscreen");
            });
        }
    });
}, {
    threshold: 0.3
});

observerInfo.observe(infotitle);
observerSkills.observe(skilltitle);
observerProject.observe(projecttitle);
observerContact.observe(contacttitle);


function sendmes() {
    document.getElementById('name-error').innerText = '';
    document.getElementById('email-error').innerText = '';
    document.getElementById('phone-error').innerText = '';

    const name = document.getElementById('cusinfo1').value.trim();
    const email = document.getElementById('cusinfo2').value.trim();
    const phone = document.getElementById('cusinfo3').value.trim();

    let isValid = true;

    if (!name) {
        document.getElementById('name-error').innerText = 'Name cannot be empty.';
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        document.getElementById('email-error').innerText = 'Email cannot be empty.';
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById('email-error').innerText = 'Invalid email format.';
        isValid = false;
    }

    if (!phone) {
        document.getElementById('phone-error').innerText = 'Phone number cannot be empty.';
        isValid = false;
    } else if (phone.length < 10) {
        document.getElementById('phone-error').innerText = 'Phone number must be at least 10 digits.';
        isValid = false;
    }

    if (isValid) {
        let inputs = document.querySelectorAll("input");
        let textareas = document.querySelectorAll("textarea");
        inputs.forEach(input => {
            if (input.type !== "button" && input.type !== "submit" && input.type !== "reset") {
                input.value = "";
            }
        });
        textareas.forEach(input => {
            if (input.type !== "button" && input.type !== "submit" && input.type !== "reset") {
                input.value = "";
            }
        });
        alert('Message sent successfully!');
    }
}

