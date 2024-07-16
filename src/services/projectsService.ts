export const queryProducts: string = `
  *[_type=='projects']
  {
    title,
    description,
    'slug' : slug.current,
    'thumbnail': images[0]{'url': asset->url},
    _createdAt,
    _updatedAt
  } | order(_createdAt desc)`;

export const queryProductBySlug = (slug: string): string => {
	return `
  *[_type=='projects' && slug.current == '${slug}'][0]
    {
      title,
      description,
      'slug' : slug.current,
      'images': images[]{'url': asset->url},
      'video': video {'url': asset->url}
    }`;
};
