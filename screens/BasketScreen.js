import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useDispatch, useSelector } from 'react-redux';
import { XCircleIcon } from 'react-native-heroicons/solid';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';

const BasketScreen = () => {

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();

    const basketTotal = useSelector(selectBasketTotal);
    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setGroupedItemsInBasket(groupedItems);
    }, [items])

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-gray-100">
                <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
                    <View>
                        <Text className="text-lg font-bold text-center">Basket</Text>
                        <Text className="text-center text-gray-400">{restaurant.title}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                    >
                        <XCircleIcon color={'#00CCBB'} height={50} width={50} />
                    </TouchableOpacity>

                </View>

                <View className="flex-row items-center space-x-4 bg-white my-5 px-4 py-3">
                    <Image
                        className="w-7 h-7 bg-gray-300 p-4 rounded-full"
                        source={{
                            uri: "http://links.papareact.com/wru",
                        }} />
                    <Text className='flex-1'>Deliver in 50-75 min</Text>
                    <TouchableOpacity>
                        <Text className="text-[#00CCBB]">Change</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="divide-y divide-gray-200">
                    {
                        Object.entries(groupedItemsInBasket).map(([key, items]) => (
                            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                                <Text className="text-[#00CCBB]">{items.length} x </Text>
                                <Image
                                    source={{
                                        uri: urlFor(items[0]?.image).url(),
                                    }}
                                    className="w-12 h-12 rounded-full"
                                />
                                <Text className="flex-1" >{items[0]?.name}</Text>
                                <Text className="text-gray-600">
                                    <Currency quantity={items[0]?.price} currency="INR" />
                                </Text>

                                <TouchableOpacity>
                                    <Text className="text-[#00CCBB] text-xs"
                                        onPress={() => dispatch(removeFromBasket({ id: key }))}
                                    >Remove</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>

                <View className="p-5 bg-white mt-5 space-y-4">
                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Subtotal</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={basketTotal} currency="INR" />
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="text-gray-400">Delivery Fee</Text>
                        <Text className="text-gray-400">
                            <Currency quantity={59} currency="INR" />
                        </Text>
                    </View>

                    <View className="flex-row justify-between">
                        <Text className="font-extrabold">Order Total</Text>
                        <Text className="font-extrabold">
                            <Currency quantity={basketTotal + 59} currency="INR" />
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>navigation.navigate('PreparingOrder')} className="bg-[#00CCBB] p-4 rounded-lg">
                        <Text className="text-center font-bold text-white">
                            Place Order</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default BasketScreen