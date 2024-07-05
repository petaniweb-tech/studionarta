export const queryAbout: string = `
  *[_type=='banners' && section=='about'][0]
  {
    'banners': images[]{'url': asset->url},
    'images': images[]{'url': asset->url}[0..2]
  }`;

export const queryHero: string = `
  *[_type=='banners' && section=='hero'][0]
  {
    'banners': [
      ...images[]{'url': asset->url, 'type': 'image'},
      {'url': video.asset->url, 'type': 'video'}
    ]
  }`;

export const queryClient: string = `
 *[_type=='banners' && section=='clients'][0]
 {
   'banners': images[]{'url': asset->url}
 }`;
