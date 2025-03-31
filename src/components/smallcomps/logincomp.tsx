import { Button, Flex, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useState } from "react";
const LoginComp = (props:any) => {

    const [loginForm, setLoginForm] = useState({email: "", password: ""})

    const [isLoading, setIsLoading] = useState(false);

    async function LoginUser(){

        if(loginForm.password == "")
        {
            return
        }

        if(loginForm.password == "nostratoken"){
            props.setDidSignIn(true)
        }
    }

    return(
        <Flex align='center' justify='center' style={{width:"100vw", height:"100vh",
            backgroundColor:"black",
            position:"fixed",top:0,
            zIndex:200
        }}>
            <Flex vertical align='center' justify='center' style={{width:"50%", height:400, backgroundColor:"black",
                borderRadius:24
            }}>

                <h2>$OCN COMING SOON</h2>

                <Input.Password
                style={{width: 300, marginTop: 5}}
                onChange={(e) => setLoginForm({...loginForm, password: e.currentTarget.value})}
                placeholder="password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : 
                <EyeInvisibleOutlined />
                )}
                />

                <Button onClick={() => LoginUser()}
                //disabled={isLoading}
                style={{width: 200, height: 40, marginTop: 10,
                    backgroundColor:"#e84839"
                }}>
                    <h4 style={{marginBlockStart:0, marginBlockEnd:0}}>Login</h4>
                </Button>

            </Flex>

        </Flex>
    )

}

export default LoginComp;