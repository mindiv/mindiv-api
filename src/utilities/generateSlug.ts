import slugify from 'slugify';

export default (name: string) => {
  return slugify(name, {
    remove: undefined,
    lower: true,
  });
};
