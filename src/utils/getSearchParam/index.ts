export const getSerachParam = (key: string) => {
  const urlParams = new URLSearchParams(window.location.search)

  return urlParams.getAll(key)
}
