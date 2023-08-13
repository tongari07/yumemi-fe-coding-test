export const getSearchParams = (key: string) => {
  const urlParams = new URLSearchParams(window.location.search)

  return urlParams.getAll(key)
}
