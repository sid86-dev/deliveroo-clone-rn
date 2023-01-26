import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native'
import { AdjustmentsVerticalIcon, ChevronDownIcon, UserIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { Categories } from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'
import Footer from '../components/Footer'

const HomeScreen = () => {

    const navigation = useNavigation();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    useEffect(() => {
        sanityClient.fetch(`*[_type == "featured"]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->
                }
            }`).then((data) => {
            setFeaturedCategories(data);
        }).catch(console.error);
    }, []);

    return (
        <SafeAreaView className="bg-white pt-5">
            {/* Header */}
            <View className="flex-row pb-3 items-center ml-4 space-x-2">
                <Image source={{
                    uri: 'https://links.papareact.com/wru',
                }}
                    className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                />

                <View className="flex-1">
                    <Text className='font-bold text-gray-400 text-xs'>Deliver Now!</Text>
                    <Text className="font-bold text-xl">Current Location
                        <ChevronDownIcon color="#00CCBB" size={20} />
                    </Text>
                </View>
                <View className="mx-3">
                    <UserIcon className="" color="#00CCBB" size={30} />
                </View>
            </View>

            {/* Search */}
            <View className="flex-row items-center space-x-2 pb-2 mx-4">
                <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
                    <MagnifyingGlassIcon color='gray' size={20} />
                    <TextInput placeholder="Restaurats and cousines" keyboardType='default' />
                </View>
                <AdjustmentsVerticalIcon color="#00CCBB" />
            </View>

            {/* Body */}
            <ScrollView className="bg-gray-100">
                {/* Categories */}
                <Categories />

                {/* Featured */}

                {featuredCategories?.map(category => (
                    <FeaturedRow
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                    />
                ))}

                <Footer />
            </ScrollView>
        </SafeAreaView >
    )
}

export default HomeScreen