import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Image,Text, View} from 'react-native'
import { RectButton, TouchableHighlight } from 'react-native-gesture-handler'
import Header from '../../components/Header/Header'
import styles from './styles'
import LoginBaker from '../../images/LoginBaker.png'
import Input from '../../components/Input/Input'
import api from '../../services/api'
import { Modal } from 'react-native-paper'


export default function Login(){

    const [user,setuser] = useState("")
    const [passwd, setPasswd] = useState("") 
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation()

    function handleNavigateToRegister(){
        navigation.navigate('Register')
    }

    async function handleNavigateToProfile(){
        const data = {
            userName: user,
            password: passwd
        }

        console.log(data)

        try {
            await api.post('login',data)
            navigation.navigate('Profile') 
        } catch (err) {
            if(err.response.status == 400){
                console.log(err.response.status)
                setModalVisible(true)
                setuser('')
                setPasswd('')
                return
            }
        }

    }

    function handleNavigateToResetPasswd(){
        navigation.navigate('ResetPasswd')
    }


    useEffect(() => {
        setuser('')
        setPasswd('')
        setModalVisible(false)
    },[])

    return(
        <View style={styles.container}>
            <Header title="Faça Login para continuar" />
            <Image style={styles.Image} source={LoginBaker} />

            <Input 
            value={user}
            setData={setuser}
            name="Usuário :" 
            placeholder="Seu nome de usuário" 
            options={{
                titleMode: 'Light'
            }} 
            />


            <Input 
            value={passwd}
            setData={setPasswd}
            name="Senha :" 
            placeholder="Informe sua senha" 
            options={{
                titleMode: 'Light'
            }} 
            />

            <RectButton onPress={handleNavigateToResetPasswd} style={{alignSelf: 'flex-end', marginRight:60}}>
                <Text style={styles.passwordText}>Esqueci minha senha</Text>
            </RectButton>
            <RectButton onPress={handleNavigateToProfile} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Entrar</Text>
            </RectButton>
            <RectButton style={{marginTop:28, flexDirection: 'row'}} onPress={handleNavigateToRegister}>
                <Text style={styles.GoToRegisterText}>Não possui uma Conta? </Text><Text style={styles.GoToRegisterTextLink}>Clique aqui</Text>
            </RectButton>

            <Modal
                visible={modalVisible}
            >
                <View style={styles.ModalView} >
                    <Text style={styles.ModalTitleText}>Erro!</Text>
                    <Text style={styles.ModalText}>Verifique se o usuario e senha estam corretos e tente novamente</Text>
                    <RectButton style={styles.ModalButton} onPress={()=>setModalVisible(false)} ><Text style={styles.ModalButtonText} >Ok</Text></RectButton>
                </View>
            </Modal>

        </View>
    )
}
