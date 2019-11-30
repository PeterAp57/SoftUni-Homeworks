function solve(){

    class Employee {
        
        constructor(name,age){
            if(new.target === Employee){
                throw new Error("Cannot instantiate directly.");
            }
            this.name = name;
            this.age = age;
            this.Salary = 0;
            this.tasks = [];
        }

        work(){
            let task = this.tasks.shift();
            console.log(this.name + task);
            this.tasks.push(task);
        }

        getSalary(){
            return this.Salary;
        }

        collectSalary(){
            console.log(`${this.name} received ${this.getSalary()} this month`);
        }

    }

    class Junior extends Employee{
        constructor(name,age){
            super(name,age);
            this.tasks.push(`${name} is working on a simple task.`);
        }
    }

    class Senior extends Employee{
        constructor(name,age){
            super(name,age);
            this.tasks.push(`${name} is working on a complicated task.`);
            this.tasks.push(`${name} is taking time off work.`);
            this.tasks.push(`${name} is supervising junior workers.`);
        }
    }

    class Manager extends Employee{
        constructor(name,age){
            super(name,age);
            this.divident = 0;
            this.tasks.push(`${name} scheduled a meeting.`);
            this.tasks.push(`${name} is preparing a quarterly report.`);
        }

        getSalary(){
            return this.salary + this.divident;
        }


    }

    let a = new Employee("pesho",12);
    console.log(a.collectSalary());

return {Employee: Employee,
    Junior: Junior,
    Senior: Senior,
    Manager: Manager};
}
