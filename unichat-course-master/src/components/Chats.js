import React, {useRef, useState ,useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { ChatEngine } from "react-chat-engine";
import { auth } from '../firebase';
import { useAuth } from "./contexts/AuthContext";
import axios from "axios"

const Chats = () =>{

    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    console.log(user);

    //Cuando se vayas a deslogear

    const handleLogout = async() =>{
        await auth.signOut();

        history.push('/')
    }

    //Para obtener la imagen del perfill de google/facebook

    const getFile = async(url)=>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() =>{
        if(!user){
            history.push('/');

            return;

        }

        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "project-id": "895c91ee-421a-46cb-9b3b-e8533e6f1b96",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(() =>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) =>{
                    formdata.append('avatar', avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        { headers: { "private-key": "44c1ec2b-66ba-4850-9241-67e5588099e3" }}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })

    }, [user, history]);

    if(!user || loading) return 'Loading...'

    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    UniChat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    LogOut
                </div>

            </div>
            
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="895c91ee-421a-46cb-9b3b-e8533e6f1b96"
                userName = {user.email}
                userSecret= {user.uid}
            
            />
        </div>
    );
}

export default Chats;