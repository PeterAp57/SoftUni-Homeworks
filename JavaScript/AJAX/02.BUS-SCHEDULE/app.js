function solve() {
    const arriveBtn = document.getElementById("arrive");
    const departBtn = document.getElementById("depart");
    const info = document.querySelector("#info > span");
    let currentId = "depot";
    let currentName ;

    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
        .then(r => r.json())
        .then(action)
        .catch(ex => {
            info.textContent = `Something went wrong`;
            console.log(ex)
        })
    }

    function arrive() {
        info.textContent = `Arriving at ${currentName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    function action(d){
        const { name, next } = d;
        currentId = next;
        currentName = name;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
        info.textContent = `Next stop ${name}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();