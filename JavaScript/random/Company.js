class Company{
    departments;

    constructor(){
        this.departments = [];
    }

    addEmployee(name,salary,position,department){
        if(!name || !salary || salary < 0 || !position || !department){
            throw new Error("Invalid input!");
        }
        let exists = this.departments.find(e => e.name === department);

        if(!exists){
            exists = {
                name: department,
                employees: [],
                averageSalary: function(){
                   return this.employees.reduce((a,b) => a += b.salary,0)/this.employees.length
                }
            }
            this.departments.push(exists);
        }

        exists.employees.push({name,salary,position})
        
        return `New employee is hired. Name: ${name}. Position: ${position}`
    }

    bestDepartment(){
        const [best] = [...this.departments].sort((a,b)=> {return b.averageSalary() - a.averageSalary()});
        let result = `Best Department is: ${best.name}\nAverage salary: ${best.averageSalary().toFixed(2)}\n`
        result += [...best.employees].sort((a,b) => b.salary - a.salary || a.name.localeCompare(b.name))
        .map(e => `${e.name} ${e.salary} ${e.position}`).join("\n");
        return result.trim();
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());
