(function solve(){

    class Post {
        constructor(title,content) {
            this.title = title,
            this.content = content
        }

        toString(){
            return `Post: ${this.title}\n
            Content: ${this.content}`
        }
    }

    class SocialMediaPost extends Post{
        constructor(title,content,likes,dislikes){
            super(title,content),
            this.likes = likes,
            this.dislikes = dislikes,
            this.comments = []
        }

        addComment(comment){
            this.comments.push(comment);
        }

        toString(){
            let result = `Post: ${this.title}\nContent: ${this.content}\nRating: ${this.likes - this.dislikes}`;
            let comments = "";
            if(this.comments.length > 0){
                comments = "Comments:\n" + 
                this.comments.reduce((a,b) =>{
                a += ` * ${b}\n`;
                return a;
            },"");
            result += `${comments.trim(0,comments.length-1)}`;
        }
            return result;
        }
       
    }

    class BlogPost extends Post{
        constructor(title,content,views){
            super(title,content),
            this.views = views;
        }

        view(){
        this.views += 1;
        return this;
        }

        toString(){
            return `Post: ${this.title}\nContent: ${this.content}\nViews: ${this.views}`;
        }
    }

    // let a = new SocialMediaPost("asd","asd",2,1);
    // a.addComment("coment1");
    // a.addComment("coment2");
    // console.log(a.toString());
    // let b = new BlogPost("asd","asd");
    // console.log(b.view());
    // console.log(b.view());

    return {Post,SocialMediaPost,BlogPost};
}())

