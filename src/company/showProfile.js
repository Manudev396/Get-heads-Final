import React from "react";
import firebase from './../firebase/firebase';

var ref = firebase.firestore();
var storage = firebase.storage();
var uri = "";


class ShowProfile extends React.Component{

    constructor(props){
        super(props);
        this.state={
            render: false
        }
        this.resumeRef = "";
        this.data = {
            name: "",
            age: "",
            email: "",
            gender: ""
        }
        console.log(props.username);
        
        ref.collection('credentials').doc(props.username).get().then(dat=>{
            console.log(dat.data()['name']);
            this.resumeRef = dat.data()['resumeref'];
            // console.log(document.getElementById("name"));
            // document.getElementById('name').innerHTML = dat.data()['name'];
            // document.getElementById('age').innerHTML = dat.data()['age'];
            // document.getElementById('email').innerHTML = dat.data()['email'];
            // document.getElementById('gender').innerHTML = dat.data()['gender'];
            this.data.name = dat.data()['name'];
            this.data.age = dat.data()['age'];
            this.data.email = dat.data()['email'];
            this.data.gender = dat.data()['gender'];
        }).then(()=>{
            storage.ref(this.resumeRef.toString()).getDownloadURL().then((url)=>{
                uri = url;
                console.log(uri);
                this.setState({render: true});
            })
        });
    }

    render(){
        return this.state.render ? (
            <div style={{fontSize:'20px',backgroundColor:'#20251f',marginLeft:'30px',padding:'30px'}}>
                <p style={{float:'left',color:'white'}}>Name:</p>  <p id='name' style={{color:'white'}}>&nbsp;&nbsp;{this.data.name}</p> <br/>
                <p style={{float:'left',color:'white'}}>Age:</p><p id='age' style={{color:'white'}}>&nbsp;&nbsp;{this.data.age}</p> <br/>
                <p style={{float:'left',color:'white'}}>Email:</p><p id='email' style={{color:'white'}}>&nbsp;&nbsp;{this.data.email}</p> <br/>
                <p style={{float:'left',color:'white'}}>Gender:</p><p id='gender' style={{color:'white'}}>&nbsp;&nbsp;{this.data.gender}</p>
                <br/>
                <br/>
                <iframe src={uri.toString()} width="100%" height="500px"></iframe>
            </div>
        ) : (<div>loading</div>);
    }
}

export default ShowProfile;