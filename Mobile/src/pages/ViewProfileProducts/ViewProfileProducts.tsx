import React, { useEffect, useState } from 'react'
import { Image, Text, View } from 'react-native'

import avatar from '../../images/avatar.png'

import styles from './styles'
import {useNavigation} from '@react-navigation/native'
import Header from '../../components/Header/Header'
import api from '../../services/api'
import ProductItem from '../../components/ProductItem/ProductItem'
import { ScrollView } from 'react-native-gesture-handler'

interface RouteProps{
    route : {
        name:string,
        params:{
            id:string
        }
    }
}

export default function ViewProfileProducts({route}:RouteProps){
    const [products, setProducts] = useState<Product[]>()

    async function getProducts(id:string){
        await api.get(`profile/${id}/products`).then(response => {
            setProducts(response.data)
            console.log(products)
        })
    }
    
    useEffect(() => {
        console.log("ViewProfileProducts route : ",route.params.id)
        getProducts(route.params.id)
    }, [route.params.id])

    return(
        <View style={styles.container}>
            <Header backgroundColor="#9553A0" />
            <View style={styles.header}>
                <Image source={avatar} style={styles.avatar} />
                <Text style={styles.title}> Lista de produtos de Fernanda</Text>
            </View>
            <View style={styles.products}>
                <ScrollView contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom:180,
                }}>
                    {products?.map(product => {
                        return(
                            <ProductItem Data={product} EditButton={false} InfoButton={false} />
                        )
                    })}
                </ScrollView>
            </View>
            
        </View>
    )
}