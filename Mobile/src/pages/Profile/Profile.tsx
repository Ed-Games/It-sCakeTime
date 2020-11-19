import React, { useState } from 'react'
import { Dimensions, Image, ImageBackground, Text, View } from 'react-native'
import Waves from '../../images/waves.png'
import styles from './style'

import Avatar from '../../images/avatar.png'
import WhatsappButton from '../../components/WhatsappButton/WhatsappButton'
import EmailButton from '../../components/EmailButton/EmailButton'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import ProductItem from '../../components/ProductItem/ProductItem'
import handleSelectImages from '../../utils/ImageUpload'

export default function Profile() {

    const navigation = useNavigation()
    const [images,setImages] = useState<string[]>([])
    const route = useRoute()
    const user = 'alguém'
    

    function handleNavigateToProfileProducts(){
        if(user){
            navigation.navigate('ViewYourProducts')
        }else{
            navigation.navigate('ProfileProducts')
        }

    }

    function handleNavigateToUpdateProfile(){
        navigation.navigate('UpdateProfile')
    }

    return(
        <View style={styles.container}>
            <View>
                <ImageBackground style={styles.Waves} source={Waves}>
                        <View style={{flexDirection: 'row'}}>
                            {user?(
                                <>
                                {images.length>0?(
                                    images.map((image,i,arr)=>{
                                        if(arr.length -1 ===i){
                                            {console.log({uri:image})}
                                            return(
                                                <>
                                                    <Image key={image} source={{uri: image}} style={styles.Avatar}/>
                                                    <RectButton key={image + 'button'} onPress={()=>setImages([])} style={styles.Savebutton}>
                                                        <Text style={styles.SavebuttonText}>Salvar</Text>
                                                    </RectButton>
                                                </>
                                            )
                                        }
                                    })
                                ):(
                                    <>
                                        <Image source={Avatar} style={styles.Avatar}/>
                                        <RectButton onPress={()=>handleSelectImages(images,setImages)} style={styles.EditButton}>
                                            <Feather name="camera" size={24} color="#FFF" />
                                        </RectButton>
                                    </>
                                )}
                                </>
                            ):(
                                <Image source={Avatar} style={styles.Avatar}/>
                            )}
                        </View>
                        <Text style={styles.Name}>Alice Andrade Campus</Text>
                </ImageBackground>
            </View>
            {route.name == 'Profile'?(
                <View style={styles.InfoView}>
                    <Text style={styles.TopicText}>Biografia:</Text>
                    <Text style={styles.ContentText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Ut at varius dolor. Curabitur dignissim, neque vitae condimentum 
                    accumsan, lacus massa ultricies augue, vel tincidunt eros quam non 
                    sapien. Duis feugiat.
                    </Text>
                    <Text style={styles.TopicText}>Especialidades:</Text>
                    <Text style={styles.ContentText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Ut at varius dolor. Curabitur dignissim, 
                    </Text>
                    <Text style={styles.TopicText}>Contato:</Text>
                    <View style={styles.ButtonsView}>
                        <WhatsappButton />
                        <EmailButton />
                    </View>
                    <View style={{alignItems:'center', flexDirection: 'row'}}>
                    { user?(
                        <>
                            <RectButton onPress={handleNavigateToProfileProducts} style={[styles.ListButton, {alignSelf: 'flex-start'}]} >
                                <View style={styles.FlexRowView}>
                                    <FontAwesome name="birthday-cake" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                                    <Text style={styles.ButtonText}>Lista de produtos</Text>
                                </View>
                            </RectButton>
                            <RectButton onPress={handleNavigateToUpdateProfile} style={[styles.ListButton,{alignSelf:'flex-end', backgroundColor:'#9553A0'}]} >
                            <View style={styles.FlexRowView}>
                                <FontAwesome name="edit" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                                <Text style={styles.ButtonText}>Editar perfil</Text>
                            </View>
                            </RectButton>
                        </>
                        
                    ):(
                        <RectButton onPress={handleNavigateToProfileProducts} style={styles.ListButton} >
                            <View style={styles.FlexRowView}>
                                <FontAwesome name="birthday-cake" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                                <Text style={styles.ButtonText}>Lista de produtos</Text>
                            </View>
                        </RectButton>
                    )}
                    
                    </View>
                </View>
            ):(
                <View style={styles.ProductsList}>
                <ScrollView contentContainerStyle={{
                            alignItems: 'center',
                            paddingTop: 40,
                            paddingBottom:210,
                            marginTop: -60
                        }}>
                            <ProductItem InfoButton={false} />
                            <ProductItem InfoButton={false} />
                            <ProductItem InfoButton={false} />
                            <ProductItem InfoButton={false} />
                        </ScrollView>
            </View>
            )}
        </View>
    )
}