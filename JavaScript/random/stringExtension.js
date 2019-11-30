(function(){
    String.prototype.ensureStart = function(str){
        if(!this.startsWith(str)){
            return `${str}${this}`;
        }
        return this.toString();
    }
    
    String.prototype.ensureEnd = function(str){
        if(!this.endsWith(str)){
            return `${this}${str}`;
        }
        return this.toString();
    }
    
    String.prototype.isEmpty = function(){
        return this.toString() === "";
    }
    
    String.prototype.truncate = function(n){
        if( n< 4){
            return ".".repeat(n);
        }
        if(n >= this.length){
            return this.toString();
        }else{
            let i = this.substr(0,n-2).lastIndexOf(" ");
            if(i !== -1){
                return this.substr(0,i) + "...";
            }else{
                return this.substr(0, n-2) + "...";
            }
        }
    }
    
    String.format = function(string, ...params){
        params.forEach((e,i)=>{
            string = string.replace(`{${i}}`,e);
        })
        return string;
    }
}())



