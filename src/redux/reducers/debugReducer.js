export default (state = null, { type, ...rest }) => {
  console.log('Action:', type, rest)
  return state
}
