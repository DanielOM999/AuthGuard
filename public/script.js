function createNestedDivs(depth) {
    function createDiv(className) {
        const div = document.createElement('div');
        div.className = className;
        return div;
    }

    const container = document.querySelector('.container2');
    if (!container) {
        console.error("Container element not found.");
        return;
    }

    let currentElement = container;

    for (let i = 0; i < depth; i++) {
        const newDiv = createDiv('square');
        
        const blackDiv = createDiv('square black');

        newDiv.appendChild(blackDiv);

        currentElement.appendChild(newDiv);

        currentElement = blackDiv;
    }
    setTimeout(function(){
        if (container) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

            const timeline = gsap.timeline({ default: { duration: .3 }})
            timeline
                .to('body', {
                    duration: 2,
                    backgroundColor: '#1A1A2E',
                    ease: "power2.inOut"
                })
                .to('.background-animation', {
                    opacity: 1,
                    ease: "bounce"
                }, '>0')
                .to('.login-container', {
                    opacity: 1,
                    scale: 1,
                    rotateY: 0,
                    ease: "bounce.out"
                })
                .from('.form-control', {
                    opacity: 0,
                    stagger: .2,
                    x: '-50%',
                    ease: "power4.inOut"
                }, '>.1')
                .from('.or-divider', {
                    duration: 3,
                    y: '25vh',
                    scale: 0,
                    ease: "power4.inOut"
                }, 2)
                .from('.social-btn', {
                    stagger: .1,
                    y: '50vh',
                    scale: 0,
                    ease: "elastic"
                }, 4)
            } else {
            console.error("Container element not found.");
        }
   }, 2000);
}

function placeForm() {
    const lC = document.getElementById("lC");
    if (lC) {
        let curWidth = Math.sqrt(window.innerWidth);
        
        lC.style.width = "100%";
        lC.style.left = curWidth + "px";
        
    } else {
        console.log("Element with id 'lC' not found.");
    }
}

window.addEventListener("resize", () => {
    placeForm()
});

window.onload = function() {
    const urlObj = new URL(window.location.href);
    const queryString = urlObj.search;
    const params = new URLSearchParams(queryString);
    let err1 = document.getElementById("onEmail");
    let err2 = document.getElementById("onPassword");
    let hlashErr = document.getElementById("errorFlash");

    
    if (params.get('error')) {
        err1.style.display = "block";
        err1.innerText = params.get('error');
        err2.style.display = "block";
        err2.innerText = params.get('error');
    } else if (err1 && err2) {
        err1.style.display = "none";
        err2.style.display = "none";
    }

    if (hlashErr.innerText != "") {
        err1.style.display = "block";
        err1.innerText = hlashErr.innerText;
        err2.style.display = "block";
        err2.innerText = hlashErr.innerText;
    }
    
    placeForm()
    if (hlashErr.innerText != "") {
        console.log(hlashErr.innerText);
        document.querySelector("body").style.backgroundColor = "#1A1A2E";
        document.querySelector(".background-animation").style.opacity = "1";
        let LC = document.querySelector(".login-container");
        LC.style.opacity = "1"
        LC.style.transform = "scale(1) rotateY(0deg)";

        setTimeout(function(){
            err1.style.display = "none";
            err2.style.display = "none";
            const urlObj = new URL(window.location.href);
            urlObj.search = "";
            window.history.replaceState({}, '', urlObj.toString());
        }, 5000);
    } else {
        if(!params.get('error')) {
            createNestedDivs(20);
        } else {
            document.querySelector("body").style.backgroundColor = "#1A1A2E";
            document.querySelector(".background-animation").style.opacity = "1";
            let LC = document.querySelector(".login-container");
            LC.style.opacity = "1"
            LC.style.transform = "scale(1) rotateY(0deg)";
    
            setTimeout(function(){
                err1.style.display = "none";
                err2.style.display = "none";
                const urlObj = new URL(window.location.href);
                urlObj.search = "";
                window.history.replaceState({}, '', urlObj.toString());
            }, 5000);
        }
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    const x = Math.random() * window.innerWidth;
    particle.style.left = `${x}px`;
    particle.style.top = `${window.innerHeight + 10}px`;

    const hue = Math.random() * 360;
    particle.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;

    const duration = Math.random() * 5 + 5;
    particle.style.animation = `float ${duration}s linear infinite`;

    document.getElementById('particles').appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

setInterval(createParticle, 200);
