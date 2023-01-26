import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { CategoryCard } from './CategoryCard'
import sanityClient from '../sanity'

export const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        sanityClient.fetch(`*[_type == "category"]`).then((data) => {
            setCategories(data);
        }).catch(console.error);
    }, [])
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
            paddingHorizontal: 15,
            paddingTop: 10,
        }}>
            {/* Category Card */}
            {categories?.map((category) => (
                <CategoryCard
                    key={category._id}
                    imgUrl={category.image}
                    title={category.name}
                />)
            )}
        </ScrollView>
    )
}
