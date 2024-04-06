import { Button,Card,Typography } from "@mui/material"
import {useNavigate} from "react-router-dom"

function Home(){
    const navigate = useNavigate()

    return (
        <>
            <div style={{
                display:"flex",
                justifyContent:"center"
            }}>
                <Typography variant={'h4'}>Welcome admin</Typography>
            </div>

            <Card variant={'outlined'} style={{
                width : 400,
                height : 400,
                padding : 20,
                display : "flex",
                justifyContent : "space-evenly"
            }}>
                <Button variant={'contained'}
                        onClick={ ()=>{
                            navigate('/logistics/signin')
                        }
                        }>Signin</Button>

                <Button variant={'contained'}
                        onClick={ ()=>{
                            navigate('/logistics/signup')
                        }
                        }>Retail</Button>
            </Card>
        </>
    )

}

export default Home;