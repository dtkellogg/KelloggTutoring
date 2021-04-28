export default function useFormattedPhoneNum(input) {
  
  if (input.length === 10 && input.match(/^[0-9]+$/) !== null) {
    return input.replace(/(...)(...)(....)/, `($1) $2-$3`)
  } else return input
  
}