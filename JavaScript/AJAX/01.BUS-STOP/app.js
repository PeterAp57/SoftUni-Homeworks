function getInfo() {
    const stopId = document.getElementById("stopId");
    const stopName = document.getElementById("stopName");
    const bus = document.getElementById("buses");
    const fetchThisURL = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`;

    stopName.textContent = "";
    buses.innerHTML = "";
    fetch(fetchThisURL)
    .then(e => e.json())
    .then(data =>{
        const { name , buses } = data;
        stopName.textContent = name;
        console.log(data);
        Object.entries(buses)
        .forEach(([busId , busTime]) => {
            let li = document.createElement("li");
            li.textContent = `Bus ${busId} arrives in ${busTime} minutes`;
            bus.appendChild(li);
        });
    })
    .catch(ex => {
        stopName.textContent = "ERROR"
        console.log(ex);
    })
}128