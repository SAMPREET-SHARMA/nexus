import { Button,Card,Typography } from "@mui/material"
import {useNavigate} from "react-router-dom"

function Home(){
    const navigate = useNavigate()

    return (
        <>
            <div style={{
                display:"flex",
                paddingTop:50,
                justifyContent:"center"
            }}>
                <Typography variant={'h4'} fontWeight="Bold" fontStyle='italic' fontSize={40} style={{
                    color:"#FFFFFF"
                }}>SPLYVERSE</Typography>
            </div>

            <div style={{
                display : "flex",
                justifyContent : "center"
            }} >
                <Card variant={'outlined'} style={{
                    width : 500,
                    height : 200,
                    display : "flex",
                    justifyContent : "center",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor:"transparent"
                }}>
                    
                        
                    <Button variant={'contained'}
                        onClick={ ()=>{
                            navigate('/logistics')
                        }
                    }>Logistics</Button>
                    

                    <br/><br/>  
                    
                    <Button variant={'contained'}
                        onClick={ ()=>{
                            navigate('/retail')
                            } 
                        }
                        style={{
                            width:100,
                            height:40
                        }
                    }>Retail</Button>
                    
                </Card>
            </div>

        </>
    )
    
}

export default Home;

