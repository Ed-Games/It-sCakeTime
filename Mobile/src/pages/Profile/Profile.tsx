import React, { useState } from 'react'
import { ImageBackground, Text, View } from 'react-native'
import Header from '../../components/Header/Header'
import Waves from '../../images/waves.png'
import styles from './style'

import Avatar from '../../images/avatar.png'
import WhatsappButton from '../../components/WhatsappButton/WhatsappButton'
import EmailButton from '../../components/EmailButton/EmailButton'
import { RectButton, ScrollView } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import ProductItem from '../../components/ProductItem/ProductItem'
import {useRoute} from '@react-navigation/native';

export default function Profile() {

    const navigation = useNavigation()
    const route = useRoute()
    const [component,SetComponent] = useState('Info')

    function handleNavigateToProfileProducts(){
        navigation.navigate('ProfileProducts')
    }

    return(
        <View style={styles.container}>
            <View>
                <ImageBackground style={styles.Waves} source={Waves}>
                    <View style={styles.FlexRowView}>
                        <Header image={Avatar} />
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
                    <View style={{alignItems:'center'}}>
                    <RectButton onPress={handleNavigateToProfileProducts} style={styles.ListButton} >
                        <View style={styles.FlexRowView}>
                            <FontAwesome name="birthday-cake" size={24} color='#FFF' style={{marginLeft: 5, marginTop: 5}} />
                            <Text style={styles.ButtonText}>Lista de produtos</Text>
                        </View>
                    </RectButton>
                    </View>
                </View>
            ):(
                <View style={styles.ProductsList}>
                <ScrollView contentContainerStyle={{
                            alignItems: 'center',
                            paddingTop: 40,
                            paddingBottom:300,
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