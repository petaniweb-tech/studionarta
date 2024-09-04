export const queryCorporateProject: string = `
 *[_type=='corporate_project']
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

export const queryCorporateProjectBySlug = (slug: string): string => {
	return `
  *[_type=='corporate_project' && slug.current == '${slug}'][0]
    {
      title,
      description,
      sub_headline,
      'slug' : slug.current,
      'images': images[]{'url': asset->url},
    }`;
};

export const queryCorporateProjectBySlugSEO = (slug: string): string => {
	return `
  *[_type=='corporate_project' && slug.current == '${slug}'][0]
    {
      title,
      description,
      'thumbnail': images[@._type == 'image']{'url': asset->url}[0],
    }`;
};
