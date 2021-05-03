import React, { SetStateAction, useEffect, useState } from 'react'
import { Text, View,TextInput, Image, ImageBackground, ScrollView} from 'react-native'
import {Picker} from '@react-native-community/picker'
import styles from './styles'
import {Feather, FontAwesome} from '@expo/vector-icons'
import selectImg from '../../images/select.png'
import Waves from '../../images/waves.png'
import { RectButton } from 'react-native-gesture-handler'
import ProductItem from '../../components/ProductItem/ProductItem'
import { useNavigation } from '@react-navigation/native'
import Header from '../../components/Header/Header'
import api from '../../services/api'


export default function ProductsList() {
    const [value, setValue] = useState("0")
    const [data, setData] = useState<Product[]>()
    const navigation = useNavigation()
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const categories = ['Selecionar', 'Bolos','Tortas','Salgados','Biscoitos','Doces','Outros']

    function GetListOfProducts(){
        api.get('products').then((response => {
            console.log("api response: ", response.data)
            setData(response.data)
        }))
    }

    function handleFilterResults(){
        api.get('product/filter/',{
            params: {
                price,
                category
            }
        }).then((response => {
            console.log(response.data)
            setData(response.data)
        })).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        console.log(price, category)
        GetListOfProducts()
    },[navigation])

    useEffect(() => {
        const index = value as unknown as number
        setCategory(categories[index])
        console.log(categories[index])
        console.log(price)

    }, [value])

    return(
        <View style={styles.container}>
            <View style={{height:250}}>
                <ImageBackground source={Waves} style={styles.waves}>
                    <Text style={styles.filterText}>Filtre sua busca:</Text>

                    <View style={styles.FilterView}>
                        <Text style={styles.FilterViewText}>Preço</Text>
                        <TextInput onChangeText={text=> setPrice(text)} placeholder='R$ 00,00' style={styles.FilterViewInput} />
                        <Text style={styles.FilterViewText}>Categoria</Text>

                        <View style={styles.pickerView}>
                            <Picker 
                            selectedValue={value} 
                            onValueChange={value => setValue(value as SetStateAction<string> )} 
                            style={[styles.FilterViewSelect,{
                                fontFamily: 'Poppins_300Light'
                            }]}>
                            <Picker.Item label="Selecionar" value="0" />
                                <Picker.Item label="Bolos" value="1" />
                                <Picker.Item label="Tortas" value="2" />
                                <Picker.Item label="Salgados" value="3" />
                                <Picker.Item label="Biscoitos" value="4" />
                                <Picker.Item label="Doces" value="5" />
                                <Picker.Item label="Outros" value="6" />
                            </Picker>
                            <Image style={styles.selectImg} source={selectImg} />
                        </View>
                    </View>
                        <RectButton onPress={handleFilterResults} style={styles.filterButton}>
                            <Feather name="filter" size={25} color='#FFF' />
                        </RectButton>
                </ImageBackground>
            </View>
            <View style={styles.ProductsList}>
                <ScrollView contentContainerStyle={{
                            alignItems: 'center',
                            paddingTop: 40,
                            paddingBottom:180,
                            marginTop: -70
                        }}>
                            {data?.map(product=>{
                                return (
                                    <ProductItem Data={product} EditButton={false} />
                                )
                            })}
                </ScrollView>
            </View>
            
        </View>
    )
}