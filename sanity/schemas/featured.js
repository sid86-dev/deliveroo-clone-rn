import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'featured',
    title: 'Featured Menu Categories',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Featured Category Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'restaurants',
            type: 'array',
            title: 'Restaurants',
            of: [{ type: 'reference', to: [{ type: 'restaurant' }] }],
        }),
        defineField({
            name: 'short_description',
            type: 'string',
            title: 'Short Description',
            validation: (Rule) => Rule.max(200),
        }),
    ]
})
