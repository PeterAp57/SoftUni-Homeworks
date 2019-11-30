function solve(){
    return{
        elements: [],
        size: 0,
        add: function(e){
            this.elements.push(e);
            this.elements.sort((a,b)=> a-b);
            this.size += 1;
        },
        remove: function(i){
            if(i> -1 && i < this.elements.length){
                this.elements.splice(i,1);
                this.elements.sort((a,b)=> a-b);
                this.size -= 1;
            }
        },
        get: function(i){
            if(i> -1 && i < this.elements.length){
            return this.elements[i];
            }
        }     
    }
}