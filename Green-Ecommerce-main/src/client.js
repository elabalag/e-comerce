import {createClient} from "@sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: import.meta.env.VITE_SANITY_ID,
    dataset: 'production',
    apiVersion: '2023-04-23',
    useCdn: true,
    token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);