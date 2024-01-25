import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlImage } from "../../../config";

import PostServices from "../../../services/PostServices";
import PostItem from "../Post/PostItem";

function PostDetail(){
    const{slug}=useParams();
    const[post,setPost]=useState([]);
    const[posts,setPosts]=useState([]);
    const[title,setTitle]=useState("");
    document.title=title;
    useEffect(function(){
        ( async()=>{
            try{
            const result=await PostServices.getPostBySlug(slug);
            setPost(result.post);
            setPosts(result.post_orther);
            setTitle(result.post.title)
        }
        catch(error){
            console.error(error)
        }
    })();
    },[slug]);
    return(
        <section className="maincontent">
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-6">
                        <img src={urlImage+"post/"+post.image} className="img-fluid" alt="hinh san pham"/>
                    </div>
                    <div className="col-md-6">
                        <h1>{post.title}</h1>
                       
                    </div>
                </div>
                <h2>CHI TIẾT BÀI VIẾT</h2>
                <div className="row">
                    <div className="col-12">
                        {post.detail}
                    </div>
                </div>
                <h2 className="text-center m-4">bài viết liên quan</h2>
                <div className="row m-4">
                    {posts.map(function(post,index){
                        return<PostItem key={index} post={post}/>
                    })}
                </div>
            </div>
        </section>
    );
}
export default PostDetail;