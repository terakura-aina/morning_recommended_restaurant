export const setOptions = async (tags: Array<object>, options: Array<object>) => {
  await tags.map((tag: any) => {
    options.push({
      value: tag.name,
      label: tag.name
    })
  })
  return options
}