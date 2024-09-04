export const queryProducts: string = `
 *[_type=='projects']
  {
    title,
    description,
    sub_headline,
    'slug' : slug.current,
    'thumbnail': images[@._type == 'image']{'url': asset->url}[0],
    position,
    _createdAt,
    _updatedAt
  } | order(position asc)`;

export const queryProductBySlug = (slug: string): string => {
	return `
  *[_type=='projects' && slug.current == '${slug}'][0]
    {
      title,
      description,
      sub_headline,
      'slug' : slug.current,
      'images': images[]{'url': asset->url},
    }`;
};

export const queryProductBySlugSEO = (slug: string): string => {
	return `
  *[_type=='projects' && slug.current == '${slug}'][0]
    {
      title,
      description,
      'thumbnail': images[@._type == 'image']{'url': asset->url}[0],
    }`;
};
