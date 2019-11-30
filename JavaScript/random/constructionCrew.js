function solve (obj){
    if(obj.dizziness){
            obj.levelOfHydrated = obj.levelOfHydrated + (0.1 * obj.weight)*obj.experience;
            obj.dizziness = false;
    }
return obj;
}

console.log(solve({ weight: 120,
    experience: 20,
    levelOfHydrated: 200,
    dizziness: true }));